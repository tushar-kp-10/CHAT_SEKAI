import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from 'mongoose';


export const getUsersForSidebar = async(req,res)=>{
    try{
        const loggedInUserId =  req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(error){
        console.error("Error in getUsersForSidebar:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};


export const getMessages = async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const myId = req.user._id;



        const messages =  await Message.find({
            $or:[
                {
                    senderId:myId,
                    receiverId:userToChatId
                },
                {
                    receiverId:myId,
                    senderId:userToChatId
                },
            ]
        })
        console.log(messages);
        res.status(200).json(messages)
    }catch(error){
        console.log("Error in getMssages controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

// export const getMessages = async (req, res) => {
//     try {
//       const { id: userToChatId } = req.params;
//       const myId = req.user._id;
  
//       console.log("myId:", myId, "userToChatId:", userToChatId);
//       if (!myId || !userToChatId) {
//         return res.status(400).json({ error: "Invalid user IDs" });
//       }
  
//       const userObjectId = new mongoose.Types.ObjectId(userToChatId);
  
//       const messages = await Message.find({
//         $or: [
//           { senderId: myId, receiverId: userObjectId },
//           { receiverId: myId, senderId: userObjectId },
//         ],
//       }).sort({ createdAt: 1 });
  
//     //   console.log(messages);
//       res.status(200).json(messages);
//     } catch (error) {
//       console.log("Error in getMessages controller:", error.message);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };
  



export const sendMessage =  async(req,res)=>{
    try{
        const { text,image } = req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();


        //todo: realtime func goes here

        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sendMessage controller ",error.message);
        res.status(500).json({error: "Internal server error"});
    }
};