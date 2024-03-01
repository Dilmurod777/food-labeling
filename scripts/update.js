const {db} = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function updateProducts(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const updateTable = await client.sql`
            ALTER TABLE products
            ADD net_weight_unit VARCHAR(255);
    `;

        console.log(`Updated "products" table`);

        return {
            updateTable
        };
    } catch (error) {
        console.error('Error updating products:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await updateProducts(client);

    await client.end();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err,);
});