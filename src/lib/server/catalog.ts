import { Op, type WhereOptions } from 'sequelize';
import { Product } from 'models';
import type { TProduct } from '$lib/types';

const plain = (rows: Product[]) => rows.map((p) => p.get({ plain: true })) as TProduct[];

export async function findProducts(where: WhereOptions<Product> = {}) {
	return plain(await Product.findAll({ where, order: [['title', 'ASC']] }));
}

export async function findProduct(id: string) {
	const product = await Product.findByPk(id);
	return product ? (product.get({ plain: true }) as TProduct) : undefined;
}

export async function listCategories() {
	const rows = await Product.unscoped().findAll({
		attributes: ['category'],
		group: 'category',
		order: [['category', 'ASC']]
	});
	return rows.map((r) => r.get('category'));
}

export const excluding = (id: string) => ({ id: { [Op.ne]: id } });
