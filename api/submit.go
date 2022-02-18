package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Error")
		return
	}

	var result map[string]int
	if err := json.Unmarshal(data, &result); err != nil {
		fmt.Fprintf(w, "Error")
		return
	}

	currentTime := time.Now().Format(time.RFC850)
	fmt.Fprintf(w, currentTime)
}
