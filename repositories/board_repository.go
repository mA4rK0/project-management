package repositories

import (
	"github.com/mA4rK0/project-management/config"
	"github.com/mA4rK0/project-management/models"
)

type BoardRepository interface{
	Create(board *models.Board) error
	Update (board *models.Board) error
	FindByPublicID (publicID string) (*models.Board, error)
}

type boardRepository struct{}

func NewBoardRepository() BoardRepository {
	return &boardRepository{}
}

func (r *boardRepository) Create(board *models.Board) error {
	return config.DB.Create(board).Error
}

func (r *boardRepository) Update (board *models.Board) error {
	return config.DB.Model(&models.Board{}).Where("public_id = ?", board.PublicID).Updates(map[string]interface{}{
		"title": board.Title,
		"description": board.Description,
		"due_date": board.Duedate,
	}).Error
}

func (r *boardRepository) FindByPublicID (publicID string) (*models.Board, error) {
	var board models.Board
	err := config.DB.Where("public_id = ?", publicID).First(&board).Error
	return &board, err
}