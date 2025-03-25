import { ProductRepository } from '@domain/repositories';
import { CreateProductUseCase, FindProductUseCase } from './useCases/product';

const createProductFactory = (productRepo: ProductRepository) =>
  new CreateProductUseCase(productRepo);
const createProductProvider = {
  provide: CreateProductUseCase,
  useFactory: createProductFactory,
  inject: [ProductRepository],
};

const findProductFactory = (productRepo: ProductRepository) =>
  new FindProductUseCase(productRepo);
const findProductProvider = {
  provide: FindProductUseCase,
  useFactory: findProductFactory,
  inject: [ProductRepository],
};

export { createProductProvider, findProductProvider };
