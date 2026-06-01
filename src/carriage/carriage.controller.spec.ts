import { Test, TestingModule } from '@nestjs/testing';
import { CarriageController } from './carriage.controller';
import { CarriageService } from './carriage.service';

describe('CarriageController', () => {
  let controller: CarriageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriageController],
      providers: [CarriageService],
    }).compile();

    controller = module.get<CarriageController>(CarriageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
