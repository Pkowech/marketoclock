-- Users table: Stores user information with role-based access
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'supplier', 'retailer', 'customer')),
    profile_image_url VARCHAR(512),
    bio TEXT,
    location VARCHAR(255),
    website VARCHAR(255),
    phone_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX users_role_idx ON users(role);
CREATE INDEX users_created_at_idx ON users(created_at);
CREATE INDEX users_updated_at_idx ON users(updated_at);
CREATE INDEX users_last_login_idx ON users(last_login);
```

### 2. Create the `posts` table

The `posts` table stores the main content shared by users. It includes text content, images, and videos. Each post is associated with a user who created it.

```sql
-- Posts table: Main content shared by users
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    post_type VARCHAR(50) NOT NULL CHECK (post_type IN ('microblog', 'blog')),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    is_promoted BOOLEAN DEFAULT false,
    related_product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX posts_user_id_idx ON posts(user_id);
CREATE INDEX posts_post_type_idx ON posts(post_type);
CREATE INDEX posts_status_idx ON posts(status);
CREATE INDEX posts_created_at_idx ON posts(created_at);
CREATE INDEX posts_updated_at_idx ON posts(updated_at);
```

### 3. Create the `post_media` table

The `post_media` table stores images and videos associated with posts. Each post can have multiple images or videos.

```sql
-- Post media table: Images and videos for posts
CREATE TABLE post_media (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL CHECK (media_type IN ('image', 'video')),
    media_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX post_media_post_id_idx ON post_media(post_id);
CREATE INDEX post_media_media_type_idx ON post_media(media_type);
CREATE INDEX post_media_created_at_idx ON post_media(created_at);
```

### 4. Create the `product_images` table

The `product_images` table stores images associated with products. Each product can have multiple images, with one designated as the primary image.

```sql
-- Product images table: Multiple images per product
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(512) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX product_images_product_id_idx ON product_images(product_id);
CREATE INDEX product_images_is_primary_idx ON product_images(is_primary);
CREATE INDEX product_images_created_at_idx ON product_images(created_at);
```

### 5. Create the `promotions` table

The `promotions` table stores information about promotions, such as ads and featured content. Each promotion is associated with a user and can be linked to a post or a product.

```sql
-- Promotions table: For ads and featured content
CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    promotion_type VARCHAR(50) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    budget DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (
        (post_id IS NOT NULL AND product_id IS NULL) OR
        (post_id IS NULL AND product_id IS NOT NULL)
    )
);

-- Indexes
CREATE INDEX promotions_user_id_idx ON promotions(user_id);
CREATE INDEX promotions_post_id_idx ON promotions(post_id);
CREATE INDEX promotions_product_id_idx ON promotions(product_id);
CREATE INDEX promotions_status_idx ON promotions(status);
CREATE INDEX promotions_user_post_product_idx ON promotions(user_id, post_id, product_id);

```

### 6. Create the `reports` table

The `reports` table stores information about reports made by users for content moderation purposes. Reports can be related to posts, comments, or products.

```sql
-- Reports table: For content moderation
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER NOT NULL REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL AND product_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NOT NULL AND product_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NULL AND product_id IS NOT NULL)
    )
);

-- Indexes
CREATE INDEX reports_reporter_id_idx ON reports(reporter_id);
CREATE INDEX reports_post_id_idx ON reports(post_id);
CREATE INDEX reports_comment_id_idx ON reports(comment_id);
CREATE INDEX reports_product_id_idx ON reports(product_id);
CREATE INDEX reports_status_idx ON reports(status);
CREATE INDEX reports_reporter_post_comment_product_idx ON reports(reporter_id, post_id, comment_id, product_id);
```

### 7. Create the `comments` table

The `comments` table stores comments made by users on posts. Comments can be nested, allowing for threaded discussions.

```sql
-- Comments table: For post engagement
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX comments_post_id_idx ON comments(post_id);
CREATE INDEX comments_user_id_idx ON comments(user_id);
CREATE INDEX comments_parent_comment_id_idx ON comments(parent_comment_id);
CREATE INDEX comments_created_at_idx ON comments(created_at);
CREATE INDEX comments_updated_at_idx ON comments(updated_at);
```

### 8. Create the `products` table

The `products` table stores information about products available on the platform. Each product is associated with a user who created it.

```sql
-- Products table: For listing products

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX products_user_id_idx ON products(user_id);
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX products_status_idx ON products(status);
CREATE INDEX products_created_at_idx ON products(created_at);
CREATE INDEX products_updated_at_idx ON products(updated_at);
```

### 


### 9. Create the `product_requests` table

The `product_requests` table stores user-generated requests for products that are not currently available on the platform. Users can request specific products, providing details such as the title, description, category, and price range.

```sql
-- Product requests table: For user-generated requests
CREATE TABLE product_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    price_range VARCHAR(100),
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes

CREATE INDEX product_requests_user_id_idx ON product_requests(user_id);
CREATE INDEX product_requests_status_idx ON product_requests(status);
CREATE INDEX product_requests_category_idx ON product_requests(category);
CREATE INDEX product_requests_price_range_idx ON product_requests(price_range);
CREATE INDEX product_requests_user_status_idx ON product_requests(user_id, status);
```

### 10. Create the `orders` table

The `orders` table stores information about marketplace transactions. Each order is associated with a buyer and contains details such as the total amount, payment method, shipping address, and contact phone number.

```sql

-- Orders table: For marketplace transactions
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    contact_phone VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table: For marketplace transaction details
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX orders_buyer_id_idx ON orders(buyer_id);
CREATE INDEX orders_status_idx ON orders(status);
CREATE INDEX orders_payment_status_idx ON orders(payment_status);
CREATE INDEX orders_created_at_idx ON orders(created_at);
CREATE INDEX orders_updated_at_idx ON orders(updated_at);

CREATE INDEX order_items_order_id_idx ON order_items(order_id);
CREATE INDEX order_items_product_id_idx ON order_items(product_id);
CREATE INDEX order_items_order_product_idx ON order_items(order_id, product_id);
```

### 11. Create the `order_items` table