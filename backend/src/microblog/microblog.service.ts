import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { FeedQueryDto } from '../dto/feed-query.dto';

@Injectable()
export class MicroblogService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      author: user,
      commentsCount: 0, // Initialize to avoid undefined
      likesCount: 0,    // Initialize to avoid undefined
    });
    return this.postRepository.save(post);
  }

  async getFeed(query: FeedQueryDto): Promise<{ data: Post[]; meta: any }> {
    const { userId, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (userId) {
      queryBuilder.where('author.id = :userId', { userId });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.getPost(id);

    if (post.author?.id !== user.id) {
      throw new BadRequestException('You can only delete your own posts');
    }

    await this.postRepository.delete(id);
  }

  async createComment(postId: string, createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const post = await this.getPost(postId);

    const comment = this.commentRepository.create({
      ...createCommentDto,
      author: user,
      post,
    });

    await this.commentRepository.save(comment);

    post.commentsCount = (post.commentsCount ?? 0) + 1;
    await this.postRepository.save(post);

    return comment;
  }

  async getComments(postId: string): Promise<Comment[]> {
    const post = await this.getPost(postId);

    return this.commentRepository.find({
      where: { post: { id: post.id } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async likePost(postId: string, user: User): Promise<void> {
    const post = await this.getPost(postId);

    const existingLike = await this.likeRepository.findOne({
      where: { post: { id: post.id }, user: { id: user.id } },
    });

    if (existingLike) {
      throw new BadRequestException('You already liked this post');
    }

    const like = this.likeRepository.create({
      user,
      post,
    });

    await this.likeRepository.save(like);

    post.likesCount = (post.likesCount ?? 0) + 1;
    await this.postRepository.save(post);
  }

  async unlikePost(postId: string, user: User): Promise<void> {
    const post = await this.getPost(postId);

    const existingLike = await this.likeRepository.findOne({
      where: { post: { id: post.id }, user: { id: user.id } },
    });

    if (!existingLike) {
      throw new BadRequestException('You have not liked this post');
    }

    await this.likeRepository.delete(existingLike.id);

    post.likesCount = (post.likesCount ?? 0) - 1;
    await this.postRepository.save(post);
  }

  async getLikes(postId: string): Promise<User[]> {
    const post = await this.getPost(postId);

    const likes = await this.likeRepository.find({
      where: { post: { id: post.id } },
      relations: ['user'],
    });

    return likes.map(like => like.user).filter((user): user is User => user !== undefined);
  }
}