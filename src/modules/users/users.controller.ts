import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Delete()
  async remove(@Body() userId: User['id']): Promise<void> {
    await this.usersService.removeById(userId);
  }

  @Put(':id')
  async update(@Param('id') id: User['id'], @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }
}
