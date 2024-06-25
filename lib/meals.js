import fs from 'node:fs';
import { promisify } from 'util';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db'); // Open a database connection

const writeFileAsync = promisify(fs.writeFile);

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = db.prepare('SELECT * FROM meals').all();
  return data;
  // Fetch all meals from the database
  // all() method fetches all rows from the database
  // The prepare() method prepares a SQL statement for execution by the database
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // Fetch a single meal from the database
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); // Generate a slug from the title
  meal.instructions = xss(meal.instructions); // Sanitize the instructions, removing any harmful content

  const extension = meal.image.name.split('.').pop(); // Get the file extension
  const fileName = `${meal.slug}.${extension}`; // Generate a unique file name

  const bufferedImage = Buffer.from(await meal.image.arrayBuffer()); // Get the image as a buffer

  try {
    await writeFileAsync(`public/images/${fileName}`, bufferedImage); // Write the image to the file system
    meal.image = `/images/${fileName}`; // Update the image property with the file path

    db.prepare(`
      INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,
          @image,
          @slug
      )
    `).run(meal); // Insert the meal into the database
  } catch (error) {
    throw new Error(`Failed to save the meal: ${error.message}`);
  }
}
