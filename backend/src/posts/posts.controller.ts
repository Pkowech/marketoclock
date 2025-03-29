import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
  ): Promise<PostEntity[]> {
    return this.postsService.findAll(limit ? parseInt(limit) : undefined, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }
}