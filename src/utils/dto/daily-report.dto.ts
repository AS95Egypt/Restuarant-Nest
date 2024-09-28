import { Optional } from '@nestjs/common';
import { IsNumber, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class DailyReportDto {
  total_revenue_per_day: number;

  orders_count_per_day: number;

  most_sold_items: any;
}
