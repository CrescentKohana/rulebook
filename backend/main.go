package main

import (
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/Luukuton/rulebook/backend/api"
	"github.com/Luukuton/rulebook/backend/types"
	"github.com/Luukuton/rulebook/backend/utils"
)

// Main function. Handles CLI arguments and starts the server.
func main() {
	var rulebook *types.Rulebook

	if len(os.Args) >= 4 {
		log.Println("Data dir set:",  os.Args[3])
		utils.DataPath = os.Args[3]
	}

	if len(os.Args) >= 3 {
		if os.Args[1] == "url" {
			path, err := utils.DownloadFile(os.Args[2], "rulebook_initial_download.txt")
			if err != nil {
				log.Println(err)
			} else {
				log.Println("Initial download:", path)
				rulebook = utils.ParseTextToRulebook(path)
			}
		} else if os.Args[1] == "file" {
			log.Println("Initial file:",  os.Args[2])
			rulebook = utils.ParseTextToRulebook(os.Args[2])
		}
	}

	if len(rulebook.Chapters) != 0 {
		log.Println("Initial rule parsing succeeded. Starting backend...")
	} else {
		log.Println("Initial rule parsing failed. Starting backend anyway...")
	}

	api.StartAPI(*rulebook)
}
