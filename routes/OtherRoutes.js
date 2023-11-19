const express = require("express"); 
const router = express.Router();

const {getAllItems,getItem,PostNewItem,addPicture}= require("../controllers/Item");

router.post("/getitems",getAllItems); 
router.post("/getitem",getItem);
router.post("/additem",PostNewItem);
router.put("/addimg",addPicture);
module.exports = router;
