package models

import (
	"time"

	"github.com/google/uuid"
)

type Comment struct {
	InternalID int64 `json:"internal_id" db:"internal_id" gorm:"primaryKey;autoIncrement"`
	PublicID   uuid.UUID `json:"public_id" db:"public_id"`
	CardID int64 `json:"card_internal_id" db:"card_internal_id"`
	CardPubID uuid.UUID `json:"card_id" db:"card_id"`
	UserID int64 `json:"user_internal_id" db:"user_internal_id"`
	UserPubID uuid.UUID `json:"user_id" db:"user_id"`
	Message string `json:"message" db:"message"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}