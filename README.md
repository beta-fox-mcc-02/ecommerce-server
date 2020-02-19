# ecommerce-server

**Show User**
----
  Returns json data about a single user.

* **URL**

  http://localhost:3000/admins/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  name : string, <br>
  email : string, <br>
  password : string <br>

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {"msg" : "register admin is successfully",
    "data" : {
        "id" : 1,
        "name" : "Hikmani Syariful Fajar",
        "email" : "syariful@gmail.com"
    }}
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    { 
    "msg" : 'bad request', 
    "errors" : ["Title is not empty"]
    }
    ```

  OR

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```