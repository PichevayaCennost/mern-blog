import {Router} from 'express'
import { checkAuth } from '../utils/check.js';
import {createComment} from '../controllers/comment.js'

const router = new Router();

// Create Comment
// http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router

 