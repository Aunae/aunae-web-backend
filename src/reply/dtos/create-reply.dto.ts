import { Reply } from './../entities/reply.entities';
import { PickType } from '@nestjs/swagger';

class CreateReplyDto extends PickType(Reply, ['authorId', 'description']) {}
