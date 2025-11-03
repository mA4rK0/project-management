package repositories

import (
	"github.com/google/uuid"
	"github.com/mA4rK0/project-management/config"
	"github.com/mA4rK0/project-management/models"
)

type ListPositionRepository interface {
	GetByBoard(boardPublicID string) (*models.ListPosition, error)
	CreateOrUpdate(boardPublicID string, listOrder []uuid.UUID) error
	GetListOrder(boardPublicID string) ([]uuid.UUID, error)
	UpdateListOrder(position *models.ListPosition) error
}

type listPositionRepository struct{}

func NewListPositionRepository() ListPositionRepository {
	return &listPositionRepository{}
}

func (r *listPositionRepository) GetByBoard(boardPublicID string) (*models.ListPosition, error) {
	var position models.ListPosition

	err := config.DB.Joins("JOIN boards ON boards.internal_id = list_positions.board_internal_id").Where("boards.public_id = ?", boardPublicID).Error

	return &position, err
}

func (r *listPositionRepository) CreateOrUpdate(boardPublicID string, listOrder []uuid.UUID) error {
	return config.DB.Exec(`
	INSERT INTO list_positions (board_internal_id, list_order) 
	SELECT internal_id, ? 
	FROM boards Where public_id = ? 
	ON CONFLICT (board_internal_id) 
	DO UPDATE SET list_order = EXCLUDE.list_order`, listOrder, boardPublicID).Error
}

func (r *listPositionRepository) GetListOrder(boardPublicID string) ([]uuid.UUID, error) {
	position, err := r.GetByBoard(boardPublicID)
	if err != nil {
		return nil, err
	}

	return position.ListOrder, err
}

func (r *listPositionRepository) UpdateListOrder(position *models.ListPosition) error {
	return config.DB.Model(position).Where("internal_id = ? ", position.InternalID).
	Update("list_order", position.ListOrder).Error
}