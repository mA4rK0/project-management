package models

type CardLabel struct {
	CardID  int64 `json:"card_internal_id" db:"card_internal_id" gorm:"column:card_internal_id"`
	LabelID int64 `json:"label_internal_id" db:"label_internal_id" gorm:"column:label_internal_id"`
}