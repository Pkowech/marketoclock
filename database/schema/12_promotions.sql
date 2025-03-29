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