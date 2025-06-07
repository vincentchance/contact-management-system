# User API Spec

## register user API 

Endpoint : POST /api/users

Request body: 
```json
{
	"name" : "Vincent Chance",
	"username" : "Vincent",
	"password" : "rahasia",
}
```
## Login API Spec

Endpoint : POST /api/users/login

Request Body : 
```json
{
	"username": "Vincent",
	"password": "rahasia"
}
```

Response Body Success:
```json
{
	"token": "unique token"
}
```

Response Body Errors:
```json
{
	"errors": "username or password is not found"
}
```
## Update User API

Endpoint: PATCH /api/users/current

Headers: {
	Authorization: token
}

Request Body :
 
```json
{
	"name" : "Vincent Chance", //optional
	"password" : "new password" //optional
}
```

Response Body Success:

```json
{
	"data" : {
		"name" :"Vincent Chance",
		"password" : "new password"
	}
}
```

Response Body Error:

```json
{
	"errors": "Unauthorized"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers: {
	Authorization: token
}

Response Body Success:

```json
{
	"data" : {
		"username" :"Vincent",
		"name" : "Vincent Chance"
	}
}
```

Response Body Error:

```json
{
	"errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/Logout

Headers: {
	Authorization: token
}

Response Body Success:

```json
{
	"data" : "Ok"
}
```

Response body Error:

```json
{
	"errors": "Unauthorized"
}
```
