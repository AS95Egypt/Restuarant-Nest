import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '../../utils/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../utils/dto/update-customer.dto';
import { Schema } from 'mongoose';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.create(createCustomerDto);
    return {
      success: true,
      data: {
        item: customer,
      },
      message: 'Customer created successfully',
    };
  }

  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();
    return {
      success: true,
      data: {
        customers,
      },
      //message: 'Fetch Customers data successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: Schema.Types.ObjectId) {
    const customer = await this.customersService.findOne(id);
    return {
      success: true,
      data: {
        customer,
      },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(id, updateCustomerDto);
    return {
      success: true,
      data: {
        customer,
      },
      message: 'Customer updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: Schema.Types.ObjectId) {
    const customer = await this.customersService.delete(id);
    return {
      success: true,
      data: {
        customer,
      },
      message: 'Customer deleted successfully',
    };
  }
}
