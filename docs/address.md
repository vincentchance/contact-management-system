# Address API Spec

## Create Address API

Endpoint : POST api/contacts/:contactId/addresses

Headers: 
	- Authorization: token

Request Body:
```json
{
	"street": "jalan apa",
	"city": "kota apa",
	"province": "provinsi apa",
	"country": "negara apa"
}
```

Response Body Success: 

```json
{
	"data": {
		"id": 1,
		"street": "jalan apa",
		"city": "kota apa",
		"province": "provinsi apa",
		"country": "negara apa",
		"postal_code": "kode pos"
	}
}
```

Response Body Error:
```json
{
	"errors": "Unauthorized"
}
```

## Update Address API

Endpoint : PUT api/contacts/:contactId/addresses/:addressId

Headers: 
	- Authorization: token

Request Body: 
```json
{
	"street": "jalan apa",
	"city": "kota apa",
	"province": "provinsi apa",
	"country": "negara apa",
	"postal_code": "kode pos"
}
```

Response Body Success : 
```json
{
	"data" : {
		"id": 1,
		"street": "jalan apa",
		"city": "kota apa",
		"province": "provinsi apa",
		"country": "negara apa",
		"postal_code": "kode pos"
	}
}
```

Response Body Error : 
```json
{
	"errors": "Unauthorized"
}
```

## Get Address API
Endpoint : GET api/contacts/:contactId/addresses/:addressId

Headers: 
	- Authorization: token

Response Body Success: 
```json
{
	"data" : {
		"id": 1,
		"street": "jalan apa",
		"city": "kota apa",
		"province": "provinsi apa",
		"country": "negara apa",
		"postal_code": "kode pos"
	}
}
```

Response Body Error : 
```json
{
	"errors": "Unauthorized"
}
```

## List Address API
Endpoint : GET api/contacts/:contactId/addresses

Headers: 
	- Authorization: token

Response Body Success :
```json
{
	"data" : [
		{
			"id": 1,
			"street": "jalan apa",
			"city": "kota apa",
			"province": "provinsi apa",
			"country": "negara apa",
			"postal_code": "kode pos"
		},{
			"id": 2,
			"street": "jalan apa",
			"city": "kota apa",
			"province": "provinsi apa",
			"country": "negara apa",
			"postal_code": "kode pos"
		}	
	]
}
```

Response Body Error : 
```json
{
	"errors": "Unauthorized"
}
```
## Remove Address API
Endpoint : DELETE api/contacts/:contactId/addresses/:addressId

Headers: 
	- Authorization: token

Response Body Success :

```json
{
	"data" : "Ok"
}
```

Response Body Error:

```json
{
	"errors" : "Unauthorized"
}
```