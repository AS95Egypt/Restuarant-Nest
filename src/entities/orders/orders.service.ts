import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Order } from './order.schema';
// entire order DTOs
import { CreateOrderDto } from '../../utils/dto/create-order.dto';
import { UpdateOrderDto } from '../../utils/dto/update-order.dto';
// order items DTOs
import { CreateOrderItemDto } from '../../utils/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../utils/dto/update-order-item.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  // ? =========== Entire Order  ===========

  async create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto> {
    const createdOrder = new this.orderModel(createOrderDto);
    return await createdOrder.save();
  }

  async findAll(): Promise<CreateOrderDto[]> {
    return await this.orderModel.find().exec();
  }

  async findOne(id: Schema.Types.ObjectId): Promise<CreateOrderDto> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async update(
    id: Schema.Types.ObjectId,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateOrderDto> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async delete(id: Schema.Types.ObjectId): Promise<CreateOrderDto> {
    const order = await this.orderModel.findByIdAndDelete(id).exec();

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  // ? =========== Order Items  ===========

  async addItemToOrder(
    id: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId,
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<CreateOrderDto> {
    const newItem = {
      item_id: createOrderItemDto.item_id,
      price: createOrderItemDto.price,
      quantity: createOrderItemDto.quantity,
      total: createOrderItemDto.price * createOrderItemDto.quantity,
    };

    await this.orderModel.updateOne({ _id: id }, { $push: { items: newItem } });

    const order = await this.orderModel.findById(id).exec();

    return order;
  }

  async updateOrderItem(
    id: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<CreateOrderDto> {
    const updatedItem = {
      'items.$.price': updateOrderItemDto.price,
      'items.$.quantity': updateOrderItemDto.quantity,
      'items.$.total': updateOrderItemDto.price * updateOrderItemDto.quantity,
    };

    const updatedOrder = await this.orderModel.updateOne(
      { _id: id, 'items.item_id': itemId },
      { $set: updatedItem },
    );

    console.log('updatedOrder', updatedOrder);

    if (updatedOrder.matchedCount === 0) {
      throw new Error('Order or item not found');
    }

    const order = await this.orderModel.findById(id).exec();

    return order;
  }

  async deleteItemFromOrder(
    id: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId,
  ): Promise<CreateOrderDto> {
    const updatedOrder = await this.orderModel.updateOne(
      { _id: id },
      { $pull: { items: { item_id: itemId } } },
    );

    if (updatedOrder.matchedCount === 0) {
      throw new Error('Order or item not found');
    }

    const order = await this.orderModel.findById(id).exec();

    return order;
  }
}
