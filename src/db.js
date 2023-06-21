const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open, Database } = require('sqlite');
const { readFile } = require('fs/promises')
const { DB_NAME } = require('./constants')

const createConnection = async () => {
  const db = await open({
    filename: path.join(__dirname, '..', DB_NAME),
    driver: sqlite3.Database
  })

  const initSql = (await readFile(path.join(__dirname, 'db.sql'))).toString();

  await db.exec(initSql);

  return db;
}



/**
 * @param {Database<sqlite3.Database, sqlite3.Statement>} db 
*/
const getSetting = async (db, property, defaultValue) => {
  const sql = `SELECT * FROM settings WHERE property = :property`;

  const row = await db.get(sql, {
    ':property': property
  });

  if (!row) {
    await setSetting(db, property, defaultValue)
    return defaultValue;
  }

  return JSON.parse(row?.json_value);

}

/**
 * @param {Database<sqlite3.Database, sqlite3.Statement>} db 
*/
const setSetting = (db, property, value) => {
  const sql = `INSERT INTO settings (property, json_value)
  VALUES (:property, :json_value)
  ON CONFLICT(property) DO UPDATE SET json_value = :json_value`;

  return db.run(sql, {
    ':property': property,
    ':json_value': JSON.stringify(value),
  })

}

module.exports = {
  createConnection,
  getSetting,
  setSetting,
};
