# E-commerce 

E-commerce is my side project based on real-world business challenges. The idea was to create a website that allows clients to buy products, while providing workers with an easy-to-use interface to add products and other information about cars and co-workers to the system.

## Tech Stack
**Server**: Spring Boot, Spring Security, Spring JPA

**Client**: React, Redux Toolkit, React-Bootstrap

**Other**: PostgreSQL

## Functionalities
* Users can register an account
* Users can log in 
* Users can buy items and pay for them with PayPal/Przelewy24
* Users can manage their cart
* Users can change their password
* Users can view a list of all orders and their status
* Moderators/Admins can add new items via the management interface
* Moderators/Admins can add new co-workers and resources, including car information, via the management interface
* Moderators/Admins can view a list of all user orders
* Moderators/Admins can add new events to the calendar for better order and transport management 
* Moderators/Admins receive notifications when insurances or employees' contracts are about to end

## Screenshots
Here are a couple of screenshots of the user interface:

* Users can view a list of items to buy 
![](https://i.imgur.com/IwEtEdk.png)

* Users can see details of each item
![](https://i.imgur.com/V2oJe2c.png)

* Users can manipulate the quantity of items they buy and delete them in the cart page
![](https://i.imgur.com/l02NaIB.png)

* Admin/Moderator has access to the management interface, where they can add new products, cars, and workers to the database. Events can also be created in the scheduler.
![](https://i.imgur.com/4nD048Q.png)

* Admin/Moderator creates new items to sell via a form in the management interface
![](https://i.imgur.com/Hh1gVDy.png)

* Admin/Moderator can add new co-workers and car information in the management interface
![](https://i.imgur.com/yC57X8B.png)

## TODO
In the current version, the application is functional, but there are some issues that need to be addressed in the next version:

* Improve responsiveness for better adaptability across different devices
