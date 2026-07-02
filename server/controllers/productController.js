import Product from "../models/Product.js";


export async function createProduct(req, res) {

    const product = await Product.create(req.body)
    
    res.json(product);

}


export async function getProducts(req, res) {

    const products = await Product.find();

    res.json(products);

}


export async function updateProduct(req, res) {

    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(id, req.body, { new : true })

    res.json(product);

}


export async function deleteProduct(req, res) {

    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    res.json(product);

}