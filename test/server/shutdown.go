package main

import (
	"net/http"
)

func main() {
	http.Post("http://localhost:8060/shutdown", "text/html", nil)
}
