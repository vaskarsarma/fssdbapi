const express= require('express');

const router= express.Router();

router.get('/add',(req,res,next) =>{
    res.send('<form action="/airline" method="POST"><button type="submit">Save Airline Details</button></form>');
});

router.post('/savedata', (req, res) => {
    console.log("Save airline Details!");
    res.redirect('/');
});

module.exports=router;