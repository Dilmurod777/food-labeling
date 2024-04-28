const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

async function createUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          );
        `;
    console.log(`Created "users" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function createProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        tags TEXT NOT NULL,
        label TEXT NOT NULL,
        updated_at VARCHAR(255) NOT NULL,
        items TEXT NOT NULL,
        waste VARCHAR(255),
        net_weight VARCHAR(255),
        packages VARCHAR(255),
        serving_size VARCHAR(255),
        serving_per_package VARCHAR(255),
        
        calories VARCHAR(255),
        fat VARCHAR(255),
        saturated_fat VARCHAR(255),
        trans_fat VARCHAR(255),
        cholesterol VARCHAR(255),
        sodium VARCHAR(255),
        carbohydrate VARCHAR(255),
        dietary_fiber VARCHAR(255),
        sugar VARCHAR(255),
        added_sugar VARCHAR(255),
        protein VARCHAR(255),
        vitamin_d VARCHAR(255),
        calcium VARCHAR(255),
        iron VARCHAR(255),
        potassium VARCHAR(255),
        vitamin_a VARCHAR(255),
        vitamin_c VARCHAR(255),
        magnesium VARCHAR(255),
        phosphorus VARCHAR(255),
        zinc VARCHAR(255),
        copper VARCHAR(255),
        manganese VARCHAR(255),
        selenium VARCHAR(255),
        thiamin VARCHAR(255),
        riboflavin VARCHAR(255),
        niacin VARCHAR(255),
        pantothenic_acid VARCHAR(255),
        vitamin_b6 VARCHAR(255),
        folate VARCHAR(255),
        vitamin_b12 VARCHAR(255),
        vitamin_e VARCHAR(255),
        vitamin_k VARCHAR(255),
        uncounted_fiber VARCHAR(255),
        sugar_alcohol VARCHAR(255),
        monounsaturated_fat VARCHAR(255),
        polyunsaturated_fat VARCHAR(255)
      );
    `;

    console.log(`Created "products" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function createCompanies(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS companies (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
          );
        `;
    console.log(`Created "companies" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error while creating companies:", error);
    throw error;
  }
}

async function createCompanyProductList(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS companyProductList (
            company_id UUID NOT NULL,
            date VARCHAR(255) NOT NULL,
            list TEXT NOT NULL
          );
        `;
    console.log(`Created "companyProductList" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error while creating companyProductList:", error);
    throw error;
  }
}

async function createCompanyProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS companyProducts (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            category TEXT NOT NULL,
            name TEXT NOT NULL,
            type_flavor TEXT NOT NULL,
            supply_type TEXT NOT NULL,
            unit_price TEXT NOT NULL,
            moq TEXT NOT NULL,
            units_per_box TEXT NOT NULL,
            shipping_storage TEXT NOT NULL,
            shelf_life TEXT NOT NULL,
            brand TEXT NOT NULL,
            note TEXT NOT NULL
          );
        `;
    console.log(`Created "companyProducts" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error while creating companyProducts:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createUsers(client);
  await createProducts(client);
  await createCompanies(client);
  await createCompanyProductList(client);
  await createCompanyProducts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
