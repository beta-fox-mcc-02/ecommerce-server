# ecommerce-server

* **BASE URL**
  
  http://localhost:3000
  

# Register and Login

**Register User**
----
  Register as a new user of Foot-Style.

* **URL**

  /register/user

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Body:** <br />
    ```
    name        :string,
    email       :string,
    password    :string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "id": 1,
        "name": "dimas",
        "email": "dimas@email.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    "email has already existed"
    ```
    OR
    ```javascript
    "email format required"
    ```
    OR
    ```javascript
    "Minimum password length is 8 characters"
    ```

  * **Code:** 500 Internal Server Error <br />
      **Content:** <br>
      ```javascript
      "internal server error, problem might be occured while some process are done"
      ```

**Register Admin**
----
  Register as a new admin of Foot-style.

* **URL**

  /register/admin

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Body:** <br />
    ```
    name        :string,
    email       :string,
    password    :string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "id": 1,
        "name": "dimas",
        "email": "dimas@email.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    "email has already existed"
    ```
    OR
    ```javascript
    "email format required"
    ```
    OR
    ```javascript
    "Minimum password length is 8 characters"
    ```

  * **Code:** 500 Internal Server Error <br />
      **Content:** <br>
      ```javascript
      "internal server error, problem might be occured while some process are done"
      ```

**Login**
----
  Login to Foot-Style.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Body:** <br />
    ```
    email       :string,
    password    :string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "access_token": 'your_token'
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    "username / password incorrect"
    ```

  * **Code:** 500 Internal Server Error <br />
      **Content:** <br>
      ```javascript
      "internal server error, problem might be occured while some process are done"
      ```

# CRUD Products

**Create New Product**
----
  Only admin who is authorized to create new product.

* **URL**

  /product

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <admin_token>
    ```

  * **Body:** <br />
    ```
    name        :string,
    description :string,
    image_url   :string,
    price       :integer,
    stock       :integer,
    categories  :array_string
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
        "msg": "product created successfully",
        "data": {
          "name": "Nike Free 202",
          "description": "Running shoes for all generation, affordable price, and many color choices",
          "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib",
          "price": 453210,
          "stock": 100
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "required product name"
    }
    ```
    OR
    ```javascript
    "email format required"
    ```
    OR
    ```javascript
    {
      "msg": "required price tag"
    }
    ```
    OR
    ```javascript
    {
      "msg": "Minimum price is 0"
    }
    ```
    OR
    ```javascript
    {
      "msg": "No decimal stock"
    }
    ```
    OR
    ```javascript
    {
      "msg": "Minimum stock "
    }
    ```
    OR
    ```javascript
    {
      "msg": "category required at least 1"
    }
    ```

**Get All Product**
----
  Get all available product.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "get all product",
      "data": [
          {
              "id": 1,
              "name": "Nike Stylish 6",
              "description": "Stylish shoes for many activities",
              "image_url": "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "price": 486000,
              "stock": 96,
              "sold": 4,
              "createdAt": "2020-02-26T05:53:33.465Z",
              "updatedAt": "2020-02-27T04:09:38.135Z",
              "Categories": [
                  {
                      "id": 1,
                      "name": "men",
                      "bg_img": "https://www.dolcegabbana.com/on/demandware.static/-/Library-Sites-Dolcegabbana/default/dw48846697/pageimages/PLPbanner/men-shoes-mob.jpg",
                      "createdAt": "2020-02-26T05:53:33.454Z",
                      "updatedAt": "2020-02-26T05:53:33.454Z",
                      "CategoryProduct": {
                          "CategoryId": 1,
                          "ProductId": 1,
                          "createdAt": "2020-02-26T05:53:33.479Z",
                          "updatedAt": "2020-02-26T05:53:33.479Z"
                      }
                  },
                  {
                      "id": 4,
                      "name": "sneaker",
                      "bg_img": "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                      "createdAt": "2020-02-26T05:53:33.454Z",
                      "updatedAt": "2020-02-26T05:53:33.454Z",
                      "CategoryProduct": {
                          "CategoryId": 4,
                          "ProductId": 1,
                          "createdAt": "2020-02-26T05:53:33.479Z",
                          "updatedAt": "2020-02-26T05:53:33.479Z"
                      }
                  }
              ]
          },
          {
              "id": 2,
              "name": "Luxberry Heels",
              "description": "Glamour heels for showing beautiful persona",
              "image_url": "https://images.pexels.com/photos/949590/pexels-photo-949590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "price": 689000,
              "stock": 98,
              "sold": 2,
              "createdAt": "2020-02-26T05:53:33.465Z",
              "updatedAt": "2020-02-27T02:56:00.945Z",
              "Categories": [
                  {
                      "id": 2,
                      "name": "women",
                      "bg_img": "https://images.pexels.com/photos/1308324/pexels-photo-1308324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                      "createdAt": "2020-02-26T05:53:33.454Z",
                      "updatedAt": "2020-02-26T05:53:33.454Z",
                      "CategoryProduct": {
                          "CategoryId": 2,
                          "ProductId": 2,
                          "createdAt": "2020-02-26T05:53:33.479Z",
                          "updatedAt": "2020-02-26T05:53:33.479Z"
                      }
                  },
                  {
                      "id": 6,
                      "name": "heels",
                      "bg_img": "https://images.pexels.com/photos/1507351/pexels-photo-1507351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                      "createdAt": "2020-02-26T05:53:33.454Z",
                      "updatedAt": "2020-02-26T05:53:33.454Z",
                      "CategoryProduct": {
                          "CategoryId": 6,
                          "ProductId": 2,
                          "createdAt": "2020-02-26T05:53:33.479Z",
                          "updatedAt": "2020-02-26T05:53:33.479Z"
                      }
                  },
                  {
                      "id": 8,
                      "name": "formal",
                      "bg_img": "https://images.pexels.com/photos/1566421/pexels-photo-1566421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                      "createdAt": "2020-02-26T05:53:33.454Z",
                      "updatedAt": "2020-02-26T05:53:33.454Z",
                      "CategoryProduct": {
                          "CategoryId": 8,
                          "ProductId": 2,
                          "createdAt": "2020-02-26T05:53:33.479Z",
                          "updatedAt": "2020-02-26T05:53:33.479Z"
                      }
                  }
              ]
          }
      ]
    }
    ```

