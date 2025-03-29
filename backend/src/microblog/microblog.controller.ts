import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MicroblogService } from './microblog.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { FeedQueryDto } from '../dto/feed-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/entities/user.entity'; // Import User entity

interface AuthenticatedRequest extends Request {
  user: User; // Type req.user explicitly
}

@ApiTags('microblog')
@Controller('microblog')
export class MicroblogController {
  constructor(private readonly microblogService: MicroblogService) {}

  @Post('posts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createPost(@Body() createPostDto: CreatePostDto, @Req() req: AuthenticatedRequest) {
    return this.microblogService.createPost(createPostDto, req.user);
  }

  @Get('feed')
  getFeed(@Query() query: FeedQueryDto) {
    return this.microblogService.getFeed(query);
  }

  @Get('posts/:id')
  getPost(@Param('id') id: string) {
    return this.microblogService.getPost(id);
  }

  @Delete('posts/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deletePost(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.microblogService.deletePost(id, req.user);
  }

  @Post('posts/:id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.microblogService.createComment(postId, createCommentDto, req.user);
  }

  @Get('posts/:id/comments')
  getComments(@Param('id') postId: string) {
    return this.microblogService.getComments(postId);
  }

  @Post('posts/:id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  likePost(@Param('id') postId: string, @Req() req: AuthenticatedRequest) {
    return this.microblogService.likePost(postId, req.user);
  }

  @Delete('posts/:id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  unlikePost(@Param('id') postId: string, @Req() req: AuthenticatedRequest) {
    return this.microblogService.unlikePost(postId, req.user);
  }

  @Get('posts/:id/likes')
  getLikes(@Param('id') postId: string) {
    return this.microblogService.getLikes(postId);
  }
}