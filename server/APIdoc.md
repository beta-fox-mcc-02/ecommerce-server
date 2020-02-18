**E-COMMERCE CMS**
---
* **Base URL**

  http://localhost:3000
---

**USERS**
---
*Login*
----
  Returns an access token and user's username.

* **URL**

  /users

* **Method:**

  `POST`

* **Data Params**

  `user=[string]`

  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    * `{ token, username }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    * `{ errors : ["Wrong username / email / password"] }`

    OR
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/users",
      method : "POST",
      data: {
        user: ..., //either username or email
        password: ...
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```

---
*register*
----
  Returns a message that confirm that register is successful.

* **URL**

  /users/register

* **Method:**

  `POST`

* **Data Params**

  `username=[string]`

  `email=[string]`

  `password=[string]`

  `role=[boolean]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    * `{ msg : "Register successful" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    * `{ errors : ["Wrong email format"] }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    * `{ errors : ["Email is already used"] }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    * `{ errors : ["Password cannot be empty"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/users/register",
      method : "POST",
      data: {
        username: ...,
        email: ...,
        password: ...
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```
---

**PRODUCTS**
---
*findAll*
----
  Returns all available products

* **URL**

  /products

* **Method:**

  `GET`

* **Headers:**

  * **Required:**

    token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    * `{ products }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    * `{ errors : ["Please login first"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/products",
      method : "GET",
      headers: {
        token
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```
---
  *findByPk*
----
  Returns one product based on params product Id

* **URL**

  /products/:productId

* **Method:**

  `GET`

* **Headers:**

  **Required:**

  token

*  **URL Params** 

      **Required:**
 
   `productId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    * `{ products }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    * `{ errors : ["Please login first"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/products/1",
      method : "GET",
      headers: {
        token
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```
---
  *create*
----
  Returns a message that confirm the product successfully created

* **URL**

  /products

* **Method:**

  `POST`

* **Headers:**


  **Required:**

  token

*  **URL Params** 

      **Required:**
 
   `productId=[integer]`

* **Data Params**

  `name=[string]`
  
  `image_url=[string]` 
  
  `price=[integer]` 
  
  `stock=[integer]` 
  
  `CategoryId=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    * `{ msg: create products successful }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    * `{ errors : ["Please login first"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/products",
      method : "POST",
      data: {
        name: ...,
        image_url: ...,
        price: ...,
        stock: ...,
        CategoryId: ...
      },
      headers: {
        token
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```
---
  *update*
----
  Returns a message that confirm the product successfully updated

* **URL**

  /products/:productId/update

* **Method:**

  `PUT`

* **Headers:**

  **Required:**

  token

*  **URL Params** 

      **Required:**
 
   `productId=[integer]`

* **Data Params**

  `name=[string]`
  
  `image_url=[string]` 
  
  `price=[integer]` 
  
  `stock=[integer]` 
  
  `CategoryId=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    * `{ msg: update products successful }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    * `{ errors : ["Please login first"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/products/1/update",
      method : "PUT",
      data: {
        name: ...,
        image_url: ...,
        price: ...,
        stock: ...,
        CategoryId: ...
      },
      headers: {
        token
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```
---
  *delete*
----
  Returns a message that confirms product has been deleted

* **URL**

  /products/:productId/delete

* **Method:**

  `DELETE`

* **Headers:**

  **Required:**

  token

*  **URL Params** 

      **Required:**
 
   `productId=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    * `{ msg: 'Delete product successful' }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    * `{ errors : ["Please login first"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/products/1/delete",
      method : "DELETE",
      headers: {
        token
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```
---

**CATEGORY**
---
*findAll*
----
  Returns all available categories

* **URL**

  /categories

* **Method:**

  `GET`

* **Headers:**

  **Required:**

  token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    * `{ categories }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    * `{ err }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    * `{ errors : ["Please login first"] }`

* **Sample Call:**

  ```javascript
    Axios({
      url: "http://localhost:3000/categories",
      method : "GET",
      headers: {
        token
      }
    });
      .then(response => {
        ...
      })
      .catch(err => {
        ...
      })
  ```

  