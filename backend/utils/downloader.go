package utils

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"
	"os"
)

var DataPath = "/usr/data/"

// Downloads a file from the given url to the given filepath. Used to get rule data from the internet.
func DownloadFile(url string, filename string) (string, error) {
	response, err := http.Get(url)
	if err != nil {
		return "", err
	}

	output, err := os.Create(DataPath + "temp.txt")
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
		os.Remove(DataPath + "temp.txt")
		return "", err
	}


	bytes := bytes.NewReader(buffer)
	_, err = io.Copy(output, bytes)

	if err != nil {
		output.Close()
		os.Remove(DataPath + "temp.txt")
		return "", err
	}

	return (DataPath + "temp.txt"), nil
}
