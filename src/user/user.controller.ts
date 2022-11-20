import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(req.user, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req) {
    return this.userService.deleteUser(req.user);
  }
}
