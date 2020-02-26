**Show All Products**
----
  Returns json data about all products.

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
                "id": 48,
                "name": "Blouse",
                "image_url": "https://s4.bukalapak.com/img/9478834613/w-1000/clove_blouse_rina_blouse_hijab_atasan_wanita_baju_kerja_wani.png",
                "price": 70000,
                "stock": 1,
                "createdAt": "2020-02-22T07:11:06.729Z",
                "updatedAt": "2020-02-22T07:11:06.729Z"
            },
            {
                "id": 49,
                "name": "Celana",
                "image_url": "https://dynamic.zacdn.com/6NTcxPtBWoufhO_KfuLW5XCCUTU=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/hemmeh-5336-6489581-1.jpg",
                "price": 120000,
                "stock": 5,
                "createdAt": "2020-02-22T07:11:36.767Z",
                "updatedAt": "2020-02-22T07:11:36.767Z"
            },
            {
                "id": 47,
                "name": "Sayur Lodeh",
                "image_url": "https://i1.wp.com/resepkoki.id/wp-content/uploads/2017/02/Resep-Sayur-asem-jawa-tengah.jpg?fit=1300%2C1300&ssl=1",
                "price": 10000,
                "stock": 10,
                "createdAt": "2020-02-22T07:10:33.779Z",
                "updatedAt": "2020-02-22T07:34:59.804Z"
            }
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---

**Create Product**
----
  Create new product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "message": "Success Create Product"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

---

**Show Product By Id**
----
  Return a product by particular id.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "data": {
            "id": 48,
            "name": "Blouse",
            "image_url": "https://s4.bukalapak.com/img/9478834613/w-1000/clove_blouse_rina_blouse_hijab_atasan_wanita_baju_kerja_wani.png",
            "price": 70000,
            "stock": 1,
            "createdAt": "2020-02-22T07:11:06.729Z",
            "updatedAt": "2020-02-22T07:11:06.729Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

---

**Update One Product**
----
  Update one product based on id.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "message": "Success Update Data"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

---

**Delete One Product**
----
  Delete one product based on id.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "message": "Success Delete Data
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

---

**Register User**
----
  Register a user.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

    **Required**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
      "access_token": "eyJhbIsInR5cCI6IkpXVCJ9.eyJpZCI6NCxNTgxNjc0NjE4fQ.wMFSchDraMBYqAEri6Tchl_0x2St831OGus"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 BAD REQUEST <br />
    **Content:** `{ message : "Email Already Exists" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

---

**Login User**
----
  Login a user.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

    **Required**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
      "access_token": "eyJhbGciOinR5cCI6IkpXVCJ9.eyJpZCI6NCwigxNjc0NjE4fQ.wMFSchDraMBAEri6Tchl_0x2St831OGus"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid Email/Password" }`

  * **Code:** 404 BAD REQUEST <br />
    **Content:** `{ message : "Email Already Exist" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

---
**Show All Carts**
----
  Returns json data about all carts.

* **URL**

  /carts

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
    [
        {
            "id": 48,
            "UserId": 19,
            "ProductId": 55,
            "status": false,
            "quantity": 1,
            "price": 550000,
            "createdAt": "2020-02-26T18:39:08.927Z",
            "updatedAt": "2020-02-26T18:39:08.927Z",
            "Product": {
                "name": "Jam Tangan Alexander Christie",
                "price": 550000
            }
        },
        {
            "id": 49,
            "UserId": 19,
            "ProductId": 54,
            "status": false,
            "quantity": 2,
            "price": 1400000,
            "createdAt": "2020-02-26T18:39:17.169Z",
            "updatedAt": "2020-02-26T18:39:24.075Z",
            "Product": {
                "name": "Sepatu Nike\n",
                "price": 700000
            }
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---

**Show All Purchase History**
----
  Returns json data about all purchase history.

* **URL**

  carts/histories

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
    [
        {
            "id": 31,
            "UserId": 19,
            "ProductId": 53,
            "status": true,
            "quantity": 4,
            "price": 120000,
            "createdAt": "2020-02-26T13:55:27.006Z",
            "updatedAt": "2020-02-26T17:24:28.629Z",
            "Product": {
                "name": "Batik Pria",
                "price": 120000
            }
        },
        {
            "id": 43,
            "UserId": 19,
            "ProductId": 54,
            "status": true,
            "quantity": 2,
            "price": 1400000,
            "createdAt": "2020-02-26T18:00:46.924Z",
            "updatedAt": "2020-02-26T18:01:04.505Z",
            "Product": {
                "name": "Sepatu Nike\n",
                "price": 700000
            }
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---

**Add Item to Cart**
----
  Returns message after success add item to cart.

* **URL**

  /carts

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "message": "Success Add Kaos Uniqlo to Cart"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---

**Checkout Cart**
----
  Returns message after checkout.

* **URL**

  /carts/checkout

* **Method:**

  `PUT`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        [
            1
        ],
        [
            1
        ]
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---

**Update Item Quantity in Cart**
----
  Returns message after update.

* **URL**

  /carts/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "message": "Success Update Cart"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---

**Delete Item in Cart**
----
  Returns message after delete.

* **URL**

  /carts/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "message": "Success Delete Cart"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad Request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`
---
