# ecommerce-server

* **URL**

  https://infinite-chamber-88917.herokuapp.com/

* **Method:**

  `GET` | `POST` | `DELETE` | `PUT`


**Sign Up Admin**
----
  Returns json new admin.

* **URL**

  /admins/signUp

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json'
  
* **data-raw**

  ```json
  {
    "email": string,
    "password": string
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />
    ```json
    {
      "msg": string,
      "payload": {
        "id": number,
        "email": string,
        "role": "admin"
      }
    }
    ```
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
        "msg": string,
        "errors": []
      }
    }
    ```

**Sign In Admin**
----
  Returns json data token.

* **URL**

  /admins/signIn

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json'
  
* **data-raw**

  ```json
  {
    "email": string,
    "password": string
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "message": "sign in success",
      "token": string
    }
    ```
   
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "message": "invalid email or password"
    }
    ```

**Show Products**
----
  Returns json data about all products.

* **URL**

  /products

* **Method:**

  `GET`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  token: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "msg": "fetch all products success",
      "data": []
    }
    ```

* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Show Product**
----
  Returns json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Headers**

  token: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
        "msg": "success find product id:2",
        "data": {}
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```
  
    OR
  
  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Create Products**
----
  Returns json data about new product.

* **URL**

  /products

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json',

  token: string
  
* **data-raw**

  ```json
  {
    "name": string,
    "image_url": string,
    "price": number,
    "stock": number
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />
    ```json
    {
        "msg": "success create product",
        "data": {}
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": string,
          "errors": []
      }
    }
    ```

**Update product**
----
  Returns json data about updated product.

* **URL**

  /products/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers**

  'Content-Type: application/json',
  
  token: string
    
  * **data-raw**

    ```json
    {
      "name": string,
      "image_url": string,
      "price": number,
      "stock": number
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "msg": "success update product",
        "data": [
          1,
          [
            {}
          ]
        ]
    }
    ```
  
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": string,
          "errors": []
      }
    }
    ```

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Delete Products**
----

* **URL**

  /Products/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers**

  token: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "data": 1,
      "msg": string
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Create Cart**
----
  Returns json data about new cart or updated cart.

* **URL**

  /carts

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json',

  token: string
  
* **data-raw**

  ```json
  {
    "UserId": integer,
    "ProductId": integer,
    "quantity": number
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />
    ```json
    {
        "msg": "success create cart",
        "data": {}
    }
    ```

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
        "msg": "success update cart",
        "data": []
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": string,
          "errors": []
      }
    }
    ```
    ```json
    {
      "errObj": {
          "msg": string,
          "errors": "product quantity is not enough"
      }
    }
    ```

**Update Cart**
----
  Returns json data about updated cart.

* **URL**

  /carts/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers**

  'Content-Type: application/json',
  
  token: string
    
  * **data-raw**

    ```json
    {
      "UserId": integer,
      "ProductId": integer,
      "quantity": integer,
      "status": boolean
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "msg": "success update cart",
        "data": [
          1,
          [
            {}
          ]
        ]
    }
    ```
  
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": string,
          "errors": []
      }
    }
    ```

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Delete cart**
----

* **URL**

  /carts/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers**

  token: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "data": 1,
      "msg": string
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Show carts**
----
  Returns json data about all carts.

* **URL**

  /carts

* **Method:**

  `GET`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  token: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "msg": "fetch all carts success",
      "data": []
    }
    ```

* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 401 authentication <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```