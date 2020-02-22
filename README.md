# ecommerce-server
Base url : http://localhost:3000/

# Users Router

**Create User**
----
  Create json user data.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
   
   `name=[STRING]` \
   `email=[STRING]` \
   `password=[String]` 

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
         "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNSwiZW1haWwiOiJkQG1haWwuY29tIiwiUm9sZUlkIjoxLCJpYXQiOjE1ODIzNTk3MTh9.VDZ9VZBwCEfmtTaK01RaT-ymyPbyzAABm3Yn6aa-woU",
         "msg" : "success register"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "Password length must be between 6 and 12" }
    ```


**User Login**
----
  User login data.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
   
   `email=[STRING]` \
   `password=[String]` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNSwiZW1haWwiOiJkQG1haWwuY29tIiwiUm9sZUlkIjoxLCJpYXQiOjE1ODIzNTk3MTh9.VDZ9VZBwCEfmtTaK01RaT-ymyPbyzAABm3Yn6aa-woU",
         "msg": "login success 
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "wrong username/password" }
    ```


# Products Router

**Create Product**
----
  Create json product data.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
   
   `name=[STRING]` \
   `price=[NUMBER]` \
   `stock=[NUMBER]` \
   `genre=[STRING]` \
   `CategoryId=[NUMBER]` \   
   `image_url=[STRING]` \

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": {
          "id": 54,
          "name": "subnautica",
          "image_url": "www.google.com",
          "price": 100000,
          "stock": 1,
          "genre": "action",
          "CategoryId": null,
          "updatedAt": "2020-02-22T08:35:45.877Z",
          "createdAt": "2020-02-22T08:35:45.877Z"
        },
        "msg" : "success create product"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "fail create product" }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```

**Find all Product**
----
  Find all json product data.

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
    **Content:** 
    ```json
      {
        "data": [
        {
          "id": 54,
          "name": "subnautica",
          "image_url": "www.google.com",
          "price": 100000,
          "stock": 1,
          "genre": "action",
          "CategoryId": null,
          "updatedAt": "2020-02-22T08:35:45.877Z",
          "createdAt": "2020-02-22T08:35:45.877Z"
        },
        {
          "id": "37",
          "name": "Warcraft 3",
          "image_url": "http://google.com",
          "price": 100000,
          "stock": 5,
          "genre": "Adventure",
          "CategoryId": 1,
          "createdAt": "2020-02-19T18:28:05.586Z",
          "updatedAt": "2020-02-22T07:50:51.091Z"
        }
        ],
        "msg" : "success get all product"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "please log in first" }
    ```
  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```

**Find one Product**
----
  Find one json product data.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
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
        "data": {
          "id": 54,
          "name": "subnautica",
          "image_url": "www.google.com",
          "price": 100000,
          "stock": 1,
          "genre": "action",
          "CategoryId": null,
          "updatedAt": "2020-02-22T08:35:45.877Z",
          "createdAt": "2020-02-22T08:35:45.877Z"
        },
        "msg" : "success get one product"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "product not found" }
    ```
  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```


**Update Product**
----
  Update json product data.

* **URL**

  /products/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**
   
   `name=[STRING]` \
   `price=[NUMBER]` \
   `stock=[NUMBER]` \
   `genre=[STRING]` \
   `CategoryId=[NUMBER]` \   
   `image_url=[STRING]` \

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      { "msg" : "success update product" }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "fail update product" }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```

**Delete Product**
----
  Delete json product data.

* **URL**

  /products/:id

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
      { "msg" : "success delete product" }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "product not found" }
    ```
  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```


# Categories Router

**Create Category**
----
  Create json category data.

* **URL**

  /categories

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
   
   `name=[STRING]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": {
          "id": 1,
          "name": "Best Seller",
        },
        "msg" : "success create category"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "fail create category" }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```

**Find all Category**
----
  Find all json category data.

* **URL**

  /categories

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
      {
        "data": [
        {
          "id": 32,
          "name": "Best Seller"
        },
        {
          "id": 37,
          "name": "New Release"
        }
        ],
        "msg" : "success get categories"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "please log in first" }
    ```
  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```

**Find one Category**
----
  Find one json category data.

* **URL**

  /categories/:id

* **Method:**

  `GET`
  
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
        "data": {
          "id": 5,
          "name": "Best Seller"
        },
        "msg" : "success get category"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "category not found" }
    ```
  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```


**Update Category**
----
  Update json category data.

* **URL**

  /categories/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**
   
   `name=[STRING]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      { "msg" : "success update category" }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "fail update category" }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```

**Delete Category**
----
  Delete json category data.

* **URL**

  /categories/:id

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
      { "msg" : "success delete category" }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "msg" : "category not found" }
    ```
  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "msg" : "you are not authorize" }
    ```
