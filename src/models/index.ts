import sequelize from './sequelize';

import User from './User';
import type { TUserAttributes } from './User';

import Product from './Product';
import type { TProductAttributes } from './Product';

import Image from './Image';
import type { TImageAttributes } from './Image';

import Price from './Price';
import type { TPriceAttributes } from './Price';

import ProductState from './ProductState';
import type { TProductStateAttributes } from './ProductState';

// Associations
User.hasMany(ProductState, { foreignKey: 'userId' });
ProductState.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Product.belongsTo(Price, { foreignKey: 'priceId', onDelete: 'CASCADE' });
Price.hasMany(Product, { foreignKey: 'priceId' });

Product.hasMany(ProductState, { foreignKey: 'productId' });
ProductState.belongsTo(Product, { foreignKey: 'productId' });

export {
        sequelize,
        User,
        Product,
        Image,
        Price,
        ProductState,
};

export type {
        TUserAttributes,
        TProductAttributes,
        TImageAttributes,
        TPriceAttributes,
        TProductStateAttributes,
};

