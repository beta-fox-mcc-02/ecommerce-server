# E-Commerce

**Register User Account**
----
  Returns new user data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    ```
    first_name:string
    last_name:string
    address:string
    email:string
    password:string
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "first_name": "<string>"
        "last_name": "<string>"
        "email": "<string>"
        "address": "<string>"
        "msg": "Register success"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 <br />
    **Content:** 
    ```
    {
        "msg": "[based on validation error sequelize]"
    }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```
    {
        "msg": "Internal Server Error"
    }
    ```


