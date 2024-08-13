import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req: Request, res: Response) =>{
    try {
    //We get the message from the body, the id of the receiver from the params
    const { message } = req.body;
    const { id: receiverId } = req.params;
    // we get the id from the sender from the request, because through our protectRoute
    // middleware, we added the authenticated user to the request
    const senderId = req.user.id;

    //Here we find if the conversation exists
    let conversation = await prisma.conversation.findFirst({
        where: {
        participantIds: {
            hasEvery: [senderId, receiverId],
        },
        },
    });

    //If it doesn't, then we create a new one. 
    if (!conversation) {
        conversation = await prisma.conversation.create({
        data: {
            participantIds: {
            set: [senderId, receiverId],
            },
        },
        });
    }

    // Now we create the message on the database, which will be connected to the either found or created conversation
    const newMessage = await prisma.message.create({
        data: {
        senderId,
        body: message,
        conversationId: conversation.id,
        },
    });

    // If we created the message successfully, now we update the conversation to include this new message
    if (newMessage) {
        conversation = await prisma.conversation.update({
        where: {
            id: conversation.id,
        },
        data: {
            messages: {
            connect: {
                id: newMessage.id,
            },
            },
        },
        });
    }

    //Socket io ////
    // We check to see if we have that id on the online users
    const receiverSocketId = getReceiverSocketId(receiverId)
    // if we do, we send the message, so the useEffect can run and update it
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }


    res.status(201).json(newMessage);
    } catch (error: any) {
        console.log("Error in SendMessage controller ", {error: error.message,});
        res.status(500).json({ error: "Internal server error" });
    }
        
}


export const getMessages = async (req: Request, res: Response) =>{
    try {
      const { id: userToChatWith } = req.params;
      const senderId = req.user.id;

      let conversation = await prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasEvery: [senderId, userToChatWith],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (!conversation) {
        return res.status(200).json([]);
      }

      res.status(200).json(conversation.messages);
    } catch (error: any) {
      console.log(
        "There was an error in the getMessage controller",
        error.message
      );
      res.status(500).json({ error: "Internal Server error" });
    }
}

export const getUsersForSideBar = async (req: Request, res: Response) =>{
    try{
        const userId = req.user.id;
        // Here we find all the users that do not have our id
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId
                }
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
                prefLang: true,
            }
        })

        res.status(200).json(users);

    }catch(error:any){
        console.error(error.message)
    }
    
}