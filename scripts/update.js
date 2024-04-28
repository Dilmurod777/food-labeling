const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

async function updateProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // const updateTable = await client.sql`
    //         ALTER TABLE users
    //         ALTER COLUMN role SET DEFAULT 2;
    // `;

    // const updateTable = await client.sql`
    //   UPDATE users
    //   SET ROLE = 0
    //   WHERE EMAIL = 'helloworld@gmail.com'
    // `;

    const updateTable = await client.sql`
      ALTER TABLE companyProducts
      ADD certificate TEXT NOT NULL
    `;

    console.log(`Updated table`);

    return {
      updateTable,
    };
  } catch (err) {
    console.error("Error while updating table:", err);
    throw err;
  }
}

async function main() {
  const client = await db.connect();

  await updateProducts(client);

  await client.end();
}

main().catch((err) => {
  console.error("Error while updating database:", err);
});
