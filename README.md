# mock-6


```http
POST /api/register
```
## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. User Name |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `User Registerd Sucessfully` |
| 400 | `Name, Email or Password not provided` |
| 409 | `User Already Registered` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/login
```
## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `User Login Sucessfully` |
| 400 | `Email or Password not provided` |
| 401 | `Wrong Credentials - Password does not match` |
| 501 | `INTERNAL SERVER ERROR` |


```http
GET /api/flights
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `All Flights Data` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 

```javascript
[{
  _id: ObjectId,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}]
```


```http
GET /api/flights/:id
```

## Params

```javascript
{
  id: Flight_ID,
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Flights Data` |
| 404 | `Flights Data Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 

```javascript
{
  _id: ObjectId,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}
```


```http
POST /api/flights/
```

## Request Body 

```javascript
{
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Flights Added` |
| 400 | `All Fields in request body not given` |
| 501 | `INTERNAL SERVER ERROR` |


```http
PATCH /api/flights/:id
```

## Params

```javascript
{
  id: Flight_ID,
}
```

## Request Body 

```javascript
{
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 204 | `Flights Updated Sucessfully` |
| 404 | `Flights Data Not Found` |
| 501 | `INTERNAL SERVER ERROR` |



```http
DELETE /api/flights/:id
```

## Params

```javascript
{
  id: Flight_ID,
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 202 | `Flights Removed Sucessfully` |
| 404 | `Flights Data Not Found` |
| 501 | `INTERNAL SERVER ERROR` |



```http
POST /api/booking/
```

## Requst Body

```javascript
{
  flight_id: Flight_ID,
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Bookling Done Sucessfully` |
| 400 | `Flight_ID Not Given in request body` |
| 401 | `Login Required` |
| 404 | `Flights Data Not Found` |
| 404 | `Seat Not Available` |
| 501 | `INTERNAL SERVER ERROR` |



```http
GET /api/dashboard/
```

## Requst Body

```javascript
{
  flight_id: Flight_ID,
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Bookling Data Fetched` |
| 401 | `Login Required` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 


```javascript
[{
  _id: ObjectID,
  user: ObjectID,
  flight: ObjectID
}]
```