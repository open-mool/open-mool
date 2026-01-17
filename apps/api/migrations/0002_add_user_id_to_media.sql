-- Migration number: 0002 	 2026-01-17T17:00:00.000Z
ALTER TABLE media ADD COLUMN user_id TEXT;
CREATE INDEX idx_media_user_id ON media(user_id);
