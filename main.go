package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/mA4rK0/project-management/config"
	"github.com/mA4rK0/project-management/controllers"
	"github.com/mA4rK0/project-management/database/seed"
	"github.com/mA4rK0/project-management/repositories"
	"github.com/mA4rK0/project-management/routes"
	"github.com/mA4rK0/project-management/services"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	seed.SeedAdmin()
	app := fiber.New()

	userRepo := repositories.NewUserRepository()
	userService := services.NewUserService(userRepo)
	userController := controllers.NewUserController(userService)

	boardRepo := repositories.NewBoardRepository()
	boardService := services.NewBoardService(boardRepo, userRepo)
	boardController := controllers.NewBoardController(boardService)

	routes.Setup(app, userController, boardController)

	port := config.AppConfig.AppPort
	log.Println("Server running on port :", port)
	log.Fatal(app.Listen(":" + port))
}