import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Schema } from 'mongoose';

import { OrdersService } from './orders.service';
// entire order DTOs
import { CreateOrderDto } from '../../utils/dto/create-order.dto';
import { UpdateOrderDto } from '../../utils/dto/update-order.dto';
// order items DTOs
import { CreateOrderItemDto } from '../../utils/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../utils/dto/update-order-item.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ? =========== Entire Order  ===========
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return {
      success: true,
      data: {
        order,
      },
      message: 'Order created successfully',
    };
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return {
      success: true,
      data: {
        orders,
      },
      //message: 'Fetch Orders data successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: Schema.Types.ObjectId) {
    const order = await this.ordersService.findOne(id);
    return {
      success: true,
      data: {
        order,
      },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(id, updateOrderDto);
    return {
      success: true,
      data: {
        order,
      },
      message: 'Order updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: Schema.Types.ObjectId) {
    const order = await this.ordersService.delete(id);
    return {
      success: true,
      data: {
        order,
      },
      message: 'Order deleted successfully',
    };
  }

  // ? =========== Order Items  ===========

  @Post(':id/items')
  async addItemToOrder(
    @Param('id') id: Schema.Types.ObjectId,
    @Param('item_id') itemId: Schema.Types.ObjectId,
    @Body() createOrderItemDto: CreateOrderItemDto,
  ) {
    const order = await this.ordersService.addItemToOrder(
      id,
      itemId,
      createOrderItemDto,
    );
    return {
      success: true,
      data: {
        order,
      },
      message: 'Order added to order successfully',
    };
  }

  @Put(':id/items/:item_id')
  async updateItemInOrder(
    @Param('id') id: Schema.Types.ObjectId,
    @Param('item_id') itemId: Schema.Types.ObjectId,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    const order = await this.ordersService.updateOrderItem(
      id,
      itemId,
      updateOrderItemDto,
    );
    return {
      success: true,
      data: {
        order,
      },
      message: 'Item updated in order successfully',
    };
  }

  @Delete(':id/items/:item_id')
  async removeItemFromOrder(
    @Param('id') id: Schema.Types.ObjectId,
    @Param('item_id') itemId: Schema.Types.ObjectId,
  ) {
    const order = await this.ordersService.deleteItemFromOrder(id, itemId);
    return {
      success: true,
      data: {
        order,
      },
      message: 'Item deleted from order successfully',
    };
  }
}
