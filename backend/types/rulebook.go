package types

type Rulebook struct {
	Chapters []Chapter `json:"chapters"`
}

type Chapter struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Subchapters []Subchapter `json:"subchapters"`
}

type Subchapter struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Rules []Rule `json:"rules"`
}

type Rule struct {
	ID       int       `json:"id"`
	Content  string    `json:"content"`
	Subrules []Subrule `json:"subrules"`
}

type Subrule struct {
	ID      string `json:"id"`
	Content string `json:"content"`
}
