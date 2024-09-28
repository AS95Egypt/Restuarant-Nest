import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EMAIL_REGEX } from '../../utils/constants/app-constants';
import { getNextCodePlugin } from '../../utils/plugins/next-code-plugin';

@Schema()
export class Customer extends Document {
  @Prop({ immutable: true })
  code: number;

  @Prop({ required: true, unique: true })
  customer_name: string;

  @Prop({
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (v) => (v ? EMAIL_REGEX.test(v) : true),
      message: 'Customer email is not valid',
    },
  })
  email: string;

  @Prop()
  address: string;

  @Prop({
    trim: true,
  })
  phone: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: true })
  is_active: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.plugin(getNextCodePlugin); // get next customer code on save
