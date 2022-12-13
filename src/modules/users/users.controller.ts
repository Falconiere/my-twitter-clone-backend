import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UserEntity as User } from './users.entity';
import { UsersService } from './users.service';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() user: User, @Res() res: Response) {
    try {
      const createdUser = await this.usersService.create(user);
      res.status(HttpStatus.CREATED).json(createdUser);
    } catch (errors) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errors,
      });
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: User['id']): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Delete(':id')
  async remove(@Body() userId: User['id']): Promise<void> {
    await this.usersService.removeById(userId);
  }

  @Put(':id')
  async update(@Param('id') id: User['id'], @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }

  @ApiResponse({
    status: 200,
    description: 'The username is available.',
  })
  @Get('username/:username')
  async isUserNameAvailable(@Param('username') username: string) {
    return await this.usersService.isUserNameAvailable(username);
  }
}
