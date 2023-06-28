import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll(@Req() req: any): Promise<Todo[]> {
    const userId = req.user.id;
    return this.todoService.findAll(userId);
  }

  @Post()
  async create(@Body() todo: Todo, @Req() req: any): Promise<Todo> {
    const userId = req.user.id;
    todo.createdAt = new Date();
    return this.todoService.create(todo, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
