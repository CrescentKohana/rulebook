package main

import (
	"io"
	"net/http"
	"os"

	"github.com/Luukuton/rulebook/backend/api"
	"github.com/Luukuton/rulebook/backend/types"
	"github.com/Luukuton/rulebook/backend/utils"
)

func DownloadFile(filepath string, url string) error {
	response, err := http.Get(url)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	output, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer output.Close()

	_, err = io.Copy(output, response.Body)
	return err
}

func main() {
	var rulebook types.Rulebook
	parsed := false

	if len(os.Args) >= 3 {
		if os.Args[1] == "url" {
			err := DownloadFile("/usr/data/rulebook_downloaded.txt", os.Args[2])
			if err != nil {
				panic(err)
			}
			println("Downloaded: " + os.Args[2])

			rulebook = utils.ParseTextToRulebook("/usr/data/rulebook_downloaded.txt")
			parsed = true
		} else if os.Args[1] == "file" {
			rulebook = utils.ParseTextToRulebook(os.Args[2])
			parsed = true
		}
	}

	if !parsed {
		println("No source specified. Trying default file data/rulebook.txt")
		rulebook = utils.ParseTextToRulebook("data/rulebook.txt")
	}

	if len(rulebook.Chapters) != 0 {
		println("Successfully parsed rules. Starting backend...")
		api.StartAPI(rulebook)
	} else {
		println("Parsing failed. Stopping backend...")
	}
}
