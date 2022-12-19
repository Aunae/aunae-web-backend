import { CommentService } from './../comment/comment.service';
import { UnauthorizedCommentFilter } from './../comment/filters/comment.filter';
import { UnauthorizedFilter } from './../auth/filters/unauthorized.filter';
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
  UseFilters,
} from '@nestjs/common';
import { GetUser } from 'src/user/decorators/user.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('board')
export class BoardController {
  constructor(
    private boardService: BoardService,
    private commentService: CommentService,
  ) {}

  @Get('/:id')
  @ApiOperation({
    summary: '게시글 가져오기',
    description: 'id로 게시글 가져오기',
  })
  getBoardById(@Param('id') id: number) {
    return this.boardService.getBoardById(id);
  }

  @Get('/')
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

  @Get('/:id/comments')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedCommentFilter)
  @ApiOperation({
    summary: 'board의 모든 댓글들을 가져온다',
    description:
      'board의 모든 댓글들을 가져온다. Unauthorized 예외처리가 되어있어 /board/:id/unauthorized 로 redirect된다.',
  })
  getAllCommentsOnBoard(
    @GetUser() user: User,
    @Param('id') boardId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ) {
    return this.commentService.getAllCommentsOnBoard(user.id, boardId, {
      page,
      limit,
    });
  }

  @Get('/:id/comments/unauthorized')
  @ApiOperation({
    summary: 'Unauthorized: board의 모든 댓글들을 가져온다',
    description: 'Unauthorized: board의 모든 댓글들을 가져온다',
  })
  _getAllCommentsOnBoard(
    @Param('id') boardId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ) {
    return this.commentService.getAllCommentsOnBoard(null, boardId, {
      page,
      limit,
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
    return this.boardService.createBoard(user.id, dto);
  }
}
