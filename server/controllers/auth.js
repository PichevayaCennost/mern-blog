import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './../models/User.js';

export const register = async (req, res) => { 
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.status(400).json({
                success: false,
                message: 'Аккаунт с таким именем уже существует',
            })
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        await newUser.save();

        res.json({
            success: true,
            message: 'Регистрация прошла успешно',
            newUser,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Ошибка при регистрации'
        })
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Такого пользователя не существует'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            res.json({
                success: false,
                message: 'Неправильный пароль'
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            success: true,
            message: 'Вы вошли в свой аккаунт',
            token, 
            user,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Ошибка при регистрации'
        })
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                success: false,
                message: 'Такого пользователя не существует',
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            success: true,
            message: 'Вход выполен успешно',
            user,
            token,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Не удалось получить'
        })
    }
};