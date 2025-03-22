// https://blog.logrocket.com/using-sqlite-react-native/#android

import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem } from './models';

const tableName = 'todo';

export const getDBConnection = async () => {
  return openDatabase({
    name: 'todo.db', location: 'default'
  })
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    value TEXT NOT NULL
  );`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];

    const results = await db.executeSql(`SELECT rowid as id, value FROM ${tableName}`);

    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        todoItems.push(result.rows.item(i));
      }
    });

    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todo items');
  }
};
