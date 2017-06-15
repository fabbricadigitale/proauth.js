package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/julienschmidt/httprouter"
)

type Login struct {
	Username     string `json:"username"`
	Password     string `json:"password"`
	GrantType    string `json:"grant_type"`
	ClientId     string `json:"client_id"`
	RefreshToken string `json:"refresh_token"`
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

	if t.Username == "user" &&
		t.Password == "qwerty" &&
		t.GrantType == "password" &&
		t.ClientId == "test" {
		fmt.Fprint(w, `{"access_token":"tkn0.1234567890","expires_in":3600,"token_type":"bearer","scope":null,"refresh_token":"rfrsh0.0987654321"}`)
	} else if t.RefreshToken == "rfrsh0.0987654321" &&
		t.GrantType == "refresh_token" &&
		t.ClientId == "test" {
		fmt.Fprint(w, `{"access_token":"tkn1.1234567890","expires_in":3600,"token_type":"bearer","scope":null,"refresh_token":"rfrsh1.0987654321"}`)
	} else {
		http.Error(w, `{"title": "invalid_grant","status":401}`, 401)
	}
}

func ReturnAuthorizationHeader(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Fprint(w, r.Header.Get("Authorization"))
}

func ReturnSomeHeaders(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Header purposely not in alphabetical order and upper/lowercased
	w.Header().Set("Key-A", "Value-A")
	w.Header().Set("Key-B", "Value-B")
	w.Header().Set("Key-c", "Value-c")
	w.Header().Set("key-e", "value-e")
	w.Header().Set("KEY-D", "VALUE-D")

	fmt.Fprint(w, "")
}

func ReturnInvalidXML(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "text/xml")

	fmt.Fprint(w, "invalid_xml")
}

func ReturnEmptyResponse(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Fprint(w, "")
}

func SimulateTokenExpired(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	if r.Header.Get("Authorization") == "bearer tkn0.1234567890" {
		http.Error(w, `{"title": "token_expired","status":401}`, 401)
	} else {
		fmt.Fprint(w, r.Header.Get("Authorization"))
	}
}

func Return401(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	http.Error(w, `{"title": "invalid_token","status":401}`, 401)
}

func AllowCors(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	fmt.Fprint(w, "")
}

func Sleep(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	time.Sleep(time.Second)
	fmt.Fprint(w, "")
}

func Shutdown(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	os.Exit(0)
}

func main() {
	router := httprouter.New()

	router.OPTIONS("/oauth", AllowCors)
	router.POST("/oauth", OAuth)

	router.OPTIONS("/return-authorization-header", AllowCors)
	router.GET("/return-authorization-header", ReturnAuthorizationHeader)

	router.OPTIONS("/return-some-headers", AllowCors)
	router.GET("/return-some-headers", ReturnSomeHeaders)

	router.OPTIONS("/return-invalid-xml", AllowCors)
	router.GET("/return-invalid-xml", ReturnInvalidXML)

	router.OPTIONS("/return-empty-response", AllowCors)
	router.GET("/return-empty-response", ReturnEmptyResponse)

	router.OPTIONS("/simulate-token-expired", AllowCors)
	router.GET("/simulate-token-expired", SimulateTokenExpired)

	router.OPTIONS("/return-401", AllowCors)
	router.GET("/return-401", Return401)

	router.OPTIONS("/sleep", AllowCors)
	router.GET("/sleep", Sleep)

	router.POST("/shutdown", Shutdown)

	log.Fatal(http.ListenAndServe(":8060", router))
}