**Get One Product**
----
  Get one desired product.

* **URL**

  /product/:productId

* **Method:**

  `GET`
  
*  **URL Params**

  **Required:**
 
   `productId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
        "msg": "get the product",
        "data": {
            "id": 5,
            "name": "Nike + Air Jordan Limited Edition",
            "description": "Limited Edition for Basketball player or enthusiasts",
            "image_url": "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "price": 1300000,
            "stock": 48,
            "sold": 2,
            "createdAt": "2020-02-26T05:53:33.465Z",
            "updatedAt": "2020-02-26T19:58:47.452Z",
            "Categories": [
                {
                    "id": 1,
                    "name": "men",
                    "bg_img": "https://www.dolcegabbana.com/on/demandware.static/-/Library-Sites-Dolcegabbana/default/dw48846697/pageimages/PLPbanner/men-shoes-mob.jpg",
                    "createdAt": "2020-02-26T05:53:33.454Z",
                    "updatedAt": "2020-02-26T05:53:33.454Z",
                    "CategoryProduct": {
                        "CategoryId": 1,
                        "ProductId": 5,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 2,
                    "name": "women",
                    "bg_img": "https://images.pexels.com/photos/1308324/pexels-photo-1308324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "createdAt": "2020-02-26T05:53:33.454Z",
                    "updatedAt": "2020-02-26T05:53:33.454Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 5,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 5,
                    "name": "sport",
                    "bg_img": "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "createdAt": "2020-02-26T05:53:33.454Z",
                    "updatedAt": "2020-02-26T05:53:33.454Z",
                    "CategoryProduct": {
                        "CategoryId": 5,
                        "ProductId": 5,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                }
            ]
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "product not found"
    }
    ```

**Update Product**
----
  Only admin who is authorized to update one product.

