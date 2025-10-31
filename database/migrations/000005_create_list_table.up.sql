CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE lists (
  internal_id BIGSERIAL PRIMARY KEY,
  public_id UUID NOT NULL DEFAULT gen_random_uuid(),
  board_internal_id BIGINT NOT NULL REFERENCES boards(internal_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT lists_public_id_unique UNIQUE (public_id)
);