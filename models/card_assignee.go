package models

type CardAssignee struct {
	CardID int64 `json:"card_internal_id" db:"card_internal_id" gorm:"column:card_internal_id"`
	UserID int64 `json:"user_internal_id" db:"user_internal_id" gorm:"column:user_internal_id"`
}