* **URL**

  /product/:productId

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `productId=[integer]`

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <admin_token>
    ```

  * **Body:** <br />
    ```
    name        :string,
    description :string,
    image_url   :string,
    price       :integer,
    stock       :integer,
    categories  :array_string
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
        "msg": "product updated successfully",
        "data": {
          "name": "Nike Ground Running 101",
          "description": "Running shoes for all generation, affordable price, and many color choices",
          "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          "price": 500000,
          "stock": 50
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

  * **Code:** 400 Bad Request <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "required product name"
    }
    ```
    OR
    ```javascript
    "email format required"
    ```
    OR
    ```javascript
    {
      "msg": "required price tag"
    }
    ```
    OR
    ```javascript
    {
      "msg": "Minimum price is 0"
    }
    ```
    OR
    ```javascript
    {
      "msg": "No decimal stock"
    }
    ```
    OR
    ```javascript
    {
      "msg": "Minimum stock "
    }
    ```
    OR
    ```javascript
    {
      "msg": "category required at least 1"
    }
    ```

**Delete One Product**
----
  Only admin who is authorized to delete one product.

* **URL**

  /product/:productId

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
   `productId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "product deleted successfully"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

  * **Code:** 404 Not Found <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "product not found"
    }
    ```

# Category

**Get All Categories**
----
  Get all available categories.

* **URL**

  /category

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
        "msg": "success get all categories",
        "data": [
            {
                "id": 1,
                "name": "men",
                "bg_img": "https://www.dolcegabbana.com/on/demandware.static/-/Library-Sites-Dolcegabbana/default/dw48846697/pageimages/PLPbanner/men-shoes-mob.jpg",
                "createdAt": "2020-02-26T05:53:33.454Z",
                "updatedAt": "2020-02-26T05:53:33.454Z",
                "Products": [
                    {
                        "id": 1,
                        "name": "Nike Stylish 6",
                        "description": "Stylish shoes for many activities",
                        "image_url": "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 486000,
                        "stock": 96,
                        "sold": 4,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T04:09:38.135Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 1,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 4,
                        "name": "Vans Fontro",
                        "description": "Simple yet trendy sneaker for every generation",
                        "image_url": "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 200000,
                        "stock": 99,
                        "sold": 1,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T00:51:52.304Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 4,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 8,
                        "name": "Hills Power Boots",
                        "description": "Durable boots for travel and adventure",
                        "image_url": "https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 800000,
                        "stock": 99,
                        "sold": 1,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T02:56:00.954Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 8,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 5,
                        "name": "Nike + Air Jordan Limited Edition",
                        "description": "Limited Edition for Basketball player or enthusiasts",
                        "image_url": "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 1300000,
                        "stock": 48,
                        "sold": 2,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-26T19:58:47.452Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 5,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 6,
                        "name": "Adidas Autumn Style",
                        "description": "Exclusive Adidas shoes for Autumn season",
                        "image_url": "https://images.pexels.com/photos/1599005/pexels-photo-1599005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 340000,
                        "stock": 99,
                        "sold": 1,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-26T23:48:00.800Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 6,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 3,
                        "name": "Converse 101",
                        "description": "Everyone's common shoes, affordable and still trendy",
                        "image_url": "https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?cs=srgb&dl=pair-of-laced-up-black-low-top-sneakers-847371.jpg&fm=jpg",
                        "price": 120000,
                        "stock": 95,
                        "sold": 5,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T04:09:38.139Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 3,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 10,
                        "name": "Crocodile Black",
                        "description": "Formal men shoes, exotic and elegeant",
                        "image_url": "https://images.pexels.com/photos/296158/pexels-photo-296158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 1320000,
                        "stock": 98,
                        "sold": 2,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-26T19:58:47.450Z",
                        "CategoryProduct": {
                            "CategoryId": 1,
                            "ProductId": 10,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    }
                ]
            },
            {
                "id": 2,
                "name": "women",
                "bg_img": "https://images.pexels.com/photos/1308324/pexels-photo-1308324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "createdAt": "2020-02-26T05:53:33.454Z",
                "updatedAt": "2020-02-26T05:53:33.454Z",
                "Products": [
                    {
                        "id": 5,
                        "name": "Nike + Air Jordan Limited Edition",
                        "description": "Limited Edition for Basketball player or enthusiasts",
                        "image_url": "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 1300000,
                        "stock": 48,
                        "sold": 2,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-26T19:58:47.452Z",
                        "CategoryProduct": {
                            "CategoryId": 2,
                            "ProductId": 5,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 2,
                        "name": "Luxberry Heels",
                        "description": "Glamour heels for showing beautiful persona",
                        "image_url": "https://images.pexels.com/photos/949590/pexels-photo-949590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 689000,
                        "stock": 98,
                        "sold": 2,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T02:56:00.945Z",
                        "CategoryProduct": {
                            "CategoryId": 2,
                            "ProductId": 2,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 3,
                        "name": "Converse 101",
                        "description": "Everyone's common shoes, affordable and still trendy",
                        "image_url": "https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?cs=srgb&dl=pair-of-laced-up-black-low-top-sneakers-847371.jpg&fm=jpg",
                        "price": 120000,
                        "stock": 95,
                        "sold": 5,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T04:09:38.139Z",
                        "CategoryProduct": {
                            "CategoryId": 2,
                            "ProductId": 3,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 4,
                        "name": "Vans Fontro",
                        "description": "Simple yet trendy sneaker for every generation",
                        "image_url": "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 200000,
                        "stock": 99,
                        "sold": 1,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T00:51:52.304Z",
                        "CategoryProduct": {
                            "CategoryId": 2,
                            "ProductId": 4,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 7,
                        "name": "Red High Heels",
                        "description": "Elegant color for exotic women",
                        "image_url": "https://images.pexels.com/photos/3682292/pexels-photo-3682292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 980000,
                        "stock": 99,
                        "sold": 1,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T00:51:52.297Z",
                        "CategoryProduct": {
                            "CategoryId": 2,
                            "ProductId": 7,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    },
                    {
                        "id": 9,
                        "name": "Cresent Black Boots",
                        "description": "Exotic boots for traveller, especially for women",
                        "image_url": "https://images.pexels.com/photos/1501210/pexels-photo-1501210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "price": 1500000,
                        "stock": 100,
                        "sold": 0,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-26T05:53:33.465Z",
                        "CategoryProduct": {
                            "CategoryId": 2,
                            "ProductId": 9,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    }
                ]
            },
            {
                "id": 3,
                "name": "converse",
                "bg_img": "https://images.pexels.com/photos/1753082/pexels-photo-1753082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "createdAt": "2020-02-26T05:53:33.454Z",
                "updatedAt": "2020-02-26T05:53:33.454Z",
                "Products": [
                    {
                        "id": 3,
                        "name": "Converse 101",
                        "description": "Everyone's common shoes, affordable and still trendy",
                        "image_url": "https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?cs=srgb&dl=pair-of-laced-up-black-low-top-sneakers-847371.jpg&fm=jpg",
                        "price": 120000,
                        "stock": 95,
                        "sold": 5,
                        "createdAt": "2020-02-26T05:53:33.465Z",
                        "updatedAt": "2020-02-27T04:09:38.139Z",
                        "CategoryProduct": {
                            "CategoryId": 3,
                            "ProductId": 3,
                            "createdAt": "2020-02-26T05:53:33.479Z",
                            "updatedAt": "2020-02-26T05:53:33.479Z"
                        }
                    }
                ]
            }
        ]
    }
    ```

