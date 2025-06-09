# Contact API spec

## Create Contact API

Endpoint : POST /api/contacts

Headers: 
	- Authorization: token

Request Body:
```json
{
	 "first_name" : "Vincent",
	 "last_name" : "Chance",
	 "email" : "vincent@hotmail.com",
	 "phone" : "2821222332"
}
``` 

Response Body Success:
```json
{
	"data" : {
		 "id" : 1,
		 "first_name" : "Vincent",
		 "last_name" : "Chance",
		 "email" : "vincent@hotmail.com",
		 "phone" : "2821222332"
	}
}
``` 

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
``` 

## Update Contact API

Endpoint : PUT api/contacts/:id

Headers: 
	- Authorization: token


Request Body:
```json
{
	 "first_name" : "Vincent",
	 "last_name" : "Chance2",
	 "email" : "vincent@hotmail.com",
	 "phone" : "21233232"
}
``` 

Response Body Success:
```json
{
	"data" : {
		 "id" : 1,
		 "first_name" : "Vincent",
		 "last_name" : "Chance2",
		 "email" : "vincent@hotmail.com",
		 "phone" : "2821222332"
	}
}
``` 

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
``` 

## Get Contact API

Endpoint : GET api/contacts/:id

Headers: 
	- Authorization: token


Response Body Success:
```json
{
	"data" : {
		 "id" : 1,
		 "first_name" : "Eko",
		 "last_name" : "Khannedy",
		 "email" : "eko@pzn.com",
		 "phone" : "2821222332"
	}
}
``` 

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
``` 

## Search Contact API

Endpoint : POST api/contacts

Headers: 
	- Authorization: token

Query params :
	- name : search by first_name or last_name, using like, optional
	- email: search by email, using like, optional
	- phone: Search by phone, using like, optional
	- page: name of page, default 1
	- limit: size per page, default 10
		
Response Body Success:
```json
{
	"data" : [
		{
			 "id" : 1,
			 "first_name" : "Eko",
			 "last_name" : "Khannedy",
			 "email" : "eko@pzn.com",
			 "phone" : "2821222332"
		},
		{
			 "id" : 2,
			 "first_name" : "Eko",
			 "last_name" : "Khannedy",
			 "email" : "eko@pzn.com",
			 "phone" : "2821222332"
		}
	],
	"pagging" : {
		"page" : 1,	
		"total_item" : 10
		"total_page" : 1,

	}
}
``` 

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
```

## Remove Contact API

Endpoint : DELETE api/contacts/:contactId

Headers: 
	- Authorization: token


Response Body Success:
```json
{
	"data" : "Ok"
}
``` 

Response Body Error:
```json
{
	"errors": "unauthorized or data not found"
}
```