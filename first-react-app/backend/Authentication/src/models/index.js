import { Cart } from './cart/Cart.js';
import { Order } from './order/Order.js';
import { OrderItem } from './order/OrderItem.js';
import { Product } from './product/Product.js';
import { User } from './user/User.js';

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { Cart, Order, OrderItem, Product, User };

