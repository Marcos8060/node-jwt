const router = require("express").Router();
const privateRoute = require('../privateRoute')


router.get('/',privateRoute,( req,res) => {
    res.json({
        posts:{
            title: 'My blog post',
            description: 'My blog post description'
        }
    })
})


module.exports = router;
