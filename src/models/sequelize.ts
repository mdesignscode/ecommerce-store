import { Sequelize } from 'sequelize';

// Production (Render) sets DATABASE_URL to a Postgres URL; local dev uses the SQLite file.
const url = process.env.DATABASE_URL;

const sequelize = url?.startsWith('postgres')
	? new Sequelize(url, { dialect: 'postgres', logging: false })
	: new Sequelize({ dialect: 'sqlite', storage: './database.sqlite', logging: false });

export default sequelize;
