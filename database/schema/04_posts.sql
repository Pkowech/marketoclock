-- Posts table: For microblogs and blogs
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
-- Compare this snippet from database/schema/05_post_media.sql:
-- -- Post media table: Images and videos for posts
-- CREATE TABLE post_media (
--     id SERIAL PRIMARY KEY,
--     post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,