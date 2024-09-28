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

import { ItemsService } from './items.service';
import { CreateItemDto } from '../../utils/dto/create-item.dto';
import { UpdateItemDto } from '../../utils/dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    const item = await this.itemsService.create(createItemDto);
    return {
      success: true,
      data: {
        item,
      },
      message: 'Item created successfully',
    };
  }

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    return {
      success: true,
      data: {
        items,
      },
      //message: 'Fetch Items data successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: Schema.Types.ObjectId) {
    const item = await this.itemsService.findOne(id);
    return {
      success: true,
      data: {
        item,
      },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    const item = await this.itemsService.update(id, updateItemDto);
    return {
      success: true,
      data: {
        item,
      },
      message: 'Item updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: Schema.Types.ObjectId) {
    const item = await this.itemsService.delete(id);
    return {
      success: true,
      data: {
        item,
      },
      message: 'Item deleted successfully',
    };
  }
}
