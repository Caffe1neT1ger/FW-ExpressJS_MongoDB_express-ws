# FW-ExpressJS_MongoDB_express-ws #

# Команды управления #
## Установка модулей ##
`npm install`
## Запуск в nodemon ##
`npm run server`
## Запуск в обычном режиме ##
`npm run start`
##  ##

# REST API #
The REST API to the example app is described below. 
## User controler ##
## Registation ##
` POST /api/registration `
### Request  ###

	"email": String,
	"password": String
{
	"email":"test-mail@gmail.com",
	"password":"qwerty123"
}
### Resonpse  ###

	"accessToken": String,
	"refreshToken": String,
	"user": {
		"email": String,
		"id": String,
		"isActivated": bool (default: true)
	}
{
	"accessToken": "eyJhbGciOiJ.......dRsfKBU9YxfmWYpXix14qb-0wh2Gi8gAkYMLEM",
	"refreshToken": "eyJhbGciOiJ.......IaUBAAbUzI1NZJ0rh6oeQcvhFy7uIBW6Hzq44",
	"user": {
		"email": "test-mail@gmail.com",
		"id": "6410b79bed6f3cd3cbbb83e1",
		"isActivated": true
	}
}
## Login ##
` POST /api/login `
### Request  ###
 
	"email": String,
	"password": String
{
	"email":"test-mail@gmail.com",
	"password":"qwerty123"
}
### Resonpse  ###

	"accessToken": String,
	"refreshToken": String,
	"user": {
		"email": String,
		"id": String,
		"isActivated": bool (default: true)
	}
{
	"accessToken": "eyJhbGciOiJ.......dRsfKBU9YxfmWYpXix14qb-0wh2Gi8gAkYMLEM",
	"refreshToken": "eyJhbGciOiJ.......IaUBAAbUzI1NZJ0rh6oeQcvhFy7uIBW6Hzq44",
	"user": {
		"email": "test-mail@gmail.com",
		"id": "6410b79bed6f3cd3cbbb83e1",
		"isActivated": true
	}
}
## Logout ##
` POST /api/logout `
### Request  ###

	"email": String,
	"password": String
{
	"email":"test-mail@gmail.com",
	"password":"qwerty123"
}
### Resonpse  ###

	"acknowledged": bool,
	"deletedCount": Number
{
	"acknowledged": true,
	"deletedCount": 1
}

## Get user list ##
` GET /api/users `
### Request  ###
 {} 
### Resonpse  ###

	[{
		"_id": String,
		"email": String,
	}]
[
	{
		"_id": "63f8ddc9f322aff7643e18ef",
		"email": "test-mail1@gmail.com",
		"__v": 0
	},
	{
		"_id": "6410b79bed6f3cd3cbbb83e1",
		"email": "test-mail2@gmail.com",
		"__v": 0
	}
]

## Room controller ##
## HTTP requests ##
## Update room data ##
` POST /api/room/update `
### Request ###

 	"roomId": String,
	"userId": String,
	"progress": Number,
	"movieId": String,
 
 {
 	"roomId": "6410aeb3f24e6e71a8e94dc2",
	"userId":"63f8ddc9f322aff7643e18ef",
	"progress": 120,
	"movieId":"666"
}
### Response ###

	"_id": String,
	"ownerId": String,
	"movieId": String,
	"spectatorsId": [
		String
	],
	"progress": Number,
	"type": String (public/private),
	"createdAt": Date,
	"updatedAt": Date,

        
{
	"_id": "6410aeb3f24e6e71a8e94dc2",
	"ownerId": "63f8ddc9f322aff7643e18ef",
	"movieId": "666",
	"spectatorsId": [
		"123123123",
		"123123123"
	],
	"progress": 120,
	"type": "public",
	"createdAt": "2023-03-14T17:28:19.073Z",
	"updatedAt": "2023-03-14T17:34:47.779Z",
	"__v": 2
}
## Get room by ID ##
` GET /api/room/get-room `
### Request ###

	"roomId": String
{
	"roomId":"6410aeb3f24e6e71a8e94dc2"
}
### Response ###

	"_id": String,
	"ownerId": String,
	"movieId": String,
	"spectatorsId": \[
		String
	\],
	"progress": Number,
	"type": String (public/private),
	"createdAt": Date,
	"updatedAt": Date,

        
{
	"_id": "6410aeb3f24e6e71a8e94dc2",
	"ownerId": "63f8ddc9f322aff7643e18ef",
	"movieId": "666",
	"spectatorsId": \[
		"123123123",
		"123123123"
	\],
	"progress": 120,
	"type": "public",
	"createdAt": "2023-03-14T17:28:19.073Z",
	"updatedAt": "2023-03-14T17:34:47.779Z",
	"__v": 2
}
## Remove spectator ##
` POST /api/room/remove`
### Request ###

	"roomId":String,
	"spectator": String

