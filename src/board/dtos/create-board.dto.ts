import { Board } from './../entities/board.entities';
import { PickType } from '@nestjs/swagger';

export class CreateBoardDto extends PickType(Board, ['title', 'description']) {}
