import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Category} from '../../types/DBTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

const getAllCategories = async (): Promise<Category[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Category[]>(
    'SELECT * FROM categories'
  );
  if (!rows) {
    throw new Error('No categories found');
  }
  return rows as Category[];
};

const getCategoryById = async (id: number): Promise<Category> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Category[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (!rows) {
    throw new Error('No categories found');
  }
  return rows[0] as Category;
};

const addCategory = async (category: Pick<Category, 'category_name'>) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE categories SET category_name = ? WHERE category_id = ?;',
    [category.category_name]
  );
};

const updateCategory = async (
  id: number,
  category: Pick<Category, 'category_name'>
): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE categories SET category_name = ? WHERE category_id = ?;',
    [category.category_name, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not updated', 304);
  }
  return true;
};

const deleteCategory = async (id: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM categories WHERE category_id = ?;',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not updated', 304);
  }
  return true;
};
export {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  addCategory,
  updateCategory,
};
