// Runs before the server starts: creates missing tables and, if the catalog is
// empty, loads seed/catalog.json. Safe to run on every start.
import { readFile } from 'fs/promises';
import { Image, Price, Product, sequelize } from 'models';

await sequelize.sync();

if ((await Product.unscoped().count()) === 0) {
	const { prices, products, images } = JSON.parse(await readFile('seed/catalog.json', 'utf8'));
	await sequelize.transaction(async (transaction) => {
		await Price.bulkCreate(prices, { transaction });
		await Product.bulkCreate(products, { transaction });
		await Image.bulkCreate(images, { transaction });
	});
	console.log(`Loaded catalog: ${products.length} products`);
} else {
	console.log('Database ready');
}

await sequelize.close();
