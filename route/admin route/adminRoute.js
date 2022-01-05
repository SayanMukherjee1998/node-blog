const express = require('express')
const router = express.Router()


//Auth controller admin
const authController = require('../../controller/admin controller/authController')

//Login Admin
const loginController = require('../../controller/admin controller/loginController')
router.get('/admin/login',loginController.login)
router.post('/admin/postLogin',loginController.postLogin)



//index page
const indexController = require('../../controller/admin controller/indexController')
router.get('/admin/dashboard',authController.adminAuth,indexController.index)


//Post page
const postController = require('../../controller/admin controller/postController')
router.get('/admin/post',authController.adminAuth,postController.post)
    //Delete post
        router.get('/deletePost/:p_id',postController.softDelete)
    //Post Status
        // router.get('postStatus/')
//About Page
const aboutController = require('../../controller/admin controller/aboutController')
router.get('/admin/about',authController.adminAuth,aboutController.about)
    //Add About
        router.get('/admin/about/addAbout',aboutController.addAbout)
        router.post('/admin/about/addAbout',aboutController.saveAbout)
    //Edit About
        router.get('/admin/about/edit/:p_id',aboutController.editAbout)
        router.post('/admin/about/update',aboutController.updateAbout)
    //Delete About
        router.get('/admin/about/delete/:p_id',aboutController.softDelete)


//Contact Page
const contactController = require('../../controller/admin controller/contactController')
router.get('/admin/contact',contactController.showData)
    //Delete contact
    router.get('/admin/contact/delete/:c_id',contactController.hardDelete)

//Log out part
const logoutController = require('../../controller/admin controller/logoutController')
router.get('/admin/logout',logoutController.logout)

module.exports = router
