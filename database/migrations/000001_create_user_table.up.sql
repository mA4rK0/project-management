CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  internal_id BIGSERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password text NOT NULL,
  role varchar(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  public_id UUID NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT user_public_id_unique UNIQUE (public_id)
)