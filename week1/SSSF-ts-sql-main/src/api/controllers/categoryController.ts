import {Request, Response, NextFunction} from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../models/categoryModel';
import {Category} from '../../types/DBTypes';
import {PostMessage} from '../../types/MessageTypes';

const categoryListGet = async (
  req: Request,
  res: Response<Category[]>,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const categoryGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Category>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const categoryPost = async (
  req: Request<{}, {}, Pick<Category, 'category_name'>>,
  res: Response<PostMessage>,
  next: NextFunction
) => {
  try {
    const categoryID = await addCategory(req.body);
    res.send({
      message: 'Category added',
      id: categoryID, //TODO: fix this
    });
  } catch (error) {
    next(error);
  }
};

const categoryPut = async (
  req: Request<{id: string}, {}, Pick<Category, 'category_name'>>,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  await updateCategory(id, req.body);
  try {
    res.send({
      message: 'Category updated',
    });
  } catch (error) {
    next(error);
  }
};

const categoryDelete = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await deleteCategory(id);
    res.send({
      message: 'Category deleted',
    });
  } catch (error) {
    next(error);
  }
};

export {
  categoryListGet,
  categoryGet,
  categoryPost,
  categoryDelete,
  categoryPut,
};
