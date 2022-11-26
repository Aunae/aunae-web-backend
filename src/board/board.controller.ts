import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from './../user/entities/user.entities';
import { BoardService } from './board.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { GetUser } from 'src/user/decorators/user.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/:id')
  @ApiOperation({
    summary: '게시글 가져오기',
    description: 'id로 게시글 가져오기',
  })
  getBoardById(@Param('id') id: number) {
    return this.boardService.getBoardById(id);
  }

  /**
   * @Todo 어떤 "게시판"에 작성할 것인지를 명시하는 url이 필요할 것. 나중에 수정.
   * @Todo 예를 들어 /board/notice면 공지사항, /board/community이면 자유게시판.. 등등
   */
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '게시글 만들기',
    description: '게시글 작성하기',
  })
  createBoard(@GetUser() user: User, @Body() dto: CreateBoardDto) {
    return this.boardService.createBoad(user.id, dto);
  }
}
