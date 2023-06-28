import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {}

  async create(todo: Todo, userId: string): Promise<Todo> {
    const newTodo = new this.todoModel({ ...todo, user: userId });
    return newTodo.save();
  }

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ user: userId }).sort({ createdAt: 'desc' }).exec();
  }



  async update(id: string, todo: Todo): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
  }

  async delete(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndRemove(id).exec();
  }

  async findTodosByUser(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ user: { _id: userId } }).exec();
  }
}
