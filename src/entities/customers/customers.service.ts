import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDto } from '../../utils/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../utils/dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerDto> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll(): Promise<CreateCustomerDto[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: Schema.Types.ObjectId): Promise<CreateCustomerDto> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  async update(
    id: Schema.Types.ObjectId,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<UpdateCustomerDto> {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  async delete(id: Schema.Types.ObjectId): Promise<CreateCustomerDto> {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }
}
