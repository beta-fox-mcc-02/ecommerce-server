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
