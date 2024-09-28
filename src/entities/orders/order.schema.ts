import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getNextCodePlugin } from '../../utils/plugins/next-code-plugin';
import {
  PaymentMethods,
  OrderStatus,
} from '../../utils/constants/app-constants';

const ItemSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'items' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  total: { type: Number, required: true },
});

@Schema()
export class Order extends Document {
  // --- code
  @Prop({ immutable: true })
  code: number;

  // --- order date
  @Prop({ required: true, default: Date.now })
  order_date: Date;

  // --- customer
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customers' })
  customer_id: string;

  // --- payment method
  @Prop({
    required: true,
    enum: {
      values: Object.values(PaymentMethods),
      message: 'Payment method value must be `CASH`, `CARD` or `E-WALLET`',
    },
    default: PaymentMethods.CASH,
  })
  payment_method: string;

  // --- order status
  @Prop({
    required: true,
    enum: {
      values: Object.values(OrderStatus),
      message: 'Order status value must be `OPEN`, `HOLD` or `COMPLETED`',
    },
    default: OrderStatus.OPEN,
  })
  order_status: string;

  // --- items
  @Prop({ type: [ItemSchema] })
  items: any;

  // --- totoal amount
  @Prop({ default: 0 })
  total_amount: number;

  // --- paid amount
  @Prop({ default: 0 })
  paid_amount: number;

  // --- remaining amount
  @Prop({ default: 0 })
  remaining_amount: number;

  // --- is paid
  @Prop({ default: false })
  is_paid: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.plugin(getNextCodePlugin); // get next item code on save

// pre validate
OrderSchema.pre('validate', async function (next) {
  if (this.items.length === 0) {
    return next(new Error('Order must have at least one item'));
  }

  return next();
});

// pre save
OrderSchema.pre('save', async function (next) {
  // calculate total amount
  try {
    let order_total: number = 0;
    for (const item of this.items) {
      item.total = item.price * item.quantity;
      order_total += item.total;
    }
    this.total_amount = order_total;
    this.remaining_amount = this.total_amount - this.paid_amount;
    this.is_paid = this.paid_amount >= this.total_amount;

    // update order status
    if (this.is_paid) {
      this.order_status = OrderStatus.COMPLETED;
    }
  } catch (error) {
    return next(error);
  }

  return next();
});
