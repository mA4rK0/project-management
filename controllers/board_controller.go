package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mA4rK0/project-management/models"
	"github.com/mA4rK0/project-management/services"
	"github.com/mA4rK0/project-management/utils"
)

type BoardController struct {
	service services.BoardService
}

func NewBoardController (s services.BoardService) *BoardController {
	return &BoardController{service: s}
}

func (c *BoardController) CreateBoard (ctx *fiber.Ctx) error {
	board := new(models.Board)

	if err := ctx.BodyParser(board); err != nil {
		return utils.BadRequest(ctx, "Failed read request", err.Error())
	}
	if err := c.service.Create(board); err != nil {
		return utils.BadRequest(ctx, "Failed save data", err.Error())
	}

	return utils.Success(ctx, "Board successfully created", board)
}