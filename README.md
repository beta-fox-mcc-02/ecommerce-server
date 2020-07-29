# ecommerce-server

# Register Admin
    Make a new admin.

* **URL**

  http://localhost:3000/admin/register

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   

* **Data Params**

    username : string,   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    { 
        "email" : "admin@gmial.com",
        "password": "admin"
     }
    ```
 
* **Error Response:**

  * **Code:** 400 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : ['{error message}'] 
    ```


***

# Admin Login
    player joins to room to play game.

* **URL**

  http://localhost:3000/login

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 

* **Data Params**

    email : string,   

* **Success Response:**

  * **Code:** 20 <br />
    **Content:** 
    ```javascript
    {msg : "succses login"}
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    { 
        "msg" : 'email does't exist',,
        "error" : "is undefined"
    }
    ```

  OR
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***
# Fetch Data
    Player leave to room and remove RoomId.

* **URL**

  http://localhost:3000/

* **Method:**

  `GET`

   **Required:**

   * **Headers**
    token : string  
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {data}
    ]
    ```
 
* **Error Response:**
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***

# Delete Product
    Delete Player.

* **URL**

  http://localhost:3000/:id

* **Method:**

  `DELETE`
  
*  **URL Params**


   **Required:**

   * **Headers**
    token : string  
 
* **Data Params**

    ProductId : number,   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {msg : "succes delete"}
    ]
    ```
 
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

    OR 

  * **Code:** 404 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Data is undifiend" }
    ```


***

# Product Update 
    Make a new room master.

* **URL**

  http://localhost:3000/:id

* **Method:**

  `PUT`
  
*  **URL Params**


   **Required:**
 
* **Headers**
    token : string   

* **Data**
    {
        name,
        description,
        price,
        stock,
        image_url
    },   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {msg : "update berhasil"}
    ```
 
* **Error Response:**
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***

***
# Find One Product

* **URL**

  http://localhost:3000/:id

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
* **Headers**
  ProductId : number   

* **Data Params**

    token : string,   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        name,
        description,
        price,
        stock,
        image_url
    }
   
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```
***

# Product add 
    Make a new room master.

* **URL**

  http://localhost:3000/create

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
* **Headers**
    token : string   

* **Data**
    {
        name,
        description,
        price,
        stock,
        image_url
    },   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
        {
        name,
        description,
        price,
        stock,
        image_url
    },   
    ```
 
* **Error Response:**
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

    OR

  * **Code:** 404 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "[Array of error]" }
    ```

***