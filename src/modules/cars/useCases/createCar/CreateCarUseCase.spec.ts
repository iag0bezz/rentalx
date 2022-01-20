import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'Brand test',
      category_id: 'Category test',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license_plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Test 1',
        description: 'Car description test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 10,
        brand: 'Brand test',
        category_id: 'Category test',
      });

      await createCarUseCase.execute({
        name: 'Car Test 2',
        description: 'Car description test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 10,
        brand: 'Brand test',
        category_id: 'Category test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'Brand test',
      category_id: 'Category test',
    });

    expect(car.available).toBe(true);
  });
});
