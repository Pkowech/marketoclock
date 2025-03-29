// components/microblog/CreatePost.tsx
import { useState, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { MicroblogService } from '@/services/microblog-service';
import { toast } from 'sonner';

interface CreatePostProps {
  onPostCreated: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (images.length + newFiles.length > 4) {
        toast('You can only upload up to 4 images per post.', {
          style: { background: '#FEE2E2', color: '#DC2626' }
        });
        return;
      }

      setImages([...images, ...newFiles]);
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newUrls = [...imageUrls];
    
    URL.revokeObjectURL(newUrls[index]);
    newImages.splice(index, 1);
    newUrls.splice(index, 1);
    
    setImages(newImages);
    setImageUrls(newUrls);
  };

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) return;
    
    setIsSubmitting(true);
    try {
      await MicroblogService.createPost({
        content,
        images
      });
      
      setContent('');
      setImages([]);
      setImageUrls([]);
      onPostCreated();
      
      toast('Your post has been published!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast('Failed to publish your post. Please try again.', {
        style: { background: '#FEE2E2', color: '#DC2626' }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <Textarea
          placeholder="What's happening in the market today?"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          className="resize-none min-h-24 border-none focus-visible:ring-0 p-0"
        />
        
        {imageUrls.length > 0 && (
          <div className={`grid gap-2 mt-2 ${imageUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full z-10 bg-black/60 text-white border-none hover:bg-black/80"
                  onClick={() => removeImage(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
                <Image 
                  src={url} 
                  alt={`Post image ${index + 1}`} 
                  fill 
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting || images.length >= 4}
        >
          <ImageIcon className="h-4 w-4 mr-1" />
          Add Images
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || (!content.trim() && images.length === 0)}
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}