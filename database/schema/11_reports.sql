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