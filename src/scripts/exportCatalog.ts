// Snapshot the local catalog (prices, products, images) into seed/catalog.json,
// which prepareDb.ts loads into an empty production database.
import { writeFile } from 'fs/promises';
import { Image, Price, Product } from 'models';

const prices = await Price.findAll({ raw: true });
const products = await Product.unscoped().findAll({ raw: true });
const images = (await Image.findAll({ raw: true, order: [['id', 'ASC']] })).map(
	({ url, productId }) => ({ url, productId })
);

await writeFile(
	'seed/catalog.json',
	JSON.stringify({ prices, products, images }, null, '\t') + '\n'
);
console.log(
	`Exported ${products.length} products, ${prices.length} prices, ${images.length} images`
);
