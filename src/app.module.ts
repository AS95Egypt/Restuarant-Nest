import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
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
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
    }),
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
