import sequelize from './sequelize';

import User from './User';
import type { TUserAttributes, TUser } from './User';

import Product from './Product';
import type { TProductAttributes } from './Product';

import Image from './Image';
import type { TImageAttributes } from './Image';

import Price from './Price';
import type { TPriceAttributes } from './Price';

import ProductState from './ProductState';
import type { TProductStateAttributes } from './ProductState';

import Session from './Session';
import EmailVerification from './EmailVerification';

// Associations
User.hasMany(ProductState, { foreignKey: 'userId' });
ProductState.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Product.belongsTo(Price, { foreignKey: 'priceId', onDelete: 'CASCADE' });
Price.hasMany(Product, { foreignKey: 'priceId' });

Product.hasMany(ProductState, { foreignKey: 'productId' });
ProductState.belongsTo(Product, { foreignKey: 'productId' });

Session.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Session, { foreignKey: 'userId' });

export {
        sequelize,
        User,
        Product,
        Image,
        Price,
        ProductState,
        Session,
        EmailVerification,
};

export type {
        TUserAttributes,
        TProductAttributes,
        TImageAttributes,
        TPriceAttributes,
        TProductStateAttributes,
        TUser,
};

