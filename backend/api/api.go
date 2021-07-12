package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"regexp"
	"strconv"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/Luukuton/rulebook/backend/types"
	"github.com/Luukuton/rulebook/backend/utils"
)

type httpError struct {
	Code    int
	Message string
}

type formData struct {
	URL string `json:"url"`
}

var rulebook types.Rulebook
var chaptersOnly types.Rulebook

// Returns one subchapter as JSON.
func returnSubchapter(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	chapterID, _ := strconv.Atoi(params["id"])
	subchapterID, _ := strconv.Atoi(params["subid"])

	// Subtracts the padding (e.g. 203 -> 3 or 100 -> 0).
	subchapterID -= (chapterID * 100)

	tooSmall := chapterID < 1 || subchapterID < 0
	tooLarge := chapterID > len(rulebook.Chapters) || subchapterID > len(rulebook.Chapters[chapterID-1].Subchapters)-1
	if tooSmall || tooLarge {
		errorHandler(w, r, http.StatusNotFound, "")
		return
	}

	json.NewEncoder(w).Encode(rulebook.Chapters[chapterID-1].Subchapters[subchapterID])
	println("Endpoint Hit: returnSubchapter ", subchapterID)
}

// Returns one chapter as JSON.
func returnChapter(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	if id < 1 || id > len(rulebook.Chapters) {
		errorHandler(w, r, http.StatusNotFound, "")
		return
	}

	json.NewEncoder(w).Encode(rulebook.Chapters[id-1])
	log.Println("Endpoint Hit: returnChapter ", id)
}

// Returns the whole rulebook as JSON. 
// If query param 'filter' is set to true, only chapters are included (i.e. no subchapter or rule data).
func returnRulebook(w http.ResponseWriter, r *http.Request) {
	filter := r.URL.Query().Get("filter")
	if filter == "true" {
		json.NewEncoder(w).Encode(chaptersOnly)
	} else {
		json.NewEncoder(w).Encode(rulebook)
	}

	log.Println("Endpoint Hit: returnRulebook <filter:", filter, ">")
}

func newRulebook(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")

	var originLocalhost = regexp.MustCompile(`^https?:\/\/(?:localhost|frontend):\d+$`)
	var originFrontend = regexp.MustCompile(`^https?:\/\/(?:localhost|frontend):\d+$`)

	if originLocalhost.MatchString(origin) || originFrontend.MatchString(origin) {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Vary", "Origin")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
	} else if r.Method == "OPTIONS" {
		errorHandler(w, r, http.StatusForbidden, "")
		return
	}

	var formData formData
	err := json.NewDecoder(r.Body).Decode(&formData)

	if err != nil || formData.URL == "" {
		errorHandler(w, r, http.StatusBadRequest, "missing url body parameter")
		return
	}

	urlParsed, err := url.ParseRequestURI(formData.URL)
	if err != nil {
		errorHandler(w, r, http.StatusBadRequest, "malformed url body parameter")
		return
	}

	path, err := utils.DownloadFile(urlParsed.String(), "rulebook_runtime_download.txt")
	if err != nil {
		errorHandler(w, r, http.StatusBadRequest, "invalid url body parameter or its content was malformed")
		return
	}

	newRulebook := *utils.ParseTextToRulebook(path)
	if len(newRulebook.Chapters) == 0 {
		errorHandler(w, r, http.StatusBadRequest, "invalid url body parameter or its content was malformed")
		return
	}

	// Replace data
	rulebook = newRulebook

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, `{ "code": %d, "message": "new rulebook data added" }`, http.StatusCreated)
	log.Println("Endpoint Hit: newRulebook with URL:", urlParsed)
}

// Returns the root path as JSON.
func root(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, `{ "message": "Latest Rulebook API available at /api/v1/chapters" }`)
	log.Println("Endpoint Hit: root")
}

// Handles errors. Argument msg is only used with bad requests
func errorHandler(w http.ResponseWriter, r *http.Request, status int, msg string) {
	switch status {
	case http.StatusNotFound:
		w.WriteHeader(status)
		fmt.Fprintf(w, `{ "code": %d, "message": "not found" }`, status)
	case http.StatusBadRequest:
		w.WriteHeader(status)
		fmt.Fprintf(w, `{ "code": %d, "message": "%s" }`, status, msg)
	case http.StatusForbidden:
		w.WriteHeader(status)
		fmt.Fprintf(w, `{ "code": %d, "message": "forbidden" }`, status)
	default:
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, `{ "code": %d, "message": "internal server error" }`, http.StatusInternalServerError)
	} 
}

// Handles HTTP requests.
func handleRequests() {
	baseURL := "/api/v1"
	r := mux.NewRouter().StrictSlash(true)

	// Routers
	r.HandleFunc("/", root).Methods("GET")
	r.HandleFunc(baseURL+"/chapters", returnRulebook).Methods("GET")
	r.HandleFunc(baseURL+"/chapters", newRulebook).Methods("POST", "OPTIONS")
	r.HandleFunc(baseURL+"/chapters/{id:[1-9][0-9]*}", returnChapter).Methods("GET")
	r.HandleFunc(baseURL+"/chapters/{id:[1-9][0-9]*}/{subid:[1-9][0-9]{2}}", returnSubchapter).Methods("GET")

	// Error handling
	r.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(httpError{Code: http.StatusNotFound, Message: http.StatusText(http.StatusNotFound)})
	})

	log.Error(http.ListenAndServe(":5050", r))
}

// Starts API server.
func StartAPI(rulebookArg types.Rulebook) {
	rulebook = rulebookArg

	// Fill chaptersOnly without subchapter data.
	for _, chapter := range rulebook.Chapters {
		newChapter := types.Chapter{ID: chapter.ID, Title: chapter.Title, Subchapters: nil}
		chaptersOnly.Chapters = append(chaptersOnly.Chapters, newChapter)
	}

	handleRequests()
}
