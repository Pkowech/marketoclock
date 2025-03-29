import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroblogController } from './microblog.controller';
import { MicroblogService } from './microblog.service';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, Like]),
    AuthModule,
  ],
  controllers: [MicroblogController],
  providers: [MicroblogService],
})
export class MicroblogModule {}