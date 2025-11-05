CREATE TABLE list_positions (
  internal_id BIGSERIAL PRIMARY KEY,
  public_id UUID NOT NULL DEFAULT gen_random_uuid(),
  board_internal_id BIGINT NOT NULL REFERENCES boards(internal_id) ON DELETE CASCADE,
  list_order UUID[] NOT NULL DEFAULT '{}',
  CONSTRAINT list_positions_public_id_unique UNIQUE (public_id),
  CONSTRAINT list_positions_board_unique UNIQUE (board_internal_id)
);