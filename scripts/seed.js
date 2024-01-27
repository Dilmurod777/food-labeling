const {db} = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

		console.log(`Created "users" table`);

		// Insert data VARCHAR(255)o the "users" table
		// const insertedUsers = await Promise.all(
		// 	users.map(async (user) => {
		// 		const hashedPassword = await bcrypt.hash(user.password, 10);
		// 		return client.sql`
		//     INSERT VARCHAR(255)O users (id, name, email, password)
		//     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
		//     ON CONFLICT (id) DO NOTHING;
		//   `;
		// 	}),
		// );

		return {
			createTable
		};
	} catch (error) {
		console.error('Error seeding users:', error);
		throw error;
	}
}

async function seedIngredients(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ingredients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        subtype VARCHAR(255) NOT NULL,
       	updated_at TEXT NOT NULL,
        brand VARCHAR(255),
        list_name VARCHAR(255),
        data_source VARCHAR(255),
        visibility VARCHAR(255),
        serving_size VARCHAR(255),
        serving_size_description VARCHAR(255),
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

		console.log(`Created "ingredients" table`);

		return {
			createTable
		};
	} catch (error) {
		console.error('Error seeding ingredients:', error);
		throw error;
	}
}

async function seedTags(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tags (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
      );
    `;

		console.log(`Created "tags" table`);

		return {
			createTable
		};
	} catch (error) {
		console.error('Error seeding tags:', error);
		throw error;
	}
}

async function seedRecipeItems(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS recipe_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recipe_id VARCHAR(255) NOT NULL,
        ingredient_id VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        unit VARCHAR(255) NOT NULL,
        quantity VARCHAR(255) NOT NULL,
        shipping VARCHAR(255) NOT NULL,
        waste VARCHAR(255) NOT NULL,
        label_text VARCHAR(255) NOT NULL,
        spice_flavor VARCHAR(255),
        canada_sugar VARCHAR(255)
      );
    `;

		console.log(`Created "recipe_items" table`);

		return {
			createTable
		};
	} catch (error) {
		console.error('Error seeding recipe_items:', error);
		throw error;
	}
}

async function seedLabels(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS labels (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        allergens VARCHAR(255) NOT NULL,
        business_name_address VARCHAR(255),
        options TEXT
      );
    `;

		console.log(`Created "labels" table`);

		return {
			createTable
		};
	} catch (error) {
		console.error('Error seeding labels:', error);
		throw error;
	}
}

async function seedRecipes(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        label_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        updated_at VARCHAR(255) NOT NULL,
        ingredient_list TEXT NOT NULL,
        tag_ids TEXT NOT NULL,
        waste VARCHAR(255),
        net_weight VARCHAR(255),
        packages VARCHAR(255),
        serving_size_description VARCHAR(255),
        serving_size_description_fr VARCHAR(255),
        serving_per_package VARCHAR(255),
        description_ddf TEXT,
        sku VARCHAR(255),
        preparation_instructions TEXT,
        unit_packaging_cost VARCHAR(255),
        batch_labor_cost VARCHAR(255),
        batch_overhead_cost VARCHAR(255),
        margin VARCHAR(255),
        distributor_margin VARCHAR(255),
        broker_margin VARCHAR(255),
        retailer_margin VARCHAR(255)
      );
    `;

		console.log(`Created "recipes" table`);

		return {
			createTable
		};
	} catch (error) {
		console.error('Error seeding recipes:', error);
		throw error;
	}
}

async function main() {
	const client = await db.connect();

	await seedUsers(client);
	await seedIngredients(client);
	await seedTags(client);
	await seedRecipeItems(client);
	await seedLabels(client);
	await seedRecipes(client);

	await client.end();
}

main().catch((err) => {
	console.error(
		'An error occurred while attempting to seed the database:',
		err,
	);
});