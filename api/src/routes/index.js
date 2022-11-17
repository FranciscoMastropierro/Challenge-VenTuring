const { Router } = require('express');
const router = Router();

router.use('/', (req, res) =>{
    res.send('Todo ok');
});

module.exports = router;