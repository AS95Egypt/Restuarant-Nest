import { Module } from '@nestjs/common';
// app modules
import { ItemsModule } from './entities/items/items.module';
import { OrdersModule } from './entities/orders/orders.module';
import { CustomersModule } from './entities/customers/customers.module';
import { ReportsModule } from './entities/reports/reports.module';
// mongoose
import { MongooseModule } from '@nestjs/mongoose';
// config
import { ConfigModule } from '@nestjs/config';
//import { CacheRedisModule } from './utils/cache-redis/cache-redis.module';

@Module({
  imports: [
    // load config from .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // connect to mongodb
    MongooseModule.forRoot(process.env.DATABASE_URL),
    // register app modules
    ItemsModule,
    OrdersModule,
    CustomersModule,
    ReportsModule,
  ],
})
export class AppModule {}
