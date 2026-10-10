const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const testDbPath = path.join(__dirname, 'test.db');
if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

const db = new DatabaseSync(testDbPath);
db.exec(`
  CREATE TABLE test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

const insert = db.prepare('INSERT INTO test (name) VALUES (?)');
const res = insert.run('Modern Sofa');
console.log('Insert result:', res);

const select = db.prepare('SELECT * FROM test');
console.log('Select result:', select.all());

db.close();
if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
console.log('DatabaseSync test passed cleanly!');
