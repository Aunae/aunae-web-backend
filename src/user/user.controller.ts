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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    return this.userService.getUser(req.user.id);
  }

  @Get('search/:email')
  searchUser(@Param('email') email: string) {
    return this.userService.findUser({ email });
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(req.user, updateUserDto);
  }

  @Post('/delete')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req) {
    return this.userService.deleteUser(req.user);
  }

  @Get('/comment')
  @UseGuards(JwtAuthGuard)
  getAllComments(@GetUser() user: User) {
    return this.userService.getAllComments(user.id);
  }
}
