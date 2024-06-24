import sql from 'better-sqlite3';

const db = sql('meals.db');  // Open a database connection


export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = db.prepare('SELECT * FROM meals').all();
    return data;
    // Fetch all meals from the database
    //all() method fetches all rows from the database
    //The prepare() method prepares a SQL statement for execution by the database
    //run() is used to insert data into the database
}