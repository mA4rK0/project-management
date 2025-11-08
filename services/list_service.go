package services

import (
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/mA4rK0/project-management/config"
	"github.com/mA4rK0/project-management/models"
	"github.com/mA4rK0/project-management/models/types"
	"github.com/mA4rK0/project-management/repositories"
	"github.com/mA4rK0/project-management/utils"
	"gorm.io/gorm"
)

type ListService interface {
	GetByBoardID(boardPublicID string) (*ListWithOrder, error)
	GetByID(id uint) (*models.List, error)
	GetByPublicID(publicID string) (*models.List, error)
	Create(list *models.List) error
	Update(list *models.List) error
	Delete(id uint) error
	UpdatePositions(boardPublicID string, positions []uuid.UUID) error
}

type listService struct {
	listRepo repositories.ListRepository
	boardRepo repositories.BoardRepository
	listPosRepo repositories.ListPositionRepository
}

type ListWithOrder struct {
	Positions []uuid.UUID
	Lists []models.List
}

func NewListService(
	listRepo repositories.ListRepository,
	boardRepo repositories.BoardRepository,
	listPosRepo repositories.ListPositionRepository,
) ListService {
	return &listService{listRepo, boardRepo, listPosRepo}
}

func (s *listService) GetByBoardID(boardPublicID string) (*ListWithOrder, error) {
	_, err := s.boardRepo.FindByPublicID(boardPublicID)
	if err != nil {
		return nil, errors.New("board not found")
	}

	position, err := s.listPosRepo.GetListOrder(boardPublicID)
	if err != nil {
		return nil, errors.New("failed to get list order : "+ err.Error())
	}
	if len(position) == 0 {
		return nil, errors.New("list position not found")
	}
	
	lists, err := s.listRepo.FindByBoardID(boardPublicID)
	if err != nil {
		return nil, errors.New("failed to get list : "+ err.Error())
	}

	fmt.Println(position)
	fmt.Println(lists)

	orderedList := utils.SortListsByPosition(lists, position)
	return &ListWithOrder{
		Positions: position,
		Lists: orderedList,
	}, nil
}

func (s *listService) GetByID(id uint) (*models.List, error) {
	return s.listRepo.FindByID(id)
}

func (s *listService) GetByPublicID(publicID string) (*models.List, error) {
	return s.listRepo.FindByPublicID(publicID)
}

func (s *listService) Create(list *models.List) error {
	board, err := s.boardRepo.FindByPublicID(list.BoardPublicID.String())
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("board not found")
		}
		return fmt.Errorf("failed to get board : %w", err)
	}
	list.BoardInternalID = board.InternalID

	if list.PublicID == uuid.Nil {
		list.PublicID = uuid.New()
	}

	tx := config.DB.Begin()

	// begin transaction
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// save new list
	if err := tx.Create(list).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to create list : %w", err)
	}

	// update position
	var position models.ListPosition
	res := tx.Where("board_internal_id = ?", board.InternalID).First(&position)
	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		position = models.ListPosition{
			PublicID: uuid.New(),
			BoardID: board.InternalID,
			ListOrder: types.UUIDArray{list.PublicID},
		}
		if err := tx.Create(&position).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to create list position : %w", err)
		}
	} else if res.Error != nil {
			tx.Rollback()
			return fmt.Errorf("failed to create list position : %w", res.Error)
	} else {
			position.ListOrder = append(position.ListOrder, list.PublicID)
			if err := tx.Model(&position).Update("list_order", position.ListOrder).Error; err != nil {
				tx.Rollback()
				return fmt.Errorf("failed to update list position : %w", err)
			}
	}

	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("transaction commit failed : %w", err)
	}
	return nil
}

func (s *listService) Update(list *models.List) error {
	return s.listRepo.Update(list)
}

func (s *listService) Delete(id uint) error {
	return s.listRepo.Delete(id)
}

func (s *listService) UpdatePositions(boardPublicID string, positions []uuid.UUID) error {
	board, err := s.boardRepo.FindByPublicID(boardPublicID)
	if err != nil {
		return errors.New("board not found")
	}

	position, err := s.listPosRepo.GetByBoard(board.PublicID.String())
	if err != nil {
		return errors.New("list position not found")
	}

	position.ListOrder = positions
	return s.listPosRepo.UpdateListOrder(position)
}