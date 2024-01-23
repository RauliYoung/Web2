import {
  addCat,
  deleteCat,
  getAllCats,
  getCat,
  updateCat,
} from '../models/catModel';
import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import {validationResult} from 'express-validator';
import {MessageResponse} from '../../types/MessageTypes';
import {Cat, User} from '../../types/DBTypes';

const catListGet = async (
  _req: Request,
  res: Response<Cat[]>,
  next: NextFunction
) => {
  try {
    const cats = await getAllCats();
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const catGet = async (req: Request, res: Response<Cat>, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const id = Number(req.params.id);
    const cat = await getCat(id);
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

// TODO: create catPost function to add new cat
const catPost = async (
  req: Request<{}, {}, Omit<Cat, 'owner'> & {owner: number}>,
  res: Response<MessageResponse, {coords: [number, number]}>,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');

    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  if (!req.file) {
    next(new CustomError('File not provided', 400));
    return;
  }

  if (
    !res.locals.coords ||
    !Array.isArray(res.locals.coords) ||
    res.locals.coords.length !== 2
  ) {
    next(new CustomError('Invalid coordinates', 400));
    return;
  }
  try {
    const catData: Omit<Cat, 'owner'> & {owner: number} = req.body;
    const ownerId = req.user ? req.user.user_id : 0;
    console.log(res.locals.coords, 'coooorSIINDAISDNNSDS');
    const result = await addCat(
      ownerId as number,
      catData,
      req.file.path,
      res.locals.coords
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const catPut = async (
  req: Request<{id: string}, {}, Cat>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const id = Number(req.params.id);
    const cat = req.body as Cat;
    const result = await updateCat(id, cat);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// TODO: create catDelete function to delete cat
// catDelete should use deleteCat function from catModel
// catDelete should use validationResult to validate req.params.id
const catDelete = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const messages: string = error
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('cat_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }
  try {
    const id = Number(req.params.id);
    const cat = await deleteCat(id);
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

export {catListGet, catGet, catPost, catPut, catDelete};
