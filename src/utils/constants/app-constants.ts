export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Item - Categories
export const Categories = {
  FOOD: 'FOOD',
  DRINKS: 'DRINKS',
  SWEETS: 'SWEETS',
};

// Item - Sell Units
export const SellUnits = {
  PIECE: 'PIECE',
  KILOGRAM: 'KILOGRAM',
  LITER: 'LITER',
};

// Order - Payment Methods
export const PaymentMethods = {
  CASH: 'CASH',
  CARD: 'CARD',
  'E-WALLET': 'E-WALLET',
};

// Order - Order Status
export const OrderStatus = {
  OPEN: `OPEN`,
  HOLD: `HOLD`,
  COMPLETED: `COMPLETED`,
};
