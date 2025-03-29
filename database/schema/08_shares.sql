-- Shares table: For post sharing
CREATE TABLE shares (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX shares_post_id_idx ON shares(post_id);
CREATE INDEX shares_user_id_idx ON shares(user_id);
CREATE INDEX shares_post_user_idx ON shares(post_id, user_id);
```