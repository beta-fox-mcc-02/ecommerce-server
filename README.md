# ecommerce-server

**Register**
----

* **URL**

  http://localhost:3000/admin/register

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

  http://localhost:3000/admin/login

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

**Find All**
----

* **URL**

  http://localhost:3000/admin/product

* **Method:**
  
  `GET`
  
*  **URL Params**

   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        data: [--listData--]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "INTERNAL SERVER ERROR" }`

**Create Product**
----

* **URL**

  http://localhost:3000/admin/product

* **Method:**
  
  `POST`
  
*  **URL Params**

   `None`

* **Data Params**

  ```javascript
    {
        name: 'doraemon vol.40',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
        author: 'fujiko f fujio',
        price: 15000,
        stock: 10
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        data: {
          name: '<any>',
          author: '<any>',
          image_Url: '<any>',
          price: '<any>',
          stock: '<any>'
        },
        message: 'success create product'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "name cant be empty" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "image url cant be empty" }`
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "price cant be less than 0" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "stock cant be less than 0" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "author name cant be less than 0" }`

**Update Product**
----

* **URL**

  http://localhost:3000/admin/product/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  ```javascript
    {
        name: 'doraemon vol.50',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
        author: 'fujiko f fujio',
        price: 15000,
        stock: 10
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        data: {
          name: '<any>',
          author: '<any>',
          image_Url: '<any>',
          price: '<any>',
          stock: '<any>'
        },
        message: 'success update product'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "name cant be empty" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "image url cant be empty" }`
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "price cant be less than 0" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "stock cant be less than 0" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "author name cant be less than 0" }`

**Update Product**
----

* **URL**

  http://localhost:3000/admin/product/:id

* **Method:**
  
  `delete`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        message: 'success delete product'
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "INTERNAL SERVER ERROR" }`