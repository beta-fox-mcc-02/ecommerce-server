# ecommerce-server 

## Admin Side

## **Register new admin**

Create new admin to database.

- **URL**

  /admin/register

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**
  email,
  password

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    data: "{ id : 1, email : "admin@mail.com", password : "admin123" }"
    ```

* **Error Response:**

  - **Code:** 400 <br />
    **Content:**

    ```javascript
    err: "BAD REQUEST",
    msg: ["invalid email address"]

    OR
    err: "BAD REQUEST",
    msg: ["password must be at least 3 characters"]
    ```

## **Login admin**

Login admin.

- **URL**

  /admin/login

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**
  email,
  password

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript

    email: "admin@mail.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkeDRTSkZ6enFxMVIwZjNiWWZGVEt1ZU5XY0UueTJ3ZDlQNjBDVGhPZGpocGpuc2tULmRoejYiLCJjcmVhdGVkQXQiOiIyMDIwLTAyLTA3VDAzOjE0OjE2LjU5MVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAyLTA3VDAzOjE0OjE2LjU5MVoifSwiaWF0IjoxNTgxMDQ1Mjg5fQ.uVOTuSJTpP3opugTk7r2Itp2OTdkeUNjj7Sn563MQ-g"

    ```

* **Error Response:**

  - **Code:** 400 <br />
    **Content:**

    ```javascript
    err: "WRONG LOGIN DATA",
    msg: "USERNAME OR PASSWORD IS WRONG"
    ```


## ** Product list**

Fetch the product list from database.

- **URL**

  /admin/product

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  None

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    "product": [
    {
        "id": 40,
        "name": "cappucino",
        "image_url": "https://cdn02.indozone.id/re/content/2019/10/07/ers0M9/t_5d9ae209ae934.jpg?w=700&q=85",
        "price": 13000,
        "stocks": 266,
        "createdAt": "2020-02-22T09:50:16.393Z",
        "updatedAt": "2020-02-22T10:31:40.791Z"
    },
    {
        "id": 39,
        "name": "Latte",
        "image_url": "https://www.femina.co.id/images/images/latte%20art%20illy.jpg",
        "price": 13000,
        "stocks": 625,
        "createdAt": "2020-02-22T05:21:38.238Z",
        "updatedAt": "2020-02-22T10:31:49.095Z"
    }]
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:**

    ```javascript
    err: "NOT FOUND",
    msg: "DATA NOT FOUND"
    ```

## ** Add new product**

Add new product to database

- **URL**

  /admin/product/create

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  none
- **Data Params**
  name: ['string']
  image_url: ['string']
  price: ['integer']
  stocks: ['integer']

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        name: "list to backlog 1",
        image_url: 'https://www.femina.co.id/images/images/latte%20art%20illy.jpg',
        price: 13000,
        stocks: 298
        msg: "Data created successfully"
    }
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:**

    ```javascript
    err: "NOT FOUND",
    msg: "DATA NOT FOUND"
    ```

## ** Delete prpoduct**

Delete product from database by product id

- **URL**

  /admin/product/:id/delete

- **Method:**

  `DELETE`

- **URL Params**
  **Required:**
  id=['integer']

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    msg: "Data deleted successfully";
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:**

    ```javascript
    err: "NOT FOUND",
    msg: "DATA NOT FOUND"
    ```

## ** Find product**

Find product by product id to be edit.

- **URL**

  /admin/product/:id/update

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  id = ['integer']

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    data: {
        "id": 40,
        "name": "cappucino",
        "image_url": "https://cdn02.indozone.id/re/content/2019/10/07/ers0M9/t_5d9ae209ae934.jpg?w=700&q=85",
        "price": 13000,
        "stocks": 266,
        "createdAt": "2020-02-22T09:50:16.393Z",
        "updatedAt": "2020-02-22T10:31:40.791Z"
    }
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:**

    ```javascript
    err: "NOT FOUND",
    msg: "DATA NOT FOUND"
    ```

## ** Update product**

Update product by product id.

- **URL**

  /admin/product/:id/update

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  id=['integer']

- **Data Params**
  name: ['string']
  image_url: ['string']
  price: ['integer']
  stocks: ['integer']

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        "id": 40,
        "name": "cappucino",
        "image_url": "https://cdn02.indozone.id/re/content/2019/10/07/ers0M9/t_5d9ae209ae934.jpg?w=700&q=85",
        "price": 13000,
        "stocks": 266,
        "createdAt": "2020-02-22T09:50:16.393Z",
        "updatedAt": "2020-02-22T10:31:40.791Z"
    }
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:**

    ```javascript
    err: "NOT FOUND",
    msg: "DATA NOT FOUND"
    ```

## Customer

## **Register new customer**

