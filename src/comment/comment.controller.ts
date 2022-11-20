import { CreateCommentDto } from './dtos/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entities';
import { CommentService } from './comment.service';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글을 가져온다.',
    description: '댓글 uuid로 댓글 정보를 가져온다.',
  })
  getComment(@Param('id') id, @GetUser() user: User) {
    return this.commentService.getComment(id, user);
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
    return this.commentService.createComment(user, createCommentDto);
  }

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  createCommentOnComment() {
    return this.commentService;
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글을 수정한다.',
    description: '댓글 수정한다.',
  })
  updateComment(
    @GetUser() user: User,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(user, updateCommentDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글을 삭제한다.',
    description: '댓글 삭제한다.',
  })
  deleteComment(@GetUser() user: User, @Param('id') commentId: string) {
    return this.commentService.deleteComment(user, commentId);
  }
}
