# ecommerce-server

**Person Register**
----
  Return object of new person and token after successfully registered.

* **URL**

  http://localhost:3000/register

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `email=[String]`\
    `password=[String]`\
    `user_role=[String]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "token": "access_token",
    "id": 3,
    "email": "user@mail.com",
    "user_role": "admin"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "SequelizeUniqueConstraintError",
    "error": "Email already registered"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Person Delete**
----
  Return number of deleted person and message (only authorized for master role).

* **URL**

  http://localhost:3000/findUser/:userId

* **Headers**

  `token`

* **Method:**

    `DELETE`
  
*  **URL Params**

    `userId=[Number]`

* **Data Params**

    none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "delete": 1,
    "message": "Successfully delete"
    }
* **Error Response:**

  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "User not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Person FindOne**
----
  Return json data person.

* **URL**

  http://localhost:3000/findUser/:userId

* **Headers**

  none

* **Method:**

    `GET`
  
*  **URL Params**

    `userId=[Number]`

* **Data Params**

    none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 3,
    "email": "user@mail.com",
    "user_role": "user"
    }
* **Error Response:**

  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "User not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Person Login**
----
  Return object of person and token after successfully login.

* **URL**

  http://localhost:3000/login

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `email=[String]`\
    `password=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "token": "access_token",
    "id": 3,
    "email": "user@mail.com",
    "user_role": "admin"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Email/Password Wrong"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Product Create**
----
  Return object of new product.

* **URL**

  http://localhost:3000/products

* **Headers**

  `token`

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `name=[String]`\
    `image_url=[String]`\
    `price=[String]`\
    `stock=[String]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "name": "Sandal",
    "image_url": "",
    "price": 70000,
    "stock": 10
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "SequelizeValidationError",
    "error": [
        "Name is Required",
        "Price can't be Negative Number",
        "You should have the item in stock!"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Product Edit**
----
  Return object of edited product.

* **URL**

  http://localhost:3000/products/:productId

* **Headers**

  `token`

* **Method:**

    `PUT`
  
*  **URL Params**

    `productId=[Number]`

* **Data Params**

    `name=[String]`\
    `image_url=[String]`\
    `price=[String]`\
    `stock=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "name": "Sandal",
    "image_url": "",
    "price": 50000,
    "stock": 2,
    "createdAt": "2020-02-18T08:07:08.514Z",
    "updatedAt": "2020-02-18T08:16:29.762Z"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "SequelizeValidationError",
    "error": [
        "Name is Required",
        "Price can't be Negative Number",
        "You should have the item in stock!"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Product not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Product Delete**
----
  Return json data of deleted product.

* **URL**

  http://localhost:3000/products/:productId

* **Headers**

  `token`

* **Method:**

    `DELETE`
  
*  **URL Params**

    `productId=[Number]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "data": 1,
    "message": "Deleted"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "SequelizeValidationError",
    "error": [
        "Name is Required",
        "Price can't be Negative Number",
        "You should have the item in stock!"
    ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Product not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Product FindAll**
----
  Return array of object all products.

* **URL**

  http://localhost:3000/products

* **Method:**

    `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "id": 2,
        "name": "Sandal",
        "image_url": "",
        "price": 70000,
        "stock": 10,
        "createdAt": "2020-02-18T08:07:49.492Z",
        "updatedAt": "2020-02-18T08:07:49.492Z"
    },
    {
        "id": 3,
        "name": "Baju",
        "image_url": "",
        "price": 150000,
        "stock": 12,
        "createdAt": "2020-02-18T08:41:05.540Z",
        "updatedAt": "2020-02-18T08:41:05.540Z"
    }
    ]
* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Cart Create**
----
  Return object new carts.

* **URL**

  http://localhost:3000/carts

* **Headers**

  `token`

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `PersonId=[Number]`\
    `ProductId=[Number]`\
    `quantity=[Number]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "paid": false,
    "PersonId": 1,
    "ProductId": 5,
    "quantity": 5,
    "updatedAt": "2020-02-27T07:42:08.310Z",
    "createdAt": "2020-02-27T07:42:08.310Z",
    "price": 2250000,
    "id": 75
    }
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Stock is not enough"
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Product Not Found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Cart FindAll**
----
  Return array of object carts by productId & personId.

* **URL**

  http://localhost:3000/carts/:personId/:productId

* **Headers**

  None

* **Method:**

    `GET`
  
*  **URL Params**

    `personId=[Number]`\
    `productId=[Number]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "PersonId": 1,
        "ProductId": 3,
        "price": 600000,
        "quantity": 1,
        "paid": true,
        "createdAt": "2020-02-27T07:28:02.953Z",
        "updatedAt": "2020-02-27T07:37:40.288Z"
    },
    {
        "PersonId": 1,
        "ProductId": 3,
        "price": 600000,
        "quantity": 1,
        "paid": true,
        "createdAt": "2020-02-27T07:37:30.700Z",
        "updatedAt": "2020-02-27T07:37:40.288Z"
    }
    ]
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Cart FindAll by Paid Status**
----
  Return array of object carts by productId & personId & paid(status).

* **URL**

  http://localhost:3000/carts/:personId/:productId/:paid

* **Headers**

  None

* **Method:**

    `GET`
  
*  **URL Params**

    `personId=[Number]`\
    `productId=[Number]`\
    `paid=[Boolean]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "PersonId": 1,
        "ProductId": 5,
        "price": 2250000,
        "quantity": 5,
        "paid": false,
        "createdAt": "2020-02-27T07:42:08.310Z",
        "updatedAt": "2020-02-27T07:42:08.310Z"
    }
    ]
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Cart Edit**
----
  Return array of object edited cart.

* **URL**

  http://localhost:3000/carts/:personId/:productId

* **Headers**

  `token`

* **Method:**

    `PUT`
  
*  **URL Params**

    `personId=[Number]`\
    `productId=[Number]`

* **Data Params**

    `quantity:[Number]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "id": 75,
        "PersonId": 1,
        "ProductId": 5,
        "price": 2250000,
        "quantity": 5,
        "paid": false,
        "createdAt": "2020-02-27T07:42:08.310Z",
        "updatedAt": "2020-02-27T07:58:07.959Z"
    }
    ]
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Stock is not enough"
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Product Not Found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Cart Delete**
----
  Return Number of deleted cart.

* **URL**

  http://localhost:3000/carts/:personId/:productId

* **Headers**

  `token`

* **Method:**

    `DELETE`
  
*  **URL Params**

    `personId=[Number]`\
    `productId=[Number]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    1
* **Error Response:**
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Cart not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----

**Cart Checkout**
----
  Return number of checkout cart.

* **URL**

  http://localhost:3000/carts/:personId/:productId/checkout

* **Headers**

  `token`

* **Method:**

    `PUT`
  
*  **URL Params**

    `personId=[Number]`\
    `productId=[Number]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    1
    ]
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Stock is not enough"
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Unauthorized"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Cart not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "type": "Bad Request",
    "error": "Internal server error"
    }
----
