# ecommerce-server

* **BASE URL**
  
  http://localhost:3000
  

# Register and Login

**Register User**
----
  Register as a new user of Foot-Style.

* **URL**

  /register/user

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Body:** <br />
    ```
    name        :string,
    email       :string,
    password    :string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "id": 1,
        "name": "dimas",
        "email": "dimas@email.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    "email has already existed"
    ```
    OR
    ```javascript
    "email format required"
    ```
    OR
    ```javascript
    "Minimum password length is 8 characters"
    ```

  * **Code:** 500 Internal Server Error <br />
      **Content:** <br>
      ```javascript
      "internal server error, problem might be occured while some process are done"
      ```

**Register Admin**
----
  Register as a new admin of Foot-style.

* **URL**

  /register/admin

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Body:** <br />
    ```
    name        :string,
    email       :string,
    password    :string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "id": 1,
        "name": "dimas",
        "email": "dimas@email.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    "email has already existed"
    ```
    OR
    ```javascript
    "email format required"
    ```
    OR
    ```javascript
    "Minimum password length is 8 characters"
    ```

  * **Code:** 500 Internal Server Error <br />
      **Content:** <br>
      ```javascript
      "internal server error, problem might be occured while some process are done"
      ```

**Login**
----
  Login to Foot-Style.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Body:** <br />
    ```
    email       :string,
    password    :string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "access_token": 'your_token'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    "username / password incorrect"
    ```

  * **Code:** 500 Internal Server Error <br />
      **Content:** <br>
      ```javascript
      "internal server error, problem might be occured while some process are done"
      ```