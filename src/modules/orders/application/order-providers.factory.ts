import {
  CreateOrderUseCase,
  FindWithHigherTotalUseCase,
  TotalSoldLastMonthUseCase,
  UpdateOrderUseCase,
  FindOrderByIdUseCase,
} from '@modules/orders/application/useCases/';
import { OrderRepository } from '../domain/repositories';

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

const findOrderByIdFactory = (orderRepo: OrderRepository) =>
  new FindOrderByIdUseCase(orderRepo);
const findOrderByIdProvider = {
  provide: FindOrderByIdUseCase,
  useFactory: findOrderByIdFactory,
  inject: [OrderRepository],
};

export {
  createOrderProvider,
  updateOrderProvider,
  findWithHigherTotalProvider,
  findTotalSoldLastMonthProvider,
  findOrderByIdProvider,
};
