import { Optional } from '@nestjs/common';
import { IsNumber, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsMongoId()
  item_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  total: number;
}
