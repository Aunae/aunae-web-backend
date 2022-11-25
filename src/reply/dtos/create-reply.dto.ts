import { Reply } from './../entities/reply.entities';
import { PickType } from '@nestjs/swagger';

export class CreateReplyDto extends PickType(Reply, ['description']) {}
