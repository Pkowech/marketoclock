-- Products table: For marketplace listings
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'KES',
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    condition VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX products_supplier_id_idx ON products(supplier_id);
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX products_subcategory_idx ON products(subcategory);
CREATE INDEX products_condition_idx ON products(condition);
CREATE INDEX products_status_idx ON products(status);
CREATE INDEX products_supplier_category_idx ON products(supplier_id, category);
CREATE INDEX products_supplier_subcategory_idx ON products(supplier_id, subcategory);
CREATE INDEX products_supplier_condition_idx ON products(supplier_id, condition);
CREATE INDEX products_supplier_status_idx ON products(supplier_id, status);
CREATE INDEX products_category_status_idx ON products(category, status);
CREATE INDEX products_subcategory_status_idx ON products(subcategory, status);
CREATE INDEX products_condition_status_idx ON products(condition, status);
CREATE INDEX products_supplier_category_status_idx ON products(supplier_id, category, status);
CREATE INDEX products_supplier_subcategory_status_idx ON products(supplier_id, subcategory, status);
CREATE INDEX products_supplier_condition_status_idx ON products(supplier_id, condition, status);
CREATE INDEX products_category_subcategory_status_idx ON products(category, subcategory, status);
CREATE INDEX products_category_condition_status_idx ON products(category, condition, status);
CREATE INDEX products_subcategory_condition_status_idx ON products(subcategory, condition, status);
CREATE INDEX products_supplier_category_subcategory_status_idx ON products(supplier_id, category, subcategory, status);
CREATE INDEX products_supplier_category_condition_status_idx ON products(supplier_id, category, condition, status);
CREATE INDEX products_supplier_subcategory_condition_status_idx ON products(supplier_id, subcategory, condition, status);
CREATE INDEX products_category_subcategory_condition_status_idx ON products(category, subcategory, condition, status);
CREATE INDEX products_supplier_category_subcategory_condition_status_idx ON products(supplier_id, category, subcategory, condition, status);
```
```sql
