import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly orderDataService: ReportsService) {}

  @Get('daily-sales-report')
  async getDailyReport(
    @Query('search_date') searchDate: Date,
    @Query('limit', ParseIntPipe) limit: number, // items to be returned
  ) {
    const reportData = await this.orderDataService.getDailyReportData(
      searchDate,
      limit,
    );
    return {
      success: true,
      data: {
        reportData,
      },
    };
  }
}
