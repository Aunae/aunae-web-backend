import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entities';
import { CommentService } from './comment.service';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

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
    return this.commentService.getComment(id);
  }
}
