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
    sortedField?: keyof Order,
    limit?: number,
  ): Promise<Order[]> {
    const aggregationPipe: PipelineStage[] = [
      { $match: query },
      ...(sortedField
        ? sortedField === 'total'
          ? ([
              { $addFields: { totalAsNumber: { $toDouble: '$total' } } },
              { $sort: { totalAsNumber: -1 } },
            ] as PipelineStage[])
          : ([{ $sort: { [sortedField]: -1 } }] as PipelineStage[])
        : []),
      ...(limit ? [{ $limit: limit }] : []),
      {
        $lookup: {
          from: 'products',
          localField: 'productList',
          foreignField: '_id',
          as: 'productList',
        },
      },
    ];

    return this.findByAggregate(aggregationPipe);
  }

  async findWithinRange(start: Date, end: Date): Promise<Order[]> {
    return this.findByAggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
    ]);
  }

  private async findByAggregate(query: PipelineStage[]): Promise<Order[]> {
    return this.orderModel.aggregate(query).exec();
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
