# ecommerce-server

* **BASE URL**
  
  http://localhost:3000
  

# Register and Login

**Register User**
----
  Register as a new user.

* **URL**

  /register/user

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
