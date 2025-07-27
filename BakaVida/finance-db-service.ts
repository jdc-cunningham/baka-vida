// https://blog.logrocket.com/using-sqlite-react-native/#android

import { openDatabase, SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';
import { Debt } from './models/finances';

enablePromise(true);

export const getDbConnection = async () => {
  return openDatabase({
    name: 'finances.db', location: 'default'
  })
};

export const createDebtTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS 'debt'(
    value TEXT NOT NULL
  );`;

  await db.executeSql(query);
};

export const getDebtItems = async (db: SQLiteDatabase): Promise<Debt[]> => {
  try {
    const debt: Debt[] = [];
    const results = await db.executeSql(`SELECT rowid as id, * FROM 'debt'`);

    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        debt.push(result.rows.item(i));
      }
    });

    return debt;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get debt items');
  }
};
