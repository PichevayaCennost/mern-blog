import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comment.js'

const app = express();
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3001; 
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//MIDDLEWARE
app.use(cors());
app.use(fileUpload())
app.use(express.json());
app.use(express.static('uploads'))

//ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)


async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jd63kvs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`).then( () => console.log('DB OK')).catch( (err) => console.log(err));

        app.listen(PORT, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Server OK")
        });
    } catch (error) {
        console.log(error)
    }
};
start();
