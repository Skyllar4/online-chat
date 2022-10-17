import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import {registerValidator} from './validations/auth.js';
import UserModel from './models/User.js'
import checkauth from './utils/checkauth.js';

mongoose
.connect('mongodb+srv://Skyllar:Pj12qoharperdce@cluster0.87ueqch.mongodb.net/messenger?retryWrites=true&w=majority')
.then(() => {
    console.log('DB OK');
}).catch((err) => console.log("DB error " + err));

const app = express();

app.use(express.json());

app.post('/register', registerValidator, async (req, res) => {
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
});

app.post('/login', async (req, res) => {
    try {

        const user = await UserModel.findOne({ email: req.body.email });

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

        res.json({...userData, token});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        });
    }
});

app.get('/user/info', checkauth, (req, res) => {
    try {
        req.json({
            success: true
        });
    } catch (err) {
        console.log(err)
    }
});


app.listen(200, (err) => {
    if (err) {
        return console.log(err);
    } 
    console.log('OK');
});