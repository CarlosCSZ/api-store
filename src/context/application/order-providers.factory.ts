import {
  CreateOrderUseCase,
  FindWithHigherTotalUseCase,
  TotalSoldLastMonthUseCase,
  UpdateOrderUseCase,
} from './useCases/order';
import { OrderRepository } from '@domain/repositories';

const createOrderFactory = (orderRepo: OrderRepository) =>
  new CreateOrderUseCase(orderRepo);
const createOrderProvider = {
  provide: CreateOrderUseCase,
  useFactory: createOrderFactory,
  inject: [OrderRepository],
};

const findWithHigherTotalFactory = (orderRepo: OrderRepository) =>
  new FindWithHigherTotalUseCase(orderRepo);
const findWithHigherTotalProvider = {
  provide: FindWithHigherTotalUseCase,
  useFactory: findWithHigherTotalFactory,
  inject: [OrderRepository],
};

const totalSoldLastMonthFactory = (orderRepo: OrderRepository) =>
  new TotalSoldLastMonthUseCase(orderRepo);
const findTotalSoldLastMonthProvider = {
  provide: TotalSoldLastMonthUseCase,
  useFactory: totalSoldLastMonthFactory,
  inject: [OrderRepository],
};

const updateOrderFactory = (orderRepo: OrderRepository) =>
  new UpdateOrderUseCase(orderRepo);
const updateOrderProvider = {
  provide: UpdateOrderUseCase,
  useFactory: updateOrderFactory,
  inject: [OrderRepository],
};

export {
  createOrderProvider,
  updateOrderProvider,
  findWithHigherTotalProvider,
  findTotalSoldLastMonthProvider,
};
