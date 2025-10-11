package repositories

import (
	"github.com/mA4rK0/project-management/config"
	"github.com/mA4rK0/project-management/models"
)

type BoardRepository interface{
	Create(board *models.Board) error
}

type boardRepository struct{}

func NewBoardRepository() BoardRepository {
	return &boardRepository{}
}

func (r *boardRepository) Create(board *models.Board) error {
	return config.DB.Create(board).Error
}