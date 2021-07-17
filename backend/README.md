# Backend

Made with Golang.

## Usage

- Build with `go build .`
- Run with `.\backend <type> <source> <data dir>`

### Arguments:

- **type**: The type of the initial rule data source (file or url)
- **source**: The filename (with path) or the URL where to get the initial rule data
- **data dir**: The directory where the unparsed rule data is saved (e.g. /usr/data)

## Testing

**Information about End to End testing can be found in the main [README](../README.md)**

### Unit

- Run tests `go test ./tests -v -coverpkg ./utils -coverprofile "coverage.out"` in `backend/`
- Generate human readable HTML coverage report `go tool cover -html "coverage.out"`

## Dependencies

- Go 1.16+
