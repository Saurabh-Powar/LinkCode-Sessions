
const postgres = require('postgres');
require('dotenv').config();
const Sql = postgres(process.env.postgres_url, {
    ssl: 'require'
});

Sql`CREATE TABLE IF NOT EXISTS TUsers(
    ID INTEGER SERIAL PRIMARY KEY,                                 
    NAME Text NOT NULL, 
    AGE Integer NOT NULL)`.then(res =>{
    console.log('User Table created successfully:', res);
}).catch(err => {
    console.error('Error creating table:', err);
});

Sql`CREATE TABLE IF NOT EXISTS mastertasks(
    ID SERIAL PRIMARY KEY, 
    TASK TEXT NOT NULL)`.then(res => {
    console.log('Tasks Table created');
}).catch(err => {
    console.log(err);
});

module.exports = Sql;
