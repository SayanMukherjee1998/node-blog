const path = require('path')
const express = require('express')
const router = express.Router()





//Index Page
const homeController = require('../controller/homeController')

router.get('/',homeController.home)
router.get('/viewPost/:slug',homeController.viewPost)

//Contact Page
const contactController = require('../controller/contactController')

router.get('/contact',contactController.contact)
router.post('/contact',contactController.contactDetails)

//About Page
const aboutController = require('../controller/aboutController')

router.get('/about',aboutController.about)

//Auth controller
const authController = require('../controller/authController')


//Sample Post Page
const postController = require('../controller/postController')
router.get('/post',authController.userAuth,postController.post)
router.post('/addPost',postController.addPost)



//Register page
const regController = require('../controller/regController')

router.get('/register',regController.register)
router.post('/postRegister',regController.postRegister)


//Login Part
const loginontroller = require('../controller/loginController')

router.get('/login',loginontroller.login)
router.post('/postLogin',loginontroller.postLogin)


//Log out part
const logoutController = require('../controller/logoutController')
router.get('/logout',logoutController.logout)

module.exports = router