# ecommerce-server

**Show All Products**
----
  Returns json data about products
* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      
    ```json
        {
        "products": [
            {
                "id": 1,
                "name": "I-watch 4",
                "image_url": "https://images-na.ssl-images-amazon.com/images/I/41eJMQgmUrL.jpg",
                "price": 4000000,
                "stock": 25
            },
            {
                "id": 2,
                "name": "samsung gear s4",
                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRSiV-tX3yvxZvJ3E8RJF1xpYyjYRyGakXdKD89VUHSpjKcBicx",
                "price": 3500000,
                "stock": 10
            },
            {
                "id": 3,
                "name": "i-watch 3",
                "image_url": "https://images-na.ssl-images-amazon.com/images/I/41eJMQgmUrL.jpg",
                "price": 25000,
                "stock": 10
            }
        ]
     }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```    
**Insert New Products**
----
  Insert new product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**

   `name=[string]`<br>
   `image_url=[string]`<br>
   `price=[number]`<br>
   `stock=[number]`<br>
* **Success Response:**

  * **Code:** 201 <br>
    **Content:** 
      
    ```json
    {
      "data": {
        "name": "mi band 4",
        "image_url": "https://cdn.elevenia.co.id/g/9/7/2/6/7/0/28972670_B.jpg",
        "price": 750000,
        "stock": 50
       },
      "msg": "success insert new product"
    }
    ```
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }` 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "name cannot be empty",
          "invalid url",
          "price cannot be empty"
          "stock cannot be empty"
        ]
    }
    ```
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "name cannot be null",
          "url cannot be null",
          "price cannot be negative"
          "stock cannot be negative"
        ]
    }
    ```
* **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
* **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```       
**Update a Products**
----
   Return data and message of updated products.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   **Required:**
 
   `name=[string]`<br>
   `image_url=[string]`<br>
   `price=[number]`<br>
   `stock=[number]`<br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "status": [
            1
        ],
        "data": {
            "name": "mi band 4",
            "image_url": "https://cdn.elevenia.co.id/g/9/7/2/6/7/0/28972670_B.jpg",
            "price": 750000,
            "stock": 50
        },
        "msg": "success update product"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }` 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "name cannot be empty",
          "invalid url",
          "price cannot be empty"
          "stock cannot be empty"
        ]
    }
    ```
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "name cannot be null",
          "url cannot be null",
          "price cannot be negative"
          "stock cannot be negative"
        ]
    }
    ```
        **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": "failed update product"
    }
    ```
* **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
* **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```
**Delete a Task**
----
   Delete and Return status of delete in json data.

* **URL**

  /Products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
      "status": 1,
      "msg": "succes delete product"
    }
    ```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "msg": "Not Found",
      "error": "failed to delete product"
    }
    ```

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

* **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```
**Register New User**
----
   Register New User and return access token in json data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   `name=[string]`<br>
   `password=[string]`<br>
   `role=[string]`<br>

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
      
    ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgyMzQ1MTc5fQ.aWtcaT1g9pUfB7-mxvqsrLp02X_TtcpD-aAa3GoeDYY"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
        "msg": "Bad Request",
        "errors": [
            "email already registered"
        ]
    }
    ```    
    
    **Content:** 
    ```json
    {
        "msg": "Bad Request",
        "errors": [
            "invalid email", "password length minimal 6",
            "role must be admin or user"
        ]
    }
    ```  
**Login User**
----
   Login a User and return access token in json data.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhbmRpQG1haWwuY29tIiwiaWF0IjoxNTgwODI3MTUzfQ.1yUB0OWyOY60RbrDPou_qEMuOMQE9z2iieZq3PmG5fk"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": "invalid email/password"
    }
    ``    
**Show All Cart**
----
  Returns json data about cart
* **URL**

  /cart

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
      
    ```json
      [
    {
        "id": 23,
        "name": "mi band 4",
        "ProductId": 4,
        "quantity": 100,
        "totalPrice": 75000000,
        "image_url": "https://cdn.elevenia.co.id/g/9/7/2/6/7/0/28972670_B.jpg",
        "status": false,
        "updatedAt": "2020-02-27T01:39:49.104Z"
    },
    {
        "id": 17,
        "name": "g-shock limited edition",
        "ProductId": 2,
        "quantity": 1,
        "totalPrice": 550000,
        "image_url": "https://cdn.elevenia.co.id/g/9/7/2/6/7/0/28972670_B.jpg",
        "status": true,
        "updatedAt": "2020-02-26T22:51:18.734Z"
    },
    {
        "id": 25,
        "name": "I-watch 4",
        "ProductId": 1,
        "quantity": 2,
        "totalPrice": 8000000,
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/41eJMQgmUrL.jpg",
        "status": false,
        "updatedAt": "2020-02-26T23:18:20.987Z"
    },
    {
        "id": 22,
        "name": "I-watch 4",
        "ProductId": 1,
        "quantity": 2,
        "totalPrice": 8000000,
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/41eJMQgmUrL.jpg",
        "status": true,
        "updatedAt": "2020-02-26T23:10:36.231Z"
    }
]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```  
**Insert New Cart**
----
  Insert new cart.

* **URL**

  /cart

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**

   `ProductId=[number]`<br>
* **Success Response:**

  * **Code:** 201 <br>
    **Content:** 
      
    ```json
    {
        "status": false,
        "id": 26,
        "UserId": 2,
        "ProductId": 2,
        "quantity": 1,
        "totalPrice": 550000,
        "updatedAt": "2020-02-27T03:00:41.909Z",
        "createdAt": "2020-02-27T03:00:41.909Z"
    }
    ```
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }` 

  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
**Update a Cart**
----
   Return data and message of updated cart.

* **URL**

  /cart/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   **Required:**
 
   `quantity=[number]`<br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "status": [
            1
        ],
        "msg": "success updated cart"
    }
    ```
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "quntity is only allow number",
        ]
    }
    ```
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "quantity cannot be negative"
        ]
    }
    ```
* **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
* **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```      
**Delete a Cart**
----
   Delete and Return status of delete in json data.

* **URL**

  /cart/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
      "status": 1,
      "msg": "succes delete cart"
    }
    ```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "msg": "Not Found",
      "error": "failed to delete product"
    }
    ```

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

* **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ```
**Checkout**
----
   Return data and message of checkout cart and product.

* **URL**

  /checkout

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 

* **Data Params**

   **Required:**
 
   `ProductId=[number]`<br>
   `quantity=[number]`<br>
   `id=[number]`<br>


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "result": [
            1
        ],
        "msg": "transaction success"
    }
    ```
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
        "msg": "Bad Request",
        "error": "not enough stock, stock is only 23"
    }
    ```
* **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
    "msg": "Forbidden",
    "error": "You must login first"
    }
    ```
* **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "UNAUTHORIZED",
      "error": "You are not authorized"
    }
    ``` 
