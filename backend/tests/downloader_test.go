package utils_test

import (
	"bytes"
	"io/ioutil"
	"os"
	"testing"

	. "github.com/Luukuton/rulebook/backend/utils"
)

func TestDownloadFile(t *testing.T){
	DataPath = "testdata/"
	filePath, err := DownloadFile(
		"https://raw.githubusercontent.com/Luukuton/rulebook/master/backend/tests/testdata/rulebook_test_data.txt",
		"test_download.txt",
	)

	if err != nil {
		t.Errorf("download failed: %s", err)
		return
	}

	got, _ := ioutil.ReadFile(filePath)
	want, _ := ioutil.ReadFile("testdata/rulebook_test_data.txt")

	if !bytes.Equal(got, want) {
			t.Errorf("downloaded file didn't match the local file")
	}

	// Remove downloaded test file.
	os.Remove(filePath)
}