**Get One Category**
----
  Get one desired category.

* **URL**

  /category/:categoryId

* **Method:**

  `GET`
  
*  **URL Params**

  **Required:**
 
   `categoryId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
        "msg": "success get category id 2",
        "data": {
            "id": 2,
            "name": "women",
            "bg_img": "https://images.pexels.com/photos/1308324/pexels-photo-1308324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "createdAt": "2020-02-26T05:53:33.454Z",
            "updatedAt": "2020-02-26T05:53:33.454Z",
            "Products": [
                {
                    "id": 2,
                    "name": "Luxberry Heels",
                    "description": "Glamour heels for showing beautiful persona",
                    "image_url": "https://images.pexels.com/photos/949590/pexels-photo-949590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "price": 689000,
                    "stock": 98,
                    "sold": 2,
                    "createdAt": "2020-02-26T05:53:33.465Z",
                    "updatedAt": "2020-02-27T02:56:00.945Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 2,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 3,
                    "name": "Converse 101",
                    "description": "Everyone's common shoes, affordable and still trendy",
                    "image_url": "https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?cs=srgb&dl=pair-of-laced-up-black-low-top-sneakers-847371.jpg&fm=jpg",
                    "price": 120000,
                    "stock": 95,
                    "sold": 5,
                    "createdAt": "2020-02-26T05:53:33.465Z",
                    "updatedAt": "2020-02-27T04:09:38.139Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 3,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 4,
                    "name": "Vans Fontro",
                    "description": "Simple yet trendy sneaker for every generation",
                    "image_url": "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "price": 200000,
                    "stock": 99,
                    "sold": 1,
                    "createdAt": "2020-02-26T05:53:33.465Z",
                    "updatedAt": "2020-02-27T00:51:52.304Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 4,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 5,
                    "name": "Nike + Air Jordan Limited Edition",
                    "description": "Limited Edition for Basketball player or enthusiasts",
                    "image_url": "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "price": 1300000,
                    "stock": 48,
                    "sold": 2,
                    "createdAt": "2020-02-26T05:53:33.465Z",
                    "updatedAt": "2020-02-26T19:58:47.452Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 5,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 7,
                    "name": "Red High Heels",
                    "description": "Elegant color for exotic women",
                    "image_url": "https://images.pexels.com/photos/3682292/pexels-photo-3682292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "price": 980000,
                    "stock": 99,
                    "sold": 1,
                    "createdAt": "2020-02-26T05:53:33.465Z",
                    "updatedAt": "2020-02-27T00:51:52.297Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 7,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                },
                {
                    "id": 9,
                    "name": "Cresent Black Boots",
                    "description": "Exotic boots for traveller, especially for women",
                    "image_url": "https://images.pexels.com/photos/1501210/pexels-photo-1501210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "price": 1500000,
                    "stock": 100,
                    "sold": 0,
                    "createdAt": "2020-02-26T05:53:33.465Z",
                    "updatedAt": "2020-02-26T05:53:33.465Z",
                    "CategoryProduct": {
                        "CategoryId": 2,
                        "ProductId": 9,
                        "createdAt": "2020-02-26T05:53:33.479Z",
                        "updatedAt": "2020-02-26T05:53:33.479Z"
                    }
                }
            ]
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "product not found"
    }
    ```

