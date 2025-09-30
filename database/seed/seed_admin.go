package seed

import (
	"log"

	"github.com/mA4rK0/project-management/config"
	"github.com/mA4rK0/project-management/models"
	"github.com/mA4rK0/project-management/utils"
)

func SeedAdmin() {
	password, _ := utils.HashPassword("admin12345")
	admin := models.User {
		Name: "Sigma Admin",
		Email: "admin@example.com",
		Password: password,
		Role: "admin",
	}
	if err := config.DB.FirstOrCreate(&admin, models.User{Email: admin.Email}).Error; err != nil {
		log.Println("Failed to seed admin", err)
	} else {
		log.Println("Admin seeded successfully")
	}
}