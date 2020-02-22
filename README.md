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
