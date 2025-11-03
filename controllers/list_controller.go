package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mA4rK0/project-management/models"
	"github.com/mA4rK0/project-management/services"
	"github.com/mA4rK0/project-management/utils"
)

type ListController struct {
	service services.ListService
}

func NewListController(s services.ListService) *ListController {
	return &ListController{service: s}
}

func (c *ListController) CreateList(ctx *fiber.Ctx) error {
	list := new(models.List)
	if err := ctx.BodyParser(list); err != nil {
		return utils.BadRequest(ctx, "Failed to Read Request", err.Error())
	}
	if err := c.service.Create(list); err != nil {
		return utils.BadRequest(ctx, "Failed to Create List", err.Error())
	}

	return utils.Success(ctx, "List Successfully Created", list)
}