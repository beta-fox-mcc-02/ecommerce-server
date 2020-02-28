# ecommerce-server

**Find All product**
----

* **URL**

  http://localhost:3000

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

**Register admin**
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
        password: "12345",
        role: true
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript
    {   data: {
            username: "admin",
            email: "admin@mail.com",
            password: "12345",
            role: true
        },
        msg: 'success register as admin'
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

**Login admin**
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


**Create Product by admin**
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

**Update Product by admin**
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

**Delete Product by admin**
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

**Register user**
----

* **URL**

  http://localhost:3000/user/register

* **Method:**
  
  `POST`
  
*  **URL Params**

   `None`

* **Data Params**

  ```javascript
    {
        username: "user",
        email: "user@mail.com",
        password: "12345"
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript
    {   data: {
            username: "user",
            email: "user@mail.com",
            password: "12345",
            role: false
        },
        msg: 'success register as user'
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

**Login user**
----

* **URL**

  http://localhost:3000/user/login

* **Method:**
  
  `POST`
  
*  **URL Params**

   `None`

* **Data Params**

  ```javascript
    {
        email: "user@mail.com",
        password: "12345"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        token: " <token> ",
        msg: 'success login as <username>'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "invalid password / email" }`

**Find All cart by user**
----

* **URL**

  http://localhost:3000/cart

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

**Add Product to Cart by user**
----

* **URL**

  http://localhost:3000/:id

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**
  
  >search for data product cart and haven't checkouted
  ```javascript
    {
        UserId: <user-id>,
        ProductId: <product-id>,
        status: false
    }
  ```

  >if product in cart already exist then we update it
  ```javascript
    {
      amount: <previous amount> + <new amount>,
      total: <previous price> + <price>
    }
  ```

  >if product in cart havent created or already checkouted then we create new cart for that product
  ```javascript
    {
      UserId: <User Id>,
      ProductId: <Product Id>,
      amount: <amount>,
      price: <product price>,
      total: <amount> * <price>
    }
  ```

* **Success Response:**

  * **Code:** `if data cart not exist` 201, `if data cart exist` 200 <br />
    **Content:** 

    ```javascript
    {
      message: 'success add product to your cart'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "cart amount cant be empty" }`

**Checkout Cart by user**
----

* **URL**

  http://localhost:3000/cart

* **Method:**
  
  `PUT`
  
*  **URL Params**

    `None`

* **Data Params**
  
  >search for data product cart and haven't checkouted
  ```javascript
    {
        UserId: <user-id>,
        status: false
    }
  ```

  >update status in Cart to true that mean already checkouted
  ```javascript
    {
      status: true
    }
  ```

  >update stock in Product to be new stock
  ```javascript
    {
      stock: <old stock> - <new stock>
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
      message: 'success checkout cart'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Stock is less than your cart amount" }`

**Update amount Cart by user**
----

* **URL**

  http://localhost:3000/cart/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

  ```javascript
    {
      amount: <new amount>
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
      message: 'success update amount'
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

**delete Cart by user**
----

* **URL**

  http://localhost:3000/cart/:id

* **Method:**
  
  `delete`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
      message: 'success delete cart'
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`
