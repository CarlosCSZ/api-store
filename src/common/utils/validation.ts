import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { validateSync } from 'class-validator';

export function validatePlainInputSync<T, V>(
  cls: ClassConstructor<T>,
  plaintInput: V,
  options: ClassTransformOptions = {
    enableImplicitConversion: false,
  },
): T {
  const inst = plainToInstance(cls, plaintInput, options);
  const errors = validateSync(inst as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return inst;
}
