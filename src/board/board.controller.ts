import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from './../user/entities/user.entities';
import { BoardService } from './board.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
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

  @Get()
  @ApiOperation({
    summary: '최신 게시글 가져오기',
    description: '최신 게시글을 paginate해서 가져옴',
  })
  getBoardIndex(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.boardService.getBoardIndex({
      page,
      limit,
      // route: 'http://localhost:4000/boards'
    });
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
