package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/Luukuton/rulebook/backend/types"
)

type HTTPError struct {
	Code    int
	Message string
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
		errorHandler(w, r, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(rulebook.Chapters[chapterID-1].Subchapters[subchapterID])
	fmt.Println("Endpoint Hit: returnSubchapter ", subchapterID)
}

// Returns one chapter as JSON.
func returnChapter(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	if id < 1 || id > len(rulebook.Chapters) {
		errorHandler(w, r, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(rulebook.Chapters[id-1])
	fmt.Println("Endpoint Hit: returnChapter ", id)
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

	fmt.Println("Endpoint Hit: returnRulebook <filter:", filter, ">")
}

// Returns the root path as JSON.
func root(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, `{ "message": "Latest API available at /api/v1/rulebook" }`)
	fmt.Println("Endpoint Hit: root")
}

// Handles errors. Currently just 404.
func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
	w.WriteHeader(status)
	if status == http.StatusNotFound {
		fmt.Fprint(w, `{ "code": 404, "message": "Not Found" }`)
	}
}

// Handles HTTP requests.
func handleRequests() {
	baseURL := "/api/v1"
	r := mux.NewRouter().StrictSlash(true)

	// Routers
	r.HandleFunc("/", root).Methods("GET")
	r.HandleFunc(baseURL+"/chapters", returnRulebook).Methods("GET")
	r.HandleFunc(baseURL+"/chapters/{id:[1-9][0-9]*}", returnChapter).Methods("GET")
	r.HandleFunc(baseURL+"/chapters/{id:[1-9][0-9]*}/{subid:[1-9][0-9]{2}}", returnSubchapter).Methods("GET")

	// Error handling
	r.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(HTTPError{Code: http.StatusNotFound, Message: http.StatusText(http.StatusNotFound)})
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
