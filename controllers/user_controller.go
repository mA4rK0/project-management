package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mA4rK0/project-management/models"
	"github.com/mA4rK0/project-management/services"
	"github.com/mA4rK0/project-management/utils"
)

type UserController struct {
	service services.UserService
}

func NewUserController(s services.UserService) *UserController {
	return &UserController{service: s}
}

func (c *UserController) Register(ctx *fiber.Ctx) error {
	user := new(models.User)

	if err := ctx.BodyParser(user); err != nil {
		return utils.BadRequest(ctx, "Failed Parsing Data", err.Error())
	}
	if err := c.service.Register(user); err != nil {
		return utils.BadRequest(ctx, "Failed Registration", err.Error())
	}

	return utils.Success(ctx, "Register Success", user)
}