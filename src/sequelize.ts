import {Sequelize} from 'sequelize-typescript';
import { MdUser } from './models/mdUser/mdUser';
import { MdShop } from './models/mdShop/mdShop';
import { MdItem } from './models/mdItem/mdItem';
import { MdOrder } from './models/mdOrder/mdOrder';
import { MdPayment } from './models/mdPayment/mdPayment';
import { MdUserShop } from './models/mdUserShop/mdUserShop';
import { MdImageSrc } from './models/mdImageSrc/mdImageSrc';
import { MdOrderItem } from './models/mdOrderItem/mdOrderItem';

export const sequelize = new Sequelize({
    repositoryMode: true,
    database: 'md-db',
    dialect: 'mysql',
    username: 'root',
    password:  'marketdaymsql',
    storage: 'localhost',
    models: [MdUser, MdShop, MdItem, MdOrder, MdPayment, MdUserShop, MdImageSrc, MdOrderItem],
});