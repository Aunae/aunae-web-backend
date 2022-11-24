import { Test, TestingModule } from '@nestjs/testing';
import { ReplyController } from './reply.controller';

describe('ReplyController', () => {
  let controller: ReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplyController],
    }).compile();

    controller = module.get<ReplyController>(ReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
