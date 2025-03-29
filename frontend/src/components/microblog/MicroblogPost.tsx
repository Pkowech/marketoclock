// components/microblog/MicroblogPost.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeartIcon, MessageCircleIcon, ShareIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Removed unused MicroblogService import

interface MicroblogPostProps {
  post: {
    id: string;
    content: string;
    createdAt: string;
    images?: string[];
    likes: number;
    comments: number;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
    liked?: boolean;
  };
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export function MicroblogPost({ post, onLike, onComment }: MicroblogPostProps) {
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="whitespace-pre-line">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 mt-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {post.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                <Image 
                  src={image} 
                  alt={`Post image ${index + 1}`} 
                  fill 
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col pt-1">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center ${post.liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <HeartIcon className="h-4 w-4 mr-1" />
            {post.likes > 0 && <span>{post.likes}</span>}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowCommentInput(!showCommentInput)}
          >
            <MessageCircleIcon className="h-4 w-4 mr-1" />
            {post.comments > 0 && <span>{post.comments}</span>}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <ShareIcon className="h-4 w-4 mr-1" />
          </Button>
        </div>
        
        {showCommentInput && (
          <form onSubmit={handleCommentSubmit} className="w-full mt-2 flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="sm">Post</Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}