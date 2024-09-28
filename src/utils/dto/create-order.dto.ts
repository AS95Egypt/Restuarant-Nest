import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsMongoId,
  IsEnum,
  IsArray,
  IsOptional,
} from 'class-validator';
import { OrderStatus, PaymentMethods } from '../constants/app-constants';

export class CreateOrderDto {
  @IsOptional()
  @IsDate()
  order_date: Date;

  @IsNotEmpty()
  @IsMongoId()
  customer_id: string;

  @IsOptional()
  @IsString()
  @IsEnum(PaymentMethods)
  payment_method: string;

  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  order_status: string;

  @IsArray({
    message: 'Items must be an array',
  })
  items: any;

  @IsOptional()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  @IsNumber()
  paid_amount: number;
}
