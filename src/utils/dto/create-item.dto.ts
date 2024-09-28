import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Categories, SellUnits } from '../constants/app-constants';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Categories, {
    message: 'Category value must be `FOOD` ,`DRINKS` or `SWEETS`',
  })
  category: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(SellUnits, {
    message: 'Sell unit value must be `PIECE`, `KILOGRAM` or `LITER`',
  })
  sell_unit: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
