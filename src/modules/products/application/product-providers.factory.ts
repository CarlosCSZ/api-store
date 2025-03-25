import { ProductRepository } from '../domain/repositories';
import {
  CreateProductUseCase,
  FindProductByIdUseCase,
  FindProductBySkuUseCase,
} from './useCases';

const createProductFactory = (productRepo: ProductRepository) =>
  new CreateProductUseCase(productRepo);
const createProductProvider = {
  provide: CreateProductUseCase,
  useFactory: createProductFactory,
  inject: [ProductRepository],
};

const findProductByIdFactory = (productRepo: ProductRepository) =>
  new FindProductByIdUseCase(productRepo);
const findProductByIdProvider = {
  provide: FindProductByIdUseCase,
  useFactory: findProductByIdFactory,
  inject: [ProductRepository],
};

const findProductBySkuFactory = (productRepo: ProductRepository) =>
  new FindProductBySkuUseCase(productRepo);
const findProductBySkuProvider = {
  provide: FindProductBySkuUseCase,
  useFactory: findProductBySkuFactory,
  inject: [ProductRepository],
};

export {
  createProductProvider,
  findProductByIdProvider,
  findProductBySkuProvider,
};
