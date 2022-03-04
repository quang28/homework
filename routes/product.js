const Product = require('../models/Product');
const router = require('express').Router();

//create product
router.post("/create-product",async (req,res) => {
    //res.send("Create successfully");
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.render();
    } catch (err) {
      res.status(500).json(err);
    }
    
})

//show products
router.get("/",async (req,res,next) => {
    //res.send("All products");
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err){
        res.status(500).json(err);
    }

})

//update product
router.put('/:id',async (req,res) => {
    const id = req.params.id;
    const newName = req.body.newName;
    const newCategory = req.body.newCategory;
    try {
        if(newName && !newCategory){
            const newProduct = await Product.findByIdAndUpdate(id,{
                name: newName
            })
            res.status(200).send("update successfully case1!");
        }else if(newCategory && !newName){
            const newProduct = await Product.findByIdAndUpdate(id,{
                category: newCategory
            })
            res.status(200).send("update successfully case2!");
        }else if(newCategory && newName){
            const newProduct = await Product.findByIdAndUpdate(id,{
                name: newName,
                category: newCategory
            })
            res.status(200).send("update successfully case3!");
        }
    } catch(err){
        res.status(500).send(err);
    }
})

//delete product
router.delete("/:id",async (req,res) => {
    //res.send("product is deleted");
    const id = req.params.id;
    try{
        const deleteProduct = await Product.deleteOne({
            _id: id
        })
        res.send("delete successfully!")
    }catch{
        res.send("delete unsuccessfully!")
    }
})

module.exports = router;