Create new customer to database.

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**
  email,
  password

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    data: "{ id : 1, email : "user@mail.com", password : "user123" }"
    ```

* **Error Response:**

  - **Code:** 400 <br />
    **Content:**

    ```javascript
    err: "BAD REQUEST",
    msg: ["invalid email address"]

    OR
    err: "BAD REQUEST",
    msg: ["password must be at least 3 characters"]
    ```

## **Login user**

Login user.

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**
  email,
  password

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript

    email: "user@mail.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkeDRTSkZ6enFxMVIwZjNiWWZGVEt1ZU5XY0UueTJ3ZDlQNjBDVGhPZGpocGpuc2tULmRoejYiLCJjcmVhdGVkQXQiOiIyMDIwLTAyLTA3VDAzOjE0OjE2LjU5MVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAyLTA3VDAzOjE0OjE2LjU5MVoifSwiaWF0IjoxNTgxMDQ1Mjg5fQ.uVOTuSJTpP3opugTk7r2Itp2OTdkeUNjj7Sn563MQ-g"

    ```

* **Error Response:**

  - **Code:** 400 <br />
    **Content:**

    ```javascript
    err: "WRONG LOGIN DATA",
    msg: "USERNAME OR PASSWORD IS WRONG"
    ```

## ** Product list**

Fetch the product list from database.

- **URL**

  /admin/product

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  None

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    "product": [
    {
        "id": 40,
        "name": "cappucino",
        "image_url": "https://cdn02.indozone.id/re/content/2019/10/07/ers0M9/t_5d9ae209ae934.jpg?w=700&q=85",
        "price": 13000,
        "stocks": 266,
        "createdAt": "2020-02-22T09:50:16.393Z",
        "updatedAt": "2020-02-22T10:31:40.791Z"
    },
    {
        "id": 39,
        "name": "Latte",
        "image_url": "https://www.femina.co.id/images/images/latte%20art%20illy.jpg",
        "price": 13000,
        "stocks": 625,
        "createdAt": "2020-02-22T05:21:38.238Z",
        "updatedAt": "2020-02-22T10:31:49.095Z"
    }]
    ```


## ** cart list**

Fetch the cart list from database.

- **URL**

  /cart

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  None

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    "cart": [
    {
        "id": 40,
        "name": "cappucino",
        "image_url": "https://cdn02.indozone.id/re/content/2019/10/07/ers0M9/t_5d9ae209ae934.jpg?w=700&q=85",
        "price": 13000,
        "stocks": 266,
        "createdAt": "2020-02-22T09:50:16.393Z",
        "updatedAt": "2020-02-22T10:31:40.791Z",
        "Product": {
          "id": 14,
          "UserId": 2,
          "ProductId": 58,
          "total_price": 4900000,
          "quantity": 1,
          "status": false,
          "createdAt": "2020-02-27T04:49:17.334Z",
          "updatedAt": "2020-02-27T04:49:17.334Z"
        }
    },
    {
        "id": 39,
        "name": "Latte",
        "image_url": "https://www.femina.co.id/images/images/latte%20art%20illy.jpg",
        "price": 13000,
        "stocks": 625,
        "createdAt": "2020-02-22T05:21:38.238Z",
        "updatedAt": "2020-02-22T10:31:49.095Z",
        "Product": {
          "id": 14,
          "UserId": 2,
          "ProductId": 58,
          "total_price": 4900000,
          "quantity": 1,
          "status": false,
          "createdAt": "2020-02-27T04:49:17.334Z",
          "updatedAt": "2020-02-27T04:49:17.334Z"
        }
    }]
    ```

## ** history list**

Fetch the history list from database.

- **URL**

  /history

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  None

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    "history": [
    {
        "id": 40,
        "name": "cappucino",
        "image_url": "https://cdn02.indozone.id/re/content/2019/10/07/ers0M9/t_5d9ae209ae934.jpg?w=700&q=85",
        "price": 13000,
        "stocks": 266,
        "createdAt": "2020-02-22T09:50:16.393Z",
        "updatedAt": "2020-02-22T10:31:40.791Z",
        "Product": {
          "id": 14,
          "UserId": 2,
          "ProductId": 58,
          "total_price": 4900000,
          "quantity": 1,
          "status": false,
          "createdAt": "2020-02-27T04:49:17.334Z",
          "updatedAt": "2020-02-27T04:49:17.334Z"
        }
    },
    {
        "id": 39,
        "name": "Latte",
        "image_url": "https://www.femina.co.id/images/images/latte%20art%20illy.jpg",
        "price": 13000,
        "stocks": 625,
        "createdAt": "2020-02-22T05:21:38.238Z",
        "updatedAt": "2020-02-22T10:31:49.095Z",
        "Product": {
          "id": 14,
          "UserId": 2,
          "ProductId": 58,
          "total_price": 4900000,
          "quantity": 1,
          "status": false,
          "createdAt": "2020-02-27T04:49:17.334Z",
          "updatedAt": "2020-02-27T04:49:17.334Z"
        }
    }]
    ```
## ** Add new cart**

Add new cart to database

- **URL**

  /cart/add

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  none
- **Data Params**
  UserId: ['integer']
  ProductId: ['integer']
  total_price: ['integer']
  quantity: ['integer']
  status: ['boolean']

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        UserId: 1,
        ProductId: 23,
        total_price: 6400000,
        quantity: 1,
        status: false
    }
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:**

    ```javascript
    err: "NOT FOUND",
    msg: "DATA NOT FOUND"
    ```