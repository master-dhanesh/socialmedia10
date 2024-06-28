Step 1: Create Express Generator boilerplate
Step 2: In package.json/scripts create dev script
Step 3: create .env and .gitignore file
Step 4. install package dotenv mongoose
Step 5: configure .env in app.js 1st line
Step 6. generate .gitignore online node content and paste it
Step 7. create models/database.js folder and file and write the connection code register URI in .env
Step 8. Get the Mongo Uri from mongo atlas connect/mogodb for vscode
Step 9: require the database.js file in app.js
Step 10. Create index.routes.js and user.route.js and require in app.js
Step 11. Create Partials in views and use tailwind cdn
Step 12. create pages according to nav links in index.routes.js
Step 13. create login register and forget ejs page.
Step 14. Create profile.ejs page as well

<!-- PASSPORT JS AUTHENTICATION  -->

Step 15: install npm i --save passport passport-local passport-local-mongoose express-session
Step 16: Configure Passport Boilerplate
i. changes in user.schema.js
ii. changes in app.js
iii. changes in user.routes.js
Step 16: Register User in the database
Step 17: Make Login router with middleware
Step 18: Middleware isLoggedIn in middleware/auth.js for page authentication
Step 19: Logout Functionality

<!-- FOREGT PASSWORD FUNCTIONALITY -->

Step 20: Create "OTP" field in user.schema.js and Create forgetemail.ejs -> /forget-email GET
Step 21: create /user/send-mail/:id POST and call sendmail function
Step 22: To send mail install nodemailer and create utils/sendmail.js file and create boilerplate -> redirect to /verify-otp/:id GET
Step 23: Create forgetOTP.ejs and take the otp and compare with db in user/verify-otp/:id POST and redirect to /login

<!-- INTEGRATING CONTENT DELIVERY SYSTEM -->

STEP 25: Create setting.ejs and /user/setting GET to Update user details and avatar
STEP 26: Create form to upload image in /user/avatar/:id POST
STEP 24: install imagekit and utils/imagekit.js create boilerplate, define all the keys and endpoint-url and export
STEP 25: install express-fileupload and in app.js initialize express-fileupload
STEP 26: in /user/avatar/:id write code to upload image and redirect to /user/settings GET
STEP 27: in /user/avatar/:id we will write the code to save image in database
STEP 28: In Schema change that avatar to {fieldID: String, url: String,thumbnailUrl:String}

STEP 29 create GET /user/delete/:id to delete to delete user and image from the imagekit as well

STEP 30: created /user/update/:id POST to update user details
STEP 31: created reset.ejs page and /user/reset-password/:id GET to show reset.ejs page
STEP 32: create /user/reset-password/:id POST to reset password
