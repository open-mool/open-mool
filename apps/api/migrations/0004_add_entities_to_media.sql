-- Migration: Add entities to media table
ALTER TABLE media ADD COLUMN deities TEXT;
ALTER TABLE media ADD COLUMN places TEXT;
ALTER TABLE media ADD COLUMN botanicals TEXT;
