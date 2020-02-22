# ecommerce-server

**registration**
----
register user


* **URL**

  /user/regis

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            token: "2kb4khb24bgk4h2bkhf2bofhb2odbbsojnomdkvnofv",
            name: username
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Login**
----
login user


* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            token: "2kb4khb24bgk4h2bkhf2bofhb2odbbsojnomdkvnofv",
            name: username
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
  get product

* **URL**

  /product/

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": [list of products]
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
  get product detail

* **URL**

  /product/:id

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "_id": "5e2d45ca2c14045618001af5",
                "product": {
                    "_id": "5e27aa2815497236f5ea76ad",
                    "name": "sirup abc",
                    "stock": 5,
                    "desc": "tikus makan sabun",
                    "price": 2000,
                    "__v": 0
                },
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
  add product

* **URL**

  /product

  * **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "_id": "5e2d45ca2c14045618001af5",
                "product": {
                    "_id": "5e27aa2815497236f5ea76ad",
                    "name": "sirup abc",
                    "stock": 5,
                    "desc": "tikus makan sabun",
                    "price": 2000,
                    "__v": 0
                },
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
  delete one product

* **URL**

  /product/:id

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, ndeleted: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  update a product

* **URL**

  /product/:id

  * **Method:**

  `put`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, nmodified: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`