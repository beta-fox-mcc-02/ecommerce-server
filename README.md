# ecommerce-server

**Register**
----

* **URL**

  http://localhost:3000/register

* **Method:**
  
  `POST`
  
*  **URL Params**

   `None`

* **Data Params**

  ```javascript
    {
        username: "admin",
        email: "admin@mail.com",
        password: "12345"
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript
    {   data: {
            username: "admin",
            email: "admin@mail.com",
            password: "12345"
        },
        msg: 'success create'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "username cant be empty" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "your email must contain email format" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email already in use" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email cant be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "password length cannot less than 5" }`

**Login**
----

* **URL**

  http://localhost:3000/login

* **Method:**
  
  `POST`
  
*  **URL Params**

   `None`

* **Data Params**

  ```javascript
    {
        email: "admin@mail.com",
        password: "12345"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        token: " <token> ",
        msg: 'success login'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "invalid password / email" }`