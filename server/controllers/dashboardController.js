
import Product from "../models/Product.js";

export async function getStats(req, res) {

    try {

        const totalProducts = await Product.countDocuments();

        const products = await Product.find();

        const totalStock = products.reduce(
            (sum, product) => sum + product.stock,
            0
        );

        const totalValue = products.reduce(
            (sum, product) =>
                sum + product.price * product.stock,
            0
        );

        const totalCategories = new Set(
            products.map((product) => product.category)
        ).size;

        const productsByCategory = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const formattedCategories = productsByCategory.map((item) => ({
            category: item._id,
            count: item.count,
        }));

        console.log(formattedCategories);

        res.json({
            totalProducts,
            totalStock,
            totalValue,
            totalCategories,
            productsByCategory: formattedCategories,
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json("Internal Server Error");

    }

}