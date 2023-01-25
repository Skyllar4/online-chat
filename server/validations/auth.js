import { body } from "express-validator";

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min: 5}),
    body('userName', 'Имя пользователя должно содержать минимум 3 символа').isLength({min: 3}),
    body('avatarUrl').optional().isURL(),
];
