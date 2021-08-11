package utils

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"
	"os"
)

var DataPath = "/usr/data/"

// DownloadFile downloads a file from the given url to the given filepath. Used to get rule data from the internet.
func DownloadFile(url string, filename string) (string, error) {
	response, err := http.Get(url)
	if err != nil {
		return "", err
	}

	output, err := os.Create(DataPath + filename)
	if err != nil {
		return "", err
	}
	defer output.Close()
	
	var byteLimit int64 = 8 * 1024 * 1024 // 8 MiB
	r := http.MaxBytesReader(nil, response.Body, byteLimit)
	defer r.Close()

	buffer, err := ioutil.ReadAll(r)
	if err != nil {
		output.Close()
		os.Remove(DataPath + filename)
		return "", err
	}

	reader := bytes.NewReader(buffer)
	_, err = io.Copy(output, reader)

	if err != nil {
		output.Close()
		os.Remove(DataPath + filename)
		return "", err
	}

	return DataPath + filename, nil
}