{
	"roomId":"640eeb6c1e6aa05a21257f40",
	"spectator":"63f8ddc9f322aff7643e18ef"
}
### Response ###

	"_id": String,
	"ownerId": String,
	"movieId": String,
	"spectatorsId": [
		String
	],
	"progress": Number,
	"type": String (public/private),
	"createdAt": Date,
	"updatedAt": Date,

        
{
	"_id": "6410aeb3f24e6e71a8e94dc2",
	"ownerId": "63f8ddc9f322aff7643e18ef",
	"movieId": "666",
	"spectatorsId": [
		"123123123",
		"123123123"
	],
	"progress": 120,
	"type": "public",
	"createdAt": "2023-03-14T17:28:19.073Z",
	"updatedAt": "2023-03-14T17:34:47.779Z",
	"__v": 2
}
## Delete room ##
` POST /api/room/delete`
### Request ###

	"roomId": String
{
	"roomId":"63fa3f29f4f6c1f7ca1d7649"
}

### Response ###
	"acknowledged": bool,
	"deletedCount": Number
{
	"acknowledged": true,
	"deletedCount": 1
}
##   Show public rooms ##
` GET /api/room/public `
### Request ###
{}
### Response ###
	[{
		"_id": String,
		"movieId": String,
		"spectatorsId": Array (item type: String),
		"progress": Number,
		"type": String (public),
		"createdAt": Date,
		"updatedAt": Date,
		"__v": number
	}]
[
        {
		"_id": "63fa3f29f4f6c1f7ca1d7649",
		"movieId": "movie33552",
		"spectatorsId": [],
		"progress": 0,
		"type": "public",
		"createdAt": "2023-02-25T17:02:33.786Z",
		"updatedAt": "2023-02-25T17:02:33.786Z",
		"__v": 0
	},
]
## Show private rooms ##
` GET /api/room/private`
### Request ###

	"ownerId":String,

{
	"ownerId":"63f8ddc9f322aff7643e18ef",
}
### Response ###
	[{
		"_id": String,
		"movieId": String,
		"spectatorsId": Array (item type: String),
		"progress": Number,
		"type": String (private),
		"createdAt": Date,
		"updatedAt": Date,
		"__v": number,
	}]
[
        {
		"_id": "63fa3f29f4f6c1f7ca1d7649",
		"movieId": "movie33552",
		"spectatorsId": [],
		"progress": 0,
		"type": "private",
		"createdAt": "2023-02-25T17:02:33.786Z",
		"updatedAt": "2023-02-25T17:02:33.786Z",
		"__v": 0
	},
]

## WS requests ##
## Create room ##
`WS /api/ws/`
### Request ###

        ownerId: String,
        movieId: String,
        spectatorsId: Array [item type: String],
        progress: Number,
        roomType: String (public/private),
        type: String (create),
    
### Response ###

        isOwner: Bool,
        isPause: Bool,
        message: String (Пользователь ${nickname} создал комнату ${userId}),
        method: String (create),
        movieId: String,
        ownerId: String,
        progress: Number,
        roomId: String,
        roomType: String ([ublic/private),
        userList: Array [item type: String],

{
        isOwner: true
        isPause: true
        message: "Пользователь undefined создал комнату 6410c0ec46ffda10583332f6"
        method: "create"
        movieId: "1223111"
        ownerId: "63f8ddc9f322aff7643e18ef"
        progress: 0
        roomId: "6410c0ec46ffda10583332f6"
        roomType: "public"
        userList: [ 
                {userId: '63f8ddc9f322aff7643e18ef'}
        ]
}

## Connection to room ##
`WS /api/ws/`
### Request ###
        userId: String,
        roomId: String,
        movieId: String,
        progress: Number,
        method: String (connection),
        isPause: Bool (true),
        
### Response ###
        
        suerId: String,
        isOwner: Bool,
        isPause: Bool,
        message: "Пользователь ${nickname} создал комнату ${userId}",
        method: String (connection),
        movieId: String,
        progress: Number,
        roomId: String,
        roomType: String ([ublic/private),
        userList: [String],

{
        userId: 63f8ddc9f322aff7643e18ef
        isOwner: false
        isPause: true
        message: "Пользователь undefined подключился к комнате"
        method: "connection"
        movieId: "1223111"
        progress: 0
        roomId: "6410c0ec46ffda10583332f6"
        roomType: "public"
        userList: [ 
                {userId: '63f8ddc9f322aff7643e18ef'}
        ]
}

## Watch controller (play/pause/seek) ##
` WS /api/ws/ `
## Request ##
        roomId: String,
        ownerId: String',
        method: String (watch),
        progress: Number,
        isPause: Bool,
        operation: String (play/pause),
        movieId: String,
## Response ##
        isPause: Bool,
        method: String (watch),
        movieId: String,
        operation: String (start/stop),
        progress: number,
        roomId: String,
