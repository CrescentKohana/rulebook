package utils

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"os"
	"regexp"
	"strconv"

	log "github.com/sirupsen/logrus"

	"github.com/Luukuton/rulebook/backend/types"
)

// Parses given text file to structs defined in types/rulebook.go.
func ParseTextToRulebook(filePath string) *types.Rulebook {
	file, err := os.Open(filePath)

	rulebook := types.Rulebook{Chapters: []types.Chapter{}}

	if err != nil {
		log.Error(err)
		return &rulebook
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	// Pre-compiled regex
	var chapterR = regexp.MustCompile(`^(\d)\.\s(.*)$`)
	var subchapterR = regexp.MustCompile(`^(\d{3})\.\s(.*)$`)
	var ruleR = regexp.MustCompile(`^\d{3}\.(\d{1,3})\.\s(.*)$`)
	var subruleR = regexp.MustCompile(`^\d{3}\.\d{1,3}(\w)\s(.*)$`)
	var previousR = regexp.MustCompile(`^([^\d].*)$`)

	var currentChapter int
	var currentSubchapter int
	var currentRule int
	var currentSubrule string
	var prevLine string

	blocking := true

	for scanner.Scan() {
		line := scanner.Text()

		// Starts parsing after the first "Credits" in "Contents" as that's where the actual rules start.
		if line == "Credits" {
			blocking = false
			continue
		}

		// Done. No need to parse glossary nor credits.
		if !blocking && line == "Glossary" {
			return &rulebook
		}

		// Skips the beginning and empty lines.
		if len(line) == 0 || blocking {
			continue
		}

		// Chapter
		matched := chapterR.MatchString(line)
		if matched {
			capture := chapterR.FindStringSubmatch(line)
			id, _ := strconv.Atoi(capture[1])

			chapter := types.Chapter{ID: id, Title: capture[2], Subchapters: []types.Subchapter{}}
			rulebook.Chapters = append(rulebook.Chapters, chapter)
			currentChapter = id - 1

			continue
		}

		// Subchapter
		matched = subchapterR.MatchString(line)
		if matched {
			capture := subchapterR.FindStringSubmatch(line)
			id, _ := strconv.Atoi(capture[1])

			subchapter := types.Subchapter{ID: id, Title: capture[2], Rules: []types.Rule{}}
			subchapters := rulebook.Chapters[currentChapter].Subchapters
			rulebook.Chapters[currentChapter].Subchapters = append(subchapters, subchapter)
			currentSubchapter = id - (100 * (currentChapter + 1))

			continue
		}

		// Rule
		matched = ruleR.MatchString(line)
		if matched {
			capture := ruleR.FindStringSubmatch(line)
			id, _ := strconv.Atoi(capture[1])

			rule := types.Rule{ID: id, Content: capture[2], Subrules: []types.Subrule{}}
			rules := rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules
			rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules = append(rules, rule)
			currentRule = id - 1

			prevLine = "RULE"
			continue
		}

		// Subrule
		matched = subruleR.MatchString(line)
		if matched {
			capture := subruleR.FindStringSubmatch(line)

			subrule := types.Subrule{ID: capture[1], Content: capture[2]}
			subrules := rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules[currentRule].Subrules
			rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules[currentRule].Subrules = append(subrules, subrule)
			currentSubrule = capture[1]

			prevLine = "SUBRULE"
			continue
		}

		// Continuing previous rule or subrule on this line
		matched = previousR.MatchString(line)
		if matched {
			capture := previousR.FindStringSubmatch(line)
			extra := "\n" + capture[1]

			switch prevLine {
			case "RULE":
				rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules[currentRule].Content += extra
			case "SUBRULE":
				for index, subrule := range rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules[currentRule].Subrules {
					if subrule.ID == currentSubrule {
						rulebook.Chapters[currentChapter].Subchapters[currentSubchapter].Rules[currentRule].Subrules[index].Content += extra
						break
					}
				}
			}

			continue
		}
	}

	return &rulebook
}

// Parses and unmarshals a given JSON file.
func ParseJSON(filePath string) *types.Rulebook {
	jsonFile, err := os.Open(filePath)

	var rulebook types.Rulebook

	if err != nil {
		log.Error(err)
		return &rulebook
	}

	defer jsonFile.Close()

	// Reads opened JSON file as a byte array.
	byteValue, _ := ioutil.ReadAll(jsonFile)

	json.Unmarshal(byteValue, &rulebook)

	return &rulebook
}
