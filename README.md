# ecommerce-server# ecommerce-server

**User Registration**
----
  Returns json data about data registered of User.

* **URL**

  `/registration`

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `email = string,
  password = string,
  RoleId = integer
  `

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    { id : 1, name : "Renata Moloek" }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  **Content:** 
    ```javascript
    { errors : ['You have to register an email', 'You have to set your password', 'Input is not email format', 'Password length must between 2 and 8'] }
    ```

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    ```

**Administrator Login**
----
  Returns json data about access token of user.

* **URL**

  `/login`

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `email = string,
  password = string
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { access_token : "asdiugtuytdwqi8a8ye32eh9d8y3h" }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    { error : "please fill email and password" }
    ```


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    ```


**Add Product**
----
  Returns json data about data added and message.

* **URL**

  `/products`

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `name = string,
  image_url = string,
  price = integer,
  stock = integer
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {data : {},
    msg : ""}
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Invalid password / email!"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    ```










<!-- 
url gambar 
smartphone 
https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg


laptop
https://www.apple.com/v/macbook-air/e/images/meta/og.png


monitor 
https://azcd.harveynorman.com.au/media/catalog/product/l/u/lu32j590uqexxy-3.jpg

 -->
