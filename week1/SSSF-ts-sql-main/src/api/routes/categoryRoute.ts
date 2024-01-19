import express from 'express';
import {
  categoryDelete,
  categoryGet,
  categoryListGet,
  categoryPost,
} from '../controllers/categoryController';

const router = express.Router();

router.route('/').get(categoryListGet).post(categoryPost);

router.route('/:id').get(categoryGet).put().delete(categoryDelete);

export default router;
