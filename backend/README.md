# Backend

Made with Golang.

## Usage

- Build with `go build .`
- Run with `.\backend <type> <source> <data dir>`

### Arguments:

- **type**: The type of the initial rule data source (file or url)
- **source**: The filename (with path) or the URL where to get the initial rule data
- **data dir**: The directory where the unparsed rule data is saved (e.g. /usr/data)

### Dependencies

- Go 1.16+
