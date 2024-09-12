const express = require('express')
const router = express.Router()

// applications is embedded in the user
const UserModel = require('../models/user')


//index route
//purpose: to respond with all of the applications
router.get('/', async function(req, res){
    if(req.session.user){
        try {
            const currentUser = await UserModel.findById(req.session.user._id)
            res.render('applications/index.ejs', {
                applications: currentUser.applications
            })

        } catch(err) {
        console.log(err)
        res.redirect('/')
        }



    } else {
        res.redirect('/')
    }
    //applications would a folder inside of our views
    // res.render('applications/index.ejs')
})
//creat route
//purpose: to take the contents of the form submitted by the client
// and add to the database using our mongoose model

router.post('/', async function(req, res){

    try {
        //lookup the user (req.session.user._id) or we can use req.params.userId
        const currentUser = await UserModel.findById(req.session.user_id)
        // add the applciation (req.body) to the applications array
        currentUser.applications.push(req.body)
        // tell database we changed the user document
        await currentUser.save()
        console.log(currentUser, " <-- currentUser")
        res.redirect(`/users/${currentUser._id}/applications`)

    } catch(err){
        console.log(err, " <- error in post")
        res.render('applications/new.ejs', {errorMessage: 'Please try again later'})
    }
})



// new route
// purpose: to respond with a form to create an application
router.get('/new', function(req, res){
    res.render('applications/new.ejs')
})

module.exports = router;