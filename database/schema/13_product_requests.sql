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


```sql
