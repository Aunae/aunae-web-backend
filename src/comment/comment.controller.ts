import { CreateCommentDto } from './dtos/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entities';
import { CommentService } from './comment.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글을 가져온다.',
    description:
      '댓글 uuid로 댓글 정보를 가져온다. 비밀 댓글은 description이 null이다.',
  })
  getComment(@Param('id') id, @GetUser() user: User) {
    return this.commentService.getComment(id, user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글을 작성한다.',
    description: '댓글을 작성한다.',
  })
  createComment(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(user.id, createCommentDto);
  }

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '대댓글을 작성한다.',
    description: '대댓글을 작성한다.',
  })
  createCommentOnComment(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.parentId = id;
    return this.commentService.createComment(user.id, createCommentDto);
  }

  @Post('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글을 삭제한다.',
    description: '댓글 삭제한다.',
  })
  deleteComment(@GetUser() user: User, @Param('id') commentId: string) {
    return this.commentService.deleteComment(user, commentId);
  }
}
