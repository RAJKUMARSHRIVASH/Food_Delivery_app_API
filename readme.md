# Food Delivery App Backend

## Routes of the app are:-

1. **post** `api/user/register` --> This endpoint will allow users to register.
2. **post** `/api/user/login` --> This endpoint will allow users to login. Return JWT token on login.
3. **patch** `/api/user/:id/reset`	-->This endpoint will allow users to reset the password identified by user id, providing the current password and new password in the body.
4. **get** `/api/restaurants` --> 	This endpoint will return a list of all available restaurants.
5. **get** `/api/restaurants/:id` --> 	This endpoint will return the details of a specific restaurant identified by its ID.
6. **get** `/api/restaurants/:id/menu` --> 	This endpoint will return the menu of a specific restaurant identified by its ID.
7. **post** `/api/restaurants/:id/menu` --> 	This endpoint will allow the user to add a new item to a specific restaurants menu identified by it id.
8. **delete** `/api/restaurants/:id/menu/:id` --> 	This endpoint will allow the user to delete a particular menu item identified by its id from a specific restaurant.
9. **post** `/api/orders` --> This endpoint will allow the user to place an order.
10. **GET** `/api/orders/:id` --> This endpoint WILL return the details of a specific order identified by its ID.
11. **patch** `/api/orders/:id` --> This endpoint should allow users to update the status of a specific order identified by its ID.