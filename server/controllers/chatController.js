import ChatModel from "../models/ChatList.js";

export const getChatData = async (req, res) => {
    try {
        const chatData = await ChatModel.find();
        res.json(chatData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Что-то пошло не так, повторите попытку"
        });
    }
}

export const createMessage = async (req, res) => {
    try {
        const doc = new ChatModel({
            chatList: req.body.msg
        });
        doc.save();
        res.json({doc});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Что-то пошло не так, повторите попытку"
        });
    }
}