-- Add new columns to documents-- Mark an order as completed
-- UPDATE documents SET processing_status = 'zakończone' WHERE id = '123';able
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'nowe',
ADD COLUMN IF NOT EXISTS invoice_url TEXT,
ADD COLUMN IF NOT EXISTS payment_url TEXT,
ADD COLUMN IF NOT EXISTS processing_status TEXT DEFAULT 'nowe';

-- Create an enum type for order processing status if not exists
-- Note: This would need to be executed separately in Supabase SQL editor
-- CREATE TYPE order_processing_status AS ENUM ('nowe', 'w trakcie', 'zakończone');
-- Then alter the column to use this type:
-- ALTER TABLE documents ALTER COLUMN processing_status TYPE order_processing_status USING processing_status::order_processing_status;

-- Create an index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_processing_status ON documents(processing_status);

-- Update existing documents to have a default status if null
UPDATE documents 
SET status = 'nowe' 
WHERE status IS NULL;

UPDATE documents 
SET processing_status = 'nowe' 
WHERE processing_status IS NULL;

-- Example queries:

-- Set an order as "in progress"
-- UPDATE documents SET processing_status = 'w trakcie' WHERE id = '123';

-- Mark an order as completed
-- UPDATE documents SET processing_status = 'zakończone' WHERE id = '123';

-- Add invoice URL to an order
-- UPDATE documents SET invoice_url = 'https://example.com/invoice.pdf' WHERE id = '123';

-- Add payment URL to an order
-- UPDATE documents SET payment_url = 'https://pay.example.com/payment' WHERE id = '123';
