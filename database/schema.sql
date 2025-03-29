-- Users table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) UNIQUE NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "role" VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'supplier', 'retailer', 'customer')),
  "full_name" VARCHAR(100),
  "business_name" VARCHAR(100),
  "bio" TEXT,
  "profile_image" VARCHAR(255),
  "phone" VARCHAR(20),
  "location" VARCHAR(100),
  "is_verified" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "price" DECIMAL(10, 2) NOT NULL,
  "discount_price" DECIMAL(10, 2),
  "quantity" INTEGER NOT NULL,
  "category" VARCHAR(50) NOT NULL,
  "subcategory" VARCHAR(50),
  "status" VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold')),
  "featured" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Images
CREATE TABLE "product_images" (
  "id" SERIAL PRIMARY KEY,
  "product_id" INTEGER NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
  "image_url" VARCHAR(255) NOT NULL,
  "is_primary" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Posts (Microblogs/Blogs)
CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "type" VARCHAR(20) NOT NULL CHECK (type IN ('microblog', 'blog')),
  "product_id" INTEGER REFERENCES "products"("id") ON DELETE SET NULL,
  "status" VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'reported', 'deleted')),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Post Media
CREATE TABLE "post_media" (
  "id" SERIAL PRIMARY KEY,
  "post_id" INTEGER NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "media_url" VARCHAR(255) NOT NULL,
  "media_type" VARCHAR(10) NOT NULL CHECK (media_type IN ('image', 'video')),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments
CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "post_id" INTEGER NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "parent_id" INTEGER REFERENCES "comments"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "status" VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'deleted')),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Likes/Upvotes
CREATE TABLE "engagements" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "post_id" INTEGER REFERENCES "posts"("id") ON DELETE CASCADE,
  "comment_id" INTEGER REFERENCES "comments"("id") ON DELETE CASCADE,
  "type" VARCHAR(20) NOT NULL CHECK (type IN ('like', 'upvote', 'downvote', 'share')),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Reports (for moderation)
CREATE TABLE "reports" (
  "id" SERIAL PRIMARY KEY,
  "reporter_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "post_id" INTEGER REFERENCES "posts"("id") ON DELETE CASCADE,
  "comment_id" INTEGER REFERENCES "comments"("id") ON DELETE CASCADE,
  "reason" VARCHAR(100) NOT NULL,
  "details" TEXT,
  "status" VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "resolved_at" TIMESTAMP WITH TIME ZONE,
  CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Promotions (Ads/Featured Content)
CREATE TABLE "promotions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "post_id" INTEGER REFERENCES "posts"("id") ON DELETE CASCADE,
  "product_id" INTEGER REFERENCES "products"("id") ON DELETE CASCADE,
  "type" VARCHAR(20) NOT NULL CHECK (type IN ('featured', 'sponsored', 'banner')),
  "status" VARCHAR(20) DEFAULT 'active' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "amount_paid" DECIMAL(10, 2) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (post_id IS NOT NULL AND product_id IS NULL) OR
    (post_id IS NULL AND product_id IS NOT NULL)
  )
);

-- Orders
CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "buyer_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "seller_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "status" VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  "total_amount" DECIMAL(10, 2) NOT NULL,
  "shipping_address" TEXT,
  "payment_method" VARCHAR(50),
  "payment_status" VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE "order_items" (
  "id" SERIAL PRIMARY KEY,
  "order_id" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
  "product_id" INTEGER NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
  "quantity" INTEGER NOT NULL,
  "price" DECIMAL(10, 2) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_product_id ON posts(product_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_engagements_user_id ON engagements(user_id);
CREATE INDEX idx_engagements_post_id ON engagements(post_id);
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);