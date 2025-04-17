
const postgres = require('postgres');
require('dotenv').config();
const Sql = postgres(process.env.postgres_url, {
    ssl: 'require'
});

Sql`CREATE TABLE IF NOT EXISTS Users(
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,                                 
    NAME Text NOT NULL, 
    AGE Integer NOT NULL)`.then(res =>{
    console.log('User Table created successfully:', res);
}).catch(err => {
    console.error('Error creating table:', err);
});

Sql`CREATE TABLE IF NOT EXISTS Tasks(
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    TASK TEXT NOT NULL,
    USER_ID INTEGER REFERENCES Users(ID) ON DELETE CASCADE)`.then(res => {
    console.log('Tasks Table created');
}).catch(err => {
    console.log(err);
});

module.exports = Sql;
