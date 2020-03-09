# ecommerce-server

**Costumer Registration**
----
  Returns json data about data registered of Costumer.

* **URL**

  `/register`

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


**Costumer Login**
----
  Returns json data about access token of Costumer.

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


**Administrator Registration**
----
  Returns json data about data registered of User.

* **URL**

  `/registerAdmin`

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

  `/loginAdmin`

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
    {data : {
        name: "Jambu Biji",
        image_url: 'http:/jambu-biji.jpeg',
        price: 5000,
        stock: 100
      },
    msg : "success edit data"}
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { errors : ["Please input the name", "Please input the price", "Please input some image", "Price must be number", "Please input already stock", "Cannot fill with minus value", "Stock must be number", "Cannot fill with minus value"]}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    ```


**View All Product**
----
  Returns json data array of data product and message.

* **URL**

  `/products`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `none
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {[
      {
        name: "Jambu Biji",
        image_url: 'http:/jambu-biji.jpeg',
        price: 5000,
        stock: 100
      },
      {
        name: "Semangka tanpa Biji",
        image_url: 'http:/semangka-tanpa-biji.jpeg',
        price: 9000,
        stock: 50
      }
    ]}
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot found any products"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }

**View a Product**
----
  Returns json data array of data product and message.

* **URL**

  `/products/:id`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id: integer`

* **Data Params**

  `none
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    { data : {
        name: "Jambu Biji",
        image_url: 'http:/jambu-biji.jpeg',
        price: 5000,
        stock: 100
      },
      msg: 'success fin data'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot found any products"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    


**Update Product**
----
  Returns number edited and message.

* **URL**

  `/products/:id`

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id: integer`

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
    {
      data : 1,
      msg: 'Success update'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot update product"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    


**Delete Product**
----
  Returns number deleted and message.

* **URL**

  `/products/:id`

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id: integer`

* **Data Params**

    `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      data : 1,
      msg: 'Success delete product'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot delete product"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    


**Costumers Registration**
----
  Returns json data about data registered of Costumers.

* **URL**

  `/registration`

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `email = string,
  password = string
  <!-- RoleId = integer -->
  `

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    { id : 1, email : "mara@mail.com" }
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


**Costumers Login**
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



CART
create
findOne
findAll
update
delete



**Add Cart**
----
  Returns json data about data added and message.

* **URL**

  `/cart`

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `CostumerId: integer,
  ProductId: integer
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {data : {
      id: 1,
      CostumerId: 1, 
      ProductId: 1,
      quantity: 1
    },
    msg : "success add data!"}
    ```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    ```


**View All Cart**
----
  Returns json data array of data product and message.

* **URL**

  `/cart/:id`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `Id:integer
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {[
      {
        id: 1,
        CostumerId: 1, 
        ProductId: 1,
        quantity: 1
      },
      {
        id: 2,
        CostumerId: 2, 
        ProductId: 1,
        quantity: 1
      },
      {
        id: 3,
        CostumerId: 1, 
        ProductId: 6,
        quantity: 3
      },
    ]}
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot found any produtcs in cart"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }

**View a Product**
----
  Returns json data of product and message.

* **URL**

  `/cart/view/:id`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id: integer`

* **Data Params**

  `none
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    { data : {
        name: "Jambu Biji",
        image_url: 'http:/jambu-biji.jpeg',
        price: 5000,
        stock: 100
      },
      msg: 'success fin data'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot found any products"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    


**Update Product**
----
  Returns number edited and message.

* **URL**

  `/cart/:id`

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id: integer`

* **Data Params**

  `quantity:integer
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      data : 1,
      msg: 'Success update'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot update cart"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }
    


**Delete Product**
----
  Returns number deleted and message.

* **URL**

  `/cart/:id`

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id: integer`

* **Data Params**

    `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      data : 1,
      msg: 'Success delete product'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    { error : "Cannot delete product"}

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { error : "Internal Server Error" }


<!-- 
url gambar 
smartphone 
https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg


laptop
https://www.apple.com/v/macbook-air/e/images/meta/og.png


monitor 
https://azcd.harveynorman.com.au/media/catalog/product/l/u/lu32j590uqexxy-3.jpg

 -->
