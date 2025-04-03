# create server folder 
## and terminal commands

```
cd server
npm init
npm i express cors mongoose jsonwebtoken bcryptjs cookie-parser dotenv morgan helmet
```

# cloudinary for image uploading
```
npm i cloudinary
```

# Create APIs for User
```
1. Register user API
2. Verify email API
3. Login user API
4. Logout API
5. Upload avatar API
6. Update user details API
7. Forgot password API
8. Verify forgot password OTP
9. Reset password API
10. Refresh token API
```

# MEAN Stack Server Folder Structure and API Organization

## Server Folder Structure
```
server/ 
├── config/ 
│   ├── connectDB.js 
│   └── sendEmail.js
|
├── controllers/ 
│   ├── user.controller.js 
│  
├── middleware/ 
│ ├── auth.js 
│ └── multer.js
|
├── models/ 
│ └── user.model.js 
|       ......
|
├── node_modules/
|   └── hidden
|
├── routes/ 
│ └── user.route.js 
│
├── utils/ 
│ ├── forgotPasswordTemplate.js
│ ├── generateAccessToken.js
│ ├── generateOtp.js
│ ├── generateRefreshToken.js
| ├── uploadImageCloudinary.js 
│ └── verifyEmailTemplate.js
|
├── .env 
├── .gitignore 
├── index.js
├── package-lock.json 
└── package.json
```


## API Organization

### 1. Register User API

* File: `controllers/user.controller.js`
* Route: `routes/user.routes.js`
* Service: `services/user.service.js`
* Model: `models/user.model.js`
* Description: Handles user registration, creates a new user document in the database.

### 2. Verify Email API

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Verifies the user's email address by sending a verification email.

### 3. Login User API

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Handles user login, authenticates the user and returns a JSON Web Token (JWT).

### 4. Logout API

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Invalidates the user's JWT, logging them out.

### 5. Upload Avatar API

* File: `controllers/user.controller.js`
* Route: `routes/user.routes.js`
* Service: `services/user.service.js`
* Model: `models/user.model.js`
* Description: Handles avatar uploads, updates the user's profile picture.

### 6. Update User Details API

* File: `controllers/user.controller.js`
* Route: `routes/user.routes.js`
* Service: `services/user.service.js`
* Model: `models/user.model.js`
* Description: Updates the user's profile information.

### 7. Forgot Password API

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Sends a password reset email to the user.

### 8. Verify Forgot Password OTP

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Verifies the OTP sent to the user's email.

### 9. Reset Password API

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Resets the user's password.

### 10. Refresh Token API

* File: `controllers/auth.controller.js`
* Route: `routes/auth.routes.js`
* Service: `services/auth.service.js`
* Middleware: `middleware/auth.middleware.js`
* Description: Refreshes the user's JWT, extending their session.

## Utils Folder

* `helpers.js`: contains utility functions used throughout the application, such as string manipulation and error handling.
* `constants.js`: contains application-wide constants, such as API keys and environment variables.

## Models Folder

* `user.model.js`: defines the user document schema and provides methods for interacting with the user collection.

## Middleware Folder

* `auth.middleware.js`: provides authentication middleware functions, such as verifying JWTs and checking user permissions.
* `validation.middleware.js`: provides validation middleware functions, such as checking request body schema and validating user input.

## Why this organization?

* We separate concerns by grouping related APIs into different files (e.g., user-related APIs in `user.controller.js`).
* We use a separate file for authentication-related APIs (`auth.controller.js`) to keep authentication logic separate from user management logic.
* We use a services layer (`services/*.service.js`) to encapsulate business logic and interact with the database.
* We use a models layer (`models/*.model.js`) to define document schemas and provide methods for interacting with the database.
* We use a middleware layer (`middleware/*.middleware.js`) to provide reusable functions for authentication, validation, and other tasks.
* We use a utils folder (`utils/*.js`) to provide utility functions and constants used

#
#
#
#

# ********************************************** #
# Now implement the all APIs in the Frontend 
# ********************************************** #

## install vite
```
npm create vite@latest .
folder name -> client
cd client
npm install
```

# run frontend 
```
npm run dev
```

# we use tailwind css for styling
```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

```
## add some line in tailwind.config.js in content array
```
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
```
## add some css import in index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


# install packages
```
npm i react-router-dom
npm i react-icons --save
npm install react-type-animation
npm i react-hot-toast
npm i axios
npm i sweetalert2
npm install gsap
npm i react-infinite-scroll-component
npm install react-hook-form

```
## change the react-router-dom vesion to 6.26.0
## react icons
## react-type-animation
## react hot toast
## install axios for handle or call api easily
## install sweetalert2 for show alert
## install gsap for animation
## install react infinite scroll component
## install react hook form

## custom hook for mobile version check ./src/hooks/useMobile.js

## add google font
```

@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

font-family: "Poppins", serif;

```


# for depolyment in vercel or any other platform
## for handeling api and database for storing data 
## for help of vercel or any other platform there every time https://localhost:8080/ this part will be change 
## thats why handle this domain we create a folder called common and create file summaryApi.js
```
all api end point are here
```

# for create custom axios for handle api easily
## create folder called utils and create file axios.js

# when user login then show user details tahts we use redux and redux toolkit for maintaining user details
```
npm install @reduxjs/toolkit
npm install react-redux
```
## create folder called redux and create file store.js
## in store.js file
```
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    // reducer mean is a function that accept state and action and return new state
    reducer: {
        // reducers
    }
})
```
## in main.jsx or your entry point file add those lines
```
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

<Provider store={store}>
    ......
    .....
</Provider>
```
## another file create called userSlice.js in redux folder
## for handle user details after login



# reminder recheck verify email template


# Admin Dashboard


# when a new Controller is created, it should be added to the routes file
```
add Controller -----> add path in routes -------> add path or api in summaryApi in frontend
```
## like in controller
```
export const UpdateCategoryController = async (req, res) => {}
```
## like path in routes
```
categoryRouter.put("/update", auth, UpdateCategoryController)
```
## like path in summaryApi
```
updateCategory: {
    url : "/##/####/update",
    method : "put"
}
```
# for react table for frontend
```
npm install @tanstack/react-table
```

# For Payment Gateway
## install stripe in backend
```
npm install --save stripe
```
## install stripe in frontend
```
npm i @stripe/stripe-js
```



# TASK
## A part not understand in this project
```
1. how to handle multiple select and option in form in uploadSubCategory
```











## login user chara error debe seta and admin chara redirect link korte gele j error ta debe
## searchpage X_X
## 



# deployment time
```
create folder called vercel.json in server folder
in vercel.json file

{
    "version": 2,
    "name": "E-Bazar",
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}
```