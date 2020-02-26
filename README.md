# ecommerce-server

**Create user**
----

* **URL**

`/users/register` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`name, email, passwords` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": ...,
      "name": "...",
       "email": "...",
      "password": "...",
      "isAdmin": "...",
       "updatedAt": "...",
       "createdAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ errors : [....] }` 

**login user**
----

* **URL**

`/users/login` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`email, passwords` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "name": "...",
      "token": "...",
    "isAdmin": Boolean
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 404 <br />

    **Content:** `{ "msg": "email / password is wrong" }` 

 OR

  + **Code:** 400 <br />

    **Content:** `{ "msg": "there's no token in your headers" }` 

OR

* **Code:** 401 <br />

    **Content:** `{ "msg": "invalid token" || "msg": 'JsonWebTokenError' }` 

**Create Product**
----

* **URL**

`/products` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`name, image_url, price, stock, CategoryId` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": ...,
    "name": "...",
    "image_url": "...",
    "price": ...,
    "stock": ...,
    "CategoryId": 4...,
    "updatedAt": "...",
    "createdAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ "msg": "jwt malformed" }` 

 OR

  + **Code:** 400 <br />

    **Content:** `{ "msg": "[...]" }` 

OR

* **Code:** 401 <br />

    **Content:** `{ "msg": "..." }` 

**Get Product**
----

* **URL**

`/products` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`none` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      [...]
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ "msg": "jwt must be provided" }` 

**Update Product**
----

* **URL**

`/products/:productId` 

* **Method:**

`PUT` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

   **Optional:**

`name, image_url, price, stock, CategoryId` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      [...]
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ "msg": "jwt must be provided" }` 

 OR

  + **Code:** 404 <br />

    **Content:** `{ "msg": Product not found' }` 

**Delete Product**
----

* **URL**

`/products/:productId` 

* **Method:**

`DELETE` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`none` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "msg": "product with ${productId} deleted"
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ "msg": "jwt malformed" }` 

 OR

  + **Code:** 400 <br />

    **Content:** `{ "msg": "[...]" }` 

OR

  + **Code:** 404 <br />

    **Content:** `{ "msg": Product not found' }` 

**Get One Product**
----

* **URL**

`/products` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`none` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "data": {
        "id": ...,
        "name": "...",
        "image_url": "...",
        "price": ...,
        "stock": ...,
        "CategoryId": ...,
        "createdAt": "...",
        "updatedAt": "...",
        "Category": {
            "id": ...,
            "tag": "...",
            "createdAt": "...",
            "updatedAt": "..."
        }
      }
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ "msg": "jwt must be provided" }` 

   OR

  + **Code:** 404 <br />

    **Content:** `{ "msg": Product not found' }` 

**Add cart**
----

* **URL**

`/carts` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`ProductId, quantity` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "status": boolean,
    "UserId": ...,
    "ProductId": ...,
    "quantity": ...,
    "updatedAt": "...",
    "createdAt": "...",
    "id": ... 
    }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ "message": "stock is not available" }` 


**Get all user cart**
----

* **URL**

`/carts` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`none` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `[
      {
        "id": ...,
        "UserId": ...,
        "ProductId": ...,
        "quantity": ...,
        "status": boolean,
        "Product": {
            "id": ...,
            "name": "...",
            "image_url": "...",
            "price": ...,
            "stock": ...,
            "CategoryId": ...,
            "createdAt": "...",
            "updatedAt": "..."
        }
    },
    {
      ...
    }
    ]`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 


**Update status cart (purchase)**
----

* **URL**

`/carts/checkout/:cartId` 

* **Method:**

`PUT` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`none` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{
      'message': 'you purchased ${req.cartQuantity} ${updatedProduct.name} successfully'
    }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 
  
  OR

  + **Code:** 404 <br />

    **Content:** `{ message: 'cart with id ${req.params.cartId} not found' }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ message: 'you're not allowed to make this request' }` 


**Delete cart**
----

* **URL**

`/carts/:cartId` 

* **Method:**

`DELETE` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`none` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{
      'message': 'cart with id ${req.params.cartId} has been deleted'
    }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 404 <br />

    **Content:** `{ message: 'cart with id ${req.params.cartId} not found' }` 

  OR

  + **Code:** 401 <br />

    **Content:** `{ message: 'you're not allowed to make this request' }` 


**Update stock cart (unpurchase)**
----

* **URL**

`/carts/:cartId` 

* **Method:**

`PUT` 
  

*  **URL Params**

   **Required:**
 
`token` 

   **Optional:**
 
`None` 

* **Data Params**

`quantity` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{
    "id": ...,
    "UserId": ...,
    "ProductId": ...,
    "quantity": ...,
    "createdAt": "...",
    "updatedAt": "...",
    "status": ...
    }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ message: 'cart with id ${req.params.cartId} not found' }` 