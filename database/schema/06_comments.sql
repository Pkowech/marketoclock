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
-- -- Compare this snippet from database/schema/06_comments.sql:
-- -- -- Comments table: For post engagement
-- -- CREATE TABLE comments (
-- --     id SERIAL PRIMARY KEY,
-- --     post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
-- --     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- --     parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
-- --     content TEXT NOT NULL,
-- --     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
-- --     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- -- );