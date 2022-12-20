import { User } from 'src/user/entities/user.entities';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from './decorators/user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Comment } from 'src/comment/entities/comment.entities';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '유저 profile 가져오기',
    description: '유저 정보를 가져온다',
  })
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    return this.userService.getUser(req.user.id);
  }

  @Get('search/:email')
  @ApiOperation({
    summary: 'email로 유저 profile 가져오기',
    description: 'email로 유저 정보를 가져온다',
  })
  searchUser(@Param('email') email: string) {
    return this.userService.findUser({ email });
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: '유저 생성하기', description: '유저를 생성한다.' })
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/update')
  @ApiOperation({
    summary: '유저 정보 수정하기',
    description: '유저 정보를 수정한다',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(req.user, updateUserDto);
  }

  @Post('/delete')
  @ApiOperation({
    summary: '유저 정보 삭제하기',
    description: '유저 정보를 삭제한다',
  })
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req) {
    return this.userService.deleteUser(req.user);
  }

  @Get('/comment')
  @ApiOperation({
    summary: '유저 댓글 가져오기',
    description: '유저가 작성한 댓글들을 가져온다.',
  })
  @UseGuards(JwtAuthGuard)
  getAllComments(
    @GetUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 20,
  ): Promise<Pagination<Comment, IPaginationMeta>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.getAllComments(user.id, { page, limit });
  }
}
