import { CreateReplyDto } from './dtos/create-reply.dto';
import { User } from './../user/entities/user.entities';
import { ReplyService } from './reply.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, UseGuards, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { GetUser } from 'src/user/decorators/user.decorator';

@Controller('reply')
export class ReplyController {
  constructor(private replyService: ReplyService) {}
  @Get('/:id')
  @ApiOperation({
    summary: '답변 가져오기',
    description: '답변 uuid로 답변을 가져온다.',
  })
  getReplyById(@Param('id') id: string) {
    return this.replyService.getReplyById(id);
  }

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '답변 삭제하기',
    description: '답변 uuid로 답변을 삭제한다.',
  })
  deleteReplyById(@GetUser() user: User, @Param('id') id: string) {
    return this.replyService.deleteReplyById(user.id, id);
  }

  /**
   * @todo pagination 구현해야함. 그리고 /board/replies가 맞는가 /reply/board가 맞는가?
   */
  @Get('/board/:boardId')
  @ApiOperation({
    summary: '특정 보드의 답변 가져오기',
    description: '질문 board아이디로 답변을 가져온다.',
  })
  getRepliesOnBoard(@Param('boardId') boardId: string) {
    return this.replyService.getRepliesOnBoard(boardId);
  }

  @Post('/board/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '답변하기',
    description: '질문 board아이디로 답변을 달아준다.',
  })
  replyOnBoard(@GetUser() user: User, @Body() createReplyDto: CreateReplyDto) {
    return this.replyService.replyOnBoard(user.id, createReplyDto);
  }
}
