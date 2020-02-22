Database name: db_ecommerce

# **ECOMMERCE-CMS**
***
## 1. Register New user.

* **URL**

    http://localhost:3000/admin/register

* **Method:**

    `POST`

* **Request Header:**

    ```javascript
    { 
      "Content-Type": "application/json",
      "token": "masteradmin_token"
    }
    ```

* **Request Body:** 

    ```javascript
        {
            "email": "example@mail.com",
            "password": "qqqqq"
        }
    ```

* **Success Response:**

    * **Code:** 201 <br />
    * **Content:** 
    ```javascript
        {
            "msg": "Success added new admin example@mail.com"
        }
    ```
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

  OR

  * **Code:** 400 Bad Request <br />
  * **Content:** 
  ```
  { 
    "msg": "SequelizeValidationError",
    "details": ["email exist", ...]
  }
  ```


***
## 2. Logged in already existed user.

* **URL**

    http://localhost:3000/admin/login

* **Method:**

    `POST`

* **Request Body:** 

    ```javascript
        {
            email: `example@mail.com`,
            password: `12345`
        }
    ```

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
        {
            "token": "eyJhbGciUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiYW5kcnVtYWhhcmRpZkByb2NrZXRtYWlsLmNvbSIsImlhdCI6MTU4MTY4NjMxNH0.hSuyvQAhyXSIS8dfa6VCiCTDSPWvOU",
            "name": "username"
        }
    ```
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** 
    ```javascript
        {
            "message": "user not found"
        }
    ```

  OR

    * **Code:** 500 Internal Server Error <br />

  OR

    * **Code:** 400 Bad Request <br />
    **Content:** 
    ```javascript
        {
            "message": "input invalid"
        }
    ```

***
## 3. Finding all categories.

* **URL**

    HTTP://localhost:3000/categories

* **Method:**

    `GET`

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```
    { data: [
      { id: 1, name: 'fashions'},
      { id: 2, name: 'Electronics'}
    ]}

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />


***
## 4. Add New Product. // 

* **URL**

    http://localhost:3000/product

* **Method:**

    `POST`

* **Request Header:**

    ```javascript
    { 
        "Content-Type": "application/json",
        "token": "admin_token"
    }
    ```

* **Request Body:** 

    ```javascript
        {
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 10000,
            stock: 10,
            category: `Electronics`
        }
    ```

* **Success Response:**

    * **Code:** 201 <br />
    * **Content:** 
    ```javascript
    {
        message: 'successfully added Bag to database'
    }
    ```
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** 
    ```javascript
    {
        "message": "sequelizeValidationError",
        "details": ['length has to be 7 characters', ...]
    }
    ```

    OR

    * **Code:** 401 Unauthorized <br />
    **Content:** 
    ```javascript
    {
        "message": 'jwt malformed'
    }
    ```

***
## 5. Fetch all products.

* **URL**

    http://localhost:3000/products

* **Method:**

    `GET`

* **Request Header:**

    ```javascript
    { 
        "Content-Type": "application/json",
        "token": "admin_token"
    }
    ```

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
    {
        "products": [
            {product1, product2, ...}
        ]
    }
    ```
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    OR

    * **Code:** 401 Unauthorized <br />
    **Content:** 
    ```javascript
    {
        "message": 'jwt malformed'
    }
    ```

***
## 6. Update selected product.

* **URL**

    http://localhost:3000/product/:id

* **Method:**

    `PUT`

* **URL Params**

    **Required:** <br>
    `id=[integer]`
    "selected task ID"

* **Request Header:**

    ```javascript
    { 
        "Content-Type": "application/json",
        "token": "admin_token"
    }
    ```

* **Request Body:** 

    ```javascript
        {
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 100,
            stock: 5,
            category: 'Fashions'
        }
    ```

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
    {
        "products": {
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 100,
            stock: 5,
            category: 'Fashions'
        },
        "message": "success update product at id <url_params>"
    }

    ```
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** 
    ```javascript
    {
        "message": "sequelizeValidationError",
        "details": ['length has to be 7 characters', ...]
    }
    ```

    OR

    * **Code:** 401 Unauthorized <br />
    **Content:** 
    ```javascript
    {
        "message": 'jwt malformed'
    }
    ```

***
## 7. Delete selected data.

* **URL**

    http://localhost:3000/product/:id

* **Method:**

    `DELETE`

* **URL Params**

    **Required:** <br>
    `id=[integer]`
    "selected task ID"

* **Request Header:**

    ```javascript
    { 
        "Content-Type": "application/json",
        "token": "admin_token"
    }
    ```

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:**  { "message": "success deleted product at id <url_params>" }

* **Error Response:**

    * **Code:** 500 Internal Server Error <br />
    * **Content:** `{ error : "Internal Server Error" }`

    OR

    * **Code:** 401 Unauthorized <br />
    * **Content:** `{ msg : "jwt malformed" }`

***
## 8. Fetch all registered admins .

* **URL**

    http://localhost:3000/admins

* **Method:**

    `GET`

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:**
    ```javascript
    [
        {admin1, admin2, ...}
    ]
    ```

* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    OR

    * **Code:** 401 Unauthorized <br />
    **Content:** 
    ```javascript
    {
        "message": 'jwt malformed'
    }
    ```
    