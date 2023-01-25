import { validationResult } from 'express-validator';
import UserModel from '../models/User.js'
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        userName: req.body.userName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
    });

    const user = await doc.save();

    const { passwordHash, ...userData } = user._doc;

    const token = jwt.sign(
        {
        _id: user._id,
        },
         'secretHash',
         {
         expiresIn: '30d',
         },
    ); 
         
    res.json({...userData, token});

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
};

export const login = async (req, res) => {

    try {

        const user = await UserModel.findOne({ userName: req.body.userName });

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(403).json({
                message: "Неверный логин или пароль"
            });
        }

        const token = jwt.sign(
            {
            _id: user._id,
            },
            'secretHash',
            {
            expiresIn: '30d',
            },
        ); 

        const { passwordHash, ...userData } = user._doc;
        res.cookie('loginToken', `${token}`);
        res.status(200).json({
            message: true
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        });
    }
};

export const auth = async (req, res) => {
    try {

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(user);

    } catch (err) {
        res.status(500).json({
            message: 'Нет доступа'
        });
    }

};
