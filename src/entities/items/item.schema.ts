import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getNextCodePlugin } from '../../utils/plugins/next-code-plugin';
import { Categories, SellUnits } from '../../utils/constants/app-constants';

@Schema()
export class Item extends Document {
  // --- code
  @Prop({ immutable: true })
  code: number;

  // --- item name
  @Prop({ required: true, unique: true })
  item_name: string;

  // --- category
  @Prop({
    required: true,
    enum: {
      values: Object.values(Categories),
      message: 'Category value must be `FOOD` ,`DRINKS` or `SWEETS`',
    },
  })
  category: string;

  // --- sell unit
  @Prop({
    required: true,
    enum: {
      values: Object.values(SellUnits),
      message: 'Sell unit value must be `PIECE`, `KILOGRAM` or `LITER`',
    },
  })
  sell_unit: string;

  // --- price
  @Prop({ default: 0 })
  price: number;

  // --- cost
  @Prop({ default: 0 })
  cost: number;

  // --- quantity
  @Prop({ default: 0 })
  quantity: number;

  // --- active
  @Prop({ default: true })
  is_active: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.plugin(getNextCodePlugin); // get next item code on save
