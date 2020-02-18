# ecommerce-server
<br>
***Register Admin***
====
    Returns json token about new Admin

* **URL**

    /admin/register

* **Method**

    `POST`

* **URL Params**

    None

* **Data Params**

    **required**

    ```javascript
        {
            email : "email@email.com",
            password : "password"
        }
    ```

* **Success Response:**

    **Code:** 201 <br>
    **Content**
    ```javascript
        {
            token : "secret-token"
        }
    ```

* **Error Response:**

  **Code:** 400 <br />
  **Content:** 
  ```javascript
    {
        err : [
            'email cannot empty',
            ...
        ]
    }
    ```

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {
        msg : 'internal server error'
    }
    ```
<br>

***Login Admin***
====
    Returns json token about Admin

* **URL**

    /admin/login

* **Method**

    `POST`

* **URL Params**

    None

* **Data Params**

    **required**

    ```javascript
        {
            email : "email@email.com",
            password : "password"
        }
    ```

* **Success Response:**

    **Code:** 200 <br>
    **Content**
    ```javascript
        {
            token : "secret-token"
        }
    ```

* **Error Response:**

  **Code:** 400 <br />
  **Content:** 
  ```javascript
    {
        err : 'email / password wrong'
    }
    ```

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {
        msg : 'internal server error'
    }
    ```
<br>

***Add Product***
====
    returns json data new Product

* **URL**

    /product/list

* **Methods**

    `POST`

* **URL Params**

    None

* **Data Params**

    **required**
    ```javascript
        {
            name : 'item',
            image_url : 'image Url',
            price : 1000,
            stock : 10
        }
    ```

* **Success Response**

    **Code:** 201 <br>
    **Content:**
    ```javascript
        {
            id : Number,
            name : String,
            image_url : String,
            price : Number,
            stock : Number

        }
    ```

* **Error Response**

    **Code:** 400 <br>
    **Content:**
  ```javascript
    {
        err : [
            'name cannot empty',
            ...
        ]
    }
    ```

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {
        msg : 'internal server error'
    }
    ```
<br>
