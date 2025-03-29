-- Likes table: For post engagement
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NOT NULL)
    )
);

-- Indexes
CREATE INDEX likes_post_id_idx ON likes(post_id);
CREATE INDEX likes_comment_id_idx ON likes(comment_id);
CREATE INDEX likes_user_id_idx ON likes(user_id);
CREATE INDEX likes_post_comment_user_idx ON likes(post_id, comment_id, user_id);

-- Add a trigger to prevent liking your own posts or comments
CREATE OR REPLACE FUNCTION prevent_self_likes()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.post_id IS NOT NULL AND NEW.user_id = (SELECT user_id FROM posts WHERE id = NEW.post_id) THEN
        RAISE EXCEPTION 'You cannot like your own posts';
    END IF;
    IF NEW.comment_id IS NOT NULL AND NEW.user_id = (SELECT user_id FROM comments WHERE id = NEW.comment_id) THEN
        RAISE EXCEPTION 'You cannot like your own comments';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_self_likes_trigger
BEFORE INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION prevent_self_likes();


-- Add a trigger to prevent liking the same post or comment more than once
CREATE OR REPLACE FUNCTION prevent_duplicate_likes()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.post_id IS NOT NULL AND NEW.user_id = ANY(SELECT user_id FROM likes WHERE post_id = NEW.post_id) THEN
        RAISE EXCEPTION 'You cannot like the same post more than once';
    END IF;
    IF NEW.comment_id IS NOT NULL AND NEW.user_id = ANY(SELECT user_id FROM likes WHERE comment_id = NEW.comment_id) THEN
        RAISE EXCEPTION 'You cannot like the same comment more than once';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_duplicate_likes_trigger
BEFORE INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_likes();
```

### 10. [Triggers](database/schema/10_triggers.sql)
```sql

