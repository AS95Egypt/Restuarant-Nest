import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Item } from './item.schema';
import { CreateItemDto } from '../../utils/dto/create-item.dto';
import { UpdateItemDto } from '../../utils/dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<CreateItemDto> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async findAll(): Promise<CreateItemDto[]> {
    return await this.itemModel.find().exec();
  }

  async findOne(id: Schema.Types.ObjectId): Promise<CreateItemDto> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  async update(
    id: Schema.Types.ObjectId,
    updateItemDto: UpdateItemDto,
  ): Promise<UpdateItemDto> {
    const item = await this.itemModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();

    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  }

  async delete(id: Schema.Types.ObjectId): Promise<CreateItemDto> {
    const item = await this.itemModel.findByIdAndDelete(id).exec();

    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  }
}
