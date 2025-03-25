import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { FilterQuery, Model, PipelineStage } from 'mongoose';

import { NotFoundException } from '@common/exceptions/api.exception';
import { DATABASES } from '@common/constants/databases.enum';
import { Order } from '../../domain/entities';
import { OrderRepository } from '../../domain/repositories';
import { OrderMongoSchema } from '../schemas';

@Injectable()
export class OrderMongoRepository implements OrderRepository {
  constructor(
    @InjectModel(Order.name, DATABASES.MONGO)
    private readonly orderModel: Model<OrderMongoSchema>,
  ) {}

  async findSorted(
    query: FilterQuery<Order>,
    sort: Record<string, any> | string,
    limit: number,
  ): Promise<Order[]> {
    return this.orderModel.find(query).sort(sort).limit(limit).exec();
  }

  async findWithFilters(query: PipelineStage[]): Promise<Order[]> {
    return this.orderModel.aggregate(query);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order.toJSON();
  }

  async create(order: Order): Promise<Order> {
    return this.orderModel.create(order);
  }

  async update(id: string, order: Order): Promise<Order> {
    const orderToUpdate = await this.orderModel
      .findByIdAndUpdate(id, order, {
        new: true,
      })
      .exec();
    if (!orderToUpdate) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return orderToUpdate.toJSON();
  }
}