# Cart

**Get All Items from Cart**
----
  Get all available items in the user's cart in which the items are not checked out yet.

* **URL**

  /category

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <user_token>
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "successfully fetch cart data",
      "data": [<items>]
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

**Delete All Items from Cart**
----
  Clear user's cart in which the items are not checked out yet.

* **URL**

  /category

* **Method:**

  `DELETE`
  
*  **URL Params**

  None

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <user_token>
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "successfully delete all item(s)"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

**Add One Item to Cart**
----
  Add one desired product to the cart.

* **URL**

  /category/:productId

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
   `productId=[integer]`

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <user_token>
    ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "successfully added to your cart",
      "data": {<item_cart>}
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

  * **Code:** 403 Forbidden <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "this item has already added to your cart"
  }
  ```

**Delete One Item from Cart**
----
  Remove one item from the cart.

* **URL**

  /category/:cartId

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
   `cartId=[integer]`

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <user_token>
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "successfully deleted from your cart"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

**Change Quantity of One Item in Cart**
----
  Increase or decrease item's quantity in the cart.

* **URL**

  /category/:cartId

* **Method:**

  `PUT`
  
*  **URL Params**

  **Required:**
 
   `cartId=[integer]`

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <user_token>
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "quantity changed"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

**Checkout Items from Cart**
----
  Checkout process for items in the cart.

* **URL**

  /checkout

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  **Required:**

  * **Headers:** <br />
    ```
    access_token: <user_token>
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br>
    ```javascript
    {
      "msg": "Checkout Success"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:** <br>
  ```javascript
  {
    "msg": "login required"
  }
  ```
  OR
  ```javascript
  {
    "msg": "authorized only"
  }
  ```

