import { BoardService } from './board.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: string) {}

  /**
   * @Todo 어떤 "게시판"에 작성할 것인지를 명시하는 url이 필요할 것. 나중에 수정.
   * @Todo 예를 들어 /board/notice면 공지사항, /board/community이면 자유게시판.. 등등
   */
  @Post('/')
  @UseGuards(JwtAuthGuard)
  createBoard() {}
}
