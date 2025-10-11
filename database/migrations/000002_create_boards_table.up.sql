CREATE TABLE boards (
  internal_id BIGSERIAL PRIMARY KEY,
  public_id UUID NOT NULL DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description TEXT,
  owner_internal_id BIGINT NOT NULL REFERENCES users(internal_id),
  owner_public_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT boards_public_id_unique UNIQUE (public_id),
  CONSTRAINT fk_boards_owner_public_id
    FOREIGN KEY (owner_public_id)
      REFERENCES users(public_id)
      ON DELETE CASCADE
);