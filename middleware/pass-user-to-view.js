//request, response, next
//next is a function that passes the request
//to the next middlware function or controller
//function in the middleware chain

function passUserToView(req, res, next){

    if(req.session.user){
        res.locals.user = req.session.user
    } else {
        res.locals.user = null
    }
    next()

    //option one line for the if statement
    // res.locals.user = req.session.user ? req.session.user : null
    //next
}

module.exports = passUserToView