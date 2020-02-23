# ecommerce-server


## .env
```
PORT=3000
SALT_NUMBER=10
SECRET_KEY=123
CLIENT_ID=
GOOGLE_PASS=!@#$%^
PRIVATE_KEY=ganbatte
```
---
---

# Register Admin
Register admin to the app

## URL
```
/admin/register
```

## Method
```
POST
```

## URL Params
#### Required
```
None
```

#### Optional:
```
None
```

## Data Params
```
payload : {
    email : string,
    password : string,
    RolesId : integer
}
```

## Success Response
```
Code: 201
Content: {
    email: "hendry@gmail.com",
    msg: "Register Admin Success"
}
```

## Error Response
```
Code: 400
Content: {
    msg : ['Password inimum 6 characters required']
}
```

OR

```
Code: 400
Content: {
    msg :  ['Email format error']
}
```

OR

```
Code: 400
Content: {
    msg :  ["Please insert your email", "Email format error", "Password minimum 6 characters required"]
}
```

OR

```
Code: 500 NOT FOUND
Content: {
    msg : "Server Error"
}
```
---
---

# Login Admin
Admin login into the app

## URL
```
/admin/login
```

## Method
```
POST
```

## URL Params
#### Required
```
None
```

#### Optional:
```
None
```

## Data Params
```
payload : {
    email : string,
    password : string,
    RolesId : integer
}
```

## Success Response
```
Code: 200
Content: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgyMDE3OTEzLCJleHAiOjE1ODIwMjE1MTN9.lxmR-cbk-ZZ5PhnRTEMSoCg9REjdKNSFo4G14DQMLoU",
    msg: "Login Admin Success"
}
```

## Error Response
```
Code: 400
Content: {
    msg : "Invalid username / password",
}
```

OR

```
Code: 500 NOT FOUND
Content: {
    msg : "Server Error",
    process: "Admin login"
}
```

---
---

# Role
Roles data of the users

## URL
```
/roles
```

## Method
```
GET
```

## URL Params
#### Required
```
None
```

#### Optional:
```
None
```

## Data Params
```
None
```

## Success Response
```
Code: 202
Content: {
    "role": [
        {
            "id": 1,
            "name": "Admin"
        },
        {
            "id": 2,
            "name": "User"
        }
    ],
    "msg": "Get roles data Success"
}
```

## Error Response
```
Code: 401
Content: {
    "msg": "Access denied. No token provided",
    "process": "Authentication"
}
```

OR

```
Code: 500 NOT FOUND
Content: {
    msg : "Server Error",
    process: "User login"
}
```
