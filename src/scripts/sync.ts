import { sequelize } from '../models';
import { createFakeProducts } from './createFakeProducts';
import { createFakeUsers } from './createFakeUsers';

async function initDB() {
	try {
		console.log('Initializing Database sync');
		await sequelize.sync(); // or alter: true
		console.log('✅ Database synced!');

		console.log('Filling Database with products...');
		await createFakeProducts();
		console.log('Filled Database with products...');

		console.log('Creating fake users...');
		await createFakeUsers();
		console.log('Created fake users...');
	} catch (err) {
		console.error('❌ Failed to sync database:', err);
	}
}

initDB();
