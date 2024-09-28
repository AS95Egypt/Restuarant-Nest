import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
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
    CacheModule.register({
      store: redisStore, // Specify Redis as the store
      host: 'localhost', // Redis host (defaults to localhost)
      port: 6379, // Redis port (default is 6379)
      //ttl: 600, // Default TTL (time to live) in seconds
    }),
    ,
    // register app modules
    ItemsModule,
    OrdersModule,
    CustomersModule,
    ReportsModule,
  ],
})
export class AppModule {}
