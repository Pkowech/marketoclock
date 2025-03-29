-- Create indexes for performance
CREATE INDEX idx_products_supplier_id ON products(supplier_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_order_items_supplier_id ON order_items(supplier_id);

-- Add a unique constraint to prevent duplicate likes
ALTER TABLE likes ADD CONSTRAINT unique_likes UNIQUE (post_id, comment_id, user_id);

-- Add a unique constraint to prevent duplicate shares
ALTER TABLE shares ADD CONSTRAINT unique_shares UNIQUE (post_id, user_id);

-- Add a unique constraint to prevent duplicate reports
ALTER TABLE reports ADD CONSTRAINT unique_reports UNIQUE (reporter_id, post_id, comment_id, product_id);

-- Add a unique constraint to prevent duplicate order items
ALTER TABLE order_items ADD CONSTRAINT unique_order_items UNIQUE (order_id, product_id, supplier_id);

-- Add a unique constraint to prevent duplicate products
ALTER TABLE products ADD CONSTRAINT unique_products UNIQUE (name, supplier_id);

-- Add a unique constraint to prevent duplicate categories
ALTER TABLE categories ADD CONSTRAINT unique_categories UNIQUE (name);

-- Add a unique constraint to prevent duplicate users
ALTER TABLE users ADD CONSTRAINT unique_users UNIQUE (email);

-- Add a unique constraint to prevent duplicate posts
ALTER TABLE posts ADD CONSTRAINT unique_posts UNIQUE (user_id, content);

-- Add a unique constraint to prevent duplicate comments
ALTER TABLE comments ADD CONSTRAINT unique_comments UNIQUE (post_id, user_id, content);

-- Add a unique constraint to prevent duplicate orders
ALTER TABLE orders ADD CONSTRAINT unique_orders UNIQUE (user_id, status);

-- Add a unique constraint to prevent duplicate promotions
ALTER TABLE promotions ADD CONSTRAINT unique_promotions UNIQUE (product_id, start_date, end_date);

-- Add a unique constraint to prevent duplicate product requests
ALTER TABLE product_requests ADD CONSTRAINT unique_product_requests UNIQUE (product_id, user_id);

-- Add a unique constraint to prevent duplicate product images
ALTER TABLE product_images ADD CONSTRAINT unique_product_images UNIQUE (product_id, image_url);

-- Add a unique constraint to prevent duplicate order items
ALTER TABLE order_items ADD CONSTRAINT unique_order_items UNIQUE (order_id, product_id, supplier_id);

-- Add a unique constraint to prevent duplicate reports
ALTER TABLE reports ADD CONSTRAINT unique_reports UNIQUE (reporter_id, post_id, comment_id, product_id);

-- Add a unique constraint to prevent duplicate likes
ALTER TABLE likes ADD CONSTRAINT unique_likes UNIQUE (post_id, comment_id, user_id);

-- Add a unique constraint to prevent duplicate shares
ALTER TABLE shares ADD CONSTRAINT unique_shares UNIQUE (post_id, user_id);

-- Add a unique constraint to prevent duplicate reports
ALTER TABLE reports ADD CONSTRAINT unique_reports UNIQUE (reporter_id, post_id, comment_id, product_id);

-- Add a unique constraint to prevent duplicate order items
ALTER TABLE order_items ADD CONSTRAINT unique_order_items UNIQUE (order_id, product_id, supplier_id);

-- Add a unique constraint to prevent duplicate products
ALTER TABLE products ADD CONSTRAINT unique_products UNIQUE (name, supplier_id);

-- Add a unique constraint to prevent duplicate categories
ALTER TABLE categories ADD CONSTRAINT unique_categories UNIQUE (name);