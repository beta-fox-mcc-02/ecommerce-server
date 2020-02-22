# ecommerce-server

**Register Admins**
----
  Returns json data about a single admin.

* **URL**

  http://localhost:3000/admins/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 

* **Data Params**

  name : string, <br>
  email : string, <br>
  password : string <br>

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {"msg" : "register admin is successfully",
    "data" : {
        "id" : 1,
        "name" : "Hikmani Syariful Fajar",
        "email" : "syariful@gmail.com"
    }}
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    { 
    "msg" : 'bad request', 
    "errors" : ["name is not empty"]
    }
    ```

  OR

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```

**Login Admins**
----
  Returns json data about a access_token.

* **URL**

  http://localhost:3000/admins/login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 

* **Data Params**

  email : string, <br>
  password : string <br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ5LCJuYW1lIjoiSGlrbWFuaSIsImVtYWlsIjoic3lhcmlmdWxAZ21haWwuY29tIiwiaWF0IjoxNTgyMzQ3NDY2fQ.UszPFfVnCEtCq5caQMm2oeCF7-dLHoE79023lu15UzM"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    { 
    "msg" : 'bad request', 
    "errors" : ["email is not empty"]
    }
    ```

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    { 
    "msg" : 'bad request', 
    "error" : "Email/Password Incorrectly"
    }
    ```

  OR

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```

***

# PRODUCT

**Get all products**
----
  Returns json data array of object about a single admin.

* **URL**

  http://localhost:3000/products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "dataItems": [
        {
            "id": 183,
            "name": "Sweat B",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8DiupzPKdSiLh55DWnQ8aXIvydut3ufaqUhc2iHxIGzUiMQzG",
            "price": 250000,
            "stock": 9,
            "createdAt": "2020-02-22T08:20:22.962Z",
            "updatedAt": "2020-02-22T08:20:22.962Z"
        }
    ]
    }
    ```
 
* **Error Response:**

  * **Code:** 404 BAD REQUEST <br />
    **Content:** 
    ```
    { 
    "msg" : 'Not Found', 
    "errors" : [" is not empty"]
    }
    ```

  OR

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```

**create new product**
----
  Returns json data  object about a product.

* **URL**

  http://localhost:3000/products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 

* **Data headers**
  token

* **Data Params**
  name : string, <br>
  image_url : string <br>
  price : integer <br>
  stock : integer <br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "id": 186,
    "name": "Sweat Z",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/2/13/869777/869777_46b430a7-62cd-46ea-a381-40569deb1103.jpg",
    "price": 220000,
    "stock": 10,
    "updatedAt": "2020-02-22T10:44:03.712Z",
    "createdAt": "2020-02-22T10:44:03.712Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```

* **URL**

**find one product**
----
  Returns json data object about a product.


  http://localhost:3000/products/1

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data headers**
  token

* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "dataItem": {
        "id": 181,
        "name": "Sweat M",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT_IeEP30DjqxSDGywEjwuxqaZ9drx6E01SRwBnGjnap6EQ-hA9",
        "price": 2000000,
        "stock": 10,
        "createdAt": "2020-02-22T04:22:54.001Z",
        "updatedAt": "2020-02-22T04:22:54.001Z"
    }
  }
    ```
 
* **Error Response:**

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```


**UPDATE one product**
----
  Returns json data array of ARRAY about a product.


  http://localhost:3000/products/1

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data headers**
  token

* **Data Params**
  name : string, <br>
  image_url : string <br>
  price : integer <br>
  stock : integer <br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "data": [
        1,
        [
            {
                "id": 181,
                "name": "SWETAR AVATAR",
                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT_IeEP30DjqxSDGywEjwuxqaZ9drx6E01SRwBnGjnap6EQ-hA9",
                "price": 1000000,
                "stock": 5,
                "createdAt": "2020-02-22T04:22:54.001Z",
                "updatedAt": "2020-02-22T06:56:15.457Z"
            }
        ]
    ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```

**DELETE one product**
----
  Returns json data array  about a amount of product deleted.


  http://localhost:3000/products/1

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data headers**
  token

* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "data": [ 1 ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTENAL SERVER ERROR <br />
    **Content:** 
    ```
    { "msg" : "Internal Server Error" }
    ```
