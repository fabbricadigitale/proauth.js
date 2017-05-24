package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

type Login struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	GrantType string `json:"grant_type"`
	ClientId  string `json:"client_id"`
}

func OAuth(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	decoder := json.NewDecoder(r.Body)
	var t Login
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if t.Username == "user" &&
		t.Password == "qwerty" &&
		t.GrantType == "password" &&
		t.ClientId == "test" {
		fmt.Fprint(w, `{"access_token":"tkn.1234567890","expires_in":3600,"token_type":"bearer","scope":null,"refresh_token":"rfrsh.0987654321"}`)
	} else {
		fmt.Fprint(w, `{"title": "invalid_grant","status":401,"detail":"Invalid username and password combination"}`)
	}
}

func ReturnAuthorizationHeader(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	fmt.Fprint(w, r.Header.Get("Authorization"))
}

func AllowCors(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	fmt.Fprint(w, "")
}

func main() {
	router := httprouter.New()
	router.OPTIONS("/oauth", AllowCors)
	router.POST("/oauth", OAuth)

	router.OPTIONS("/return-authorization-header", AllowCors)
	router.GET("/return-authorization-header", ReturnAuthorizationHeader)

	log.Fatal(http.ListenAndServe(":8060", router))
}
