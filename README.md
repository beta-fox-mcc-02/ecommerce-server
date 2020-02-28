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


**Login User Account**
----
  Returns data of user loged in.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    ```
    email:string
    password:string
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "role": "<boolean>"
        "token": "<string>"
        "msg": "success login"
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

**Add Products**
----
  Returns new product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    ```
    name:string
    image_url:string
    price:number
    stock:number
    category:array
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "name": "<string>"
        "image_url": "<string>"
        "price": "<string>"
        "stock": "<string>"
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

**Update Products**
----
  Returns message and status http code.

* **URL**

  /products

* **Method:**

  `PUT`
  
*  **URL Params**

    /:id

* **Data Params**

    ```
    name:string
    image_url:string
    price:number
    stock:number
    category:array
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "msg": "update success"
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

**Delete Products**
----
  Returns message and status http code.

* **URL**

  /products

* **Method:**

  `DELETE`
  
*  **URL Params**

    /:id

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "msg": "Delete success"
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

**Add To Cart**
----
  Returns message and status http code.

* **URL**

  /cart

* **Method:**

  `POST`
  
*  **URL Params**

  none

* **Data Params**

  ProductId:integer,
  UserId:integer

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "msg": "Success add product to cart"
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



**Read Fetch**
----
  Returns message and status http code.

* **URL**

  /cart

* **Method:**

  `GET`
  
*  **URL Params**

  none

* **Data Params**

  UserId:integer
  status:false

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "msg": success fetch data
        "data": <result fetch data>
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


**Delete Cart**
----
  Returns message and status http code.

* **URL**

  /cart/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  :id

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "msg": success delete from cart
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


**Update Cart**
----
  Returns message and status http code.

* **URL**

  /cart/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  :id

* **Data Params**

  quantity:integer
  price:false

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "msg": update success
        "data": <result updated data>
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

**Payment Cart**
----
  Returns message and status http code.

* **URL**

  /cart/:id

* **Method:**

  `POST`
  
*  **URL Params**

  :id

* **Data Params**

  UserId:integer
  status:false

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "data": <result data>
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