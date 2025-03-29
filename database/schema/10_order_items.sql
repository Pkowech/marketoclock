-- Order items table: Products in an order
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    supplier_id INTEGER NOT NULL REFERENCES users(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX order_items_order_id_idx ON order_items(order_id);
CREATE INDEX order_items_product_id_idx ON order_items(product_id);
CREATE INDEX order_items_supplier_id_idx ON order_items(supplier_id);
CREATE INDEX order_items_order_product_idx ON order_items(order_id, product_id);
CREATE INDEX order_items_order_supplier_idx ON order_items(order_id, supplier_id);
CREATE INDEX order_items_product_supplier_idx ON order_items(product_id, supplier_id);
CREATE INDEX order_items_order_product_supplier_idx ON order_items(order_id, product_id, supplier_id);
```