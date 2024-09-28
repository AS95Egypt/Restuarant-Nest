import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/order.schema';
import { DailyReportDto } from '../../utils/dto/daily-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getDailyReportData(
    searchDate: Date,
    limit: number,
  ): Promise<DailyReportDto> {
    const startOfDay = new Date(searchDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(searchDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    console.log('startOfDay', startOfDay);
    console.log('endOfDay', endOfDay);

    // get totals for the day
    const dayTotals = await this.orderModel
      .aggregate([
        // Match orders within the start and end of the day
        {
          $match: {
            order_date: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        //
        {
          $group: {
            _id: null,
            total_revenue_per_day: { $sum: { $sum: '$total_amount' } },
            orders_count_per_day: { $sum: 1 },
          },
        },

        {
          $project: {
            _id: 0,
            total_revenue_per_day: 1,
            orders_count_per_day: 1,
          },
        },
      ])
      .exec();

    // get most sold items
    const mostSoldItems = await this.orderModel
      .aggregate([
        // Match orders within the start and end of the day
        {
          $match: {
            order_date: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $unwind: '$items',
        },
        {
          $lookup: {
            from: 'items',
            localField: 'items.item_id',
            foreignField: '_id',
            as: 'item_collection',
          },
        },
        {
          $unwind: '$item_collection',
        },
        {
          $group: {
            _id: '$items.item_id',
            item_name: { $first: '$item_collection.item_name' },
            sell_count: { $sum: '$items.quantity' }, // Sum of each item quantity
          },
        },
        {
          $sort: { sell_count: -1 },
        },
        { $limit: +limit },
        {
          $project: {
            item_id: '$_id',
            item_name: 1,
            sell_count: 1,
          },
        },
      ])
      .exec();

    const reportData: DailyReportDto = {
      total_revenue_per_day: dayTotals[0].total_revenue_per_day,
      orders_count_per_day: dayTotals[0].orders_count_per_day,
      most_sold_items: mostSoldItems,
    };

    return reportData;
  }
}
