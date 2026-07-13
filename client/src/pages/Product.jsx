
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable.jsx";

import api from "../services/api.js";
import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal.jsx";
import DeleteModal from "../components/DeleteModal.jsx";



export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);


    async function fetchProducts() {

        setLoading(true);
        
        try {

            const response = await api.get("/products");

            setProducts(response.data);

            setLoading(false);

        }

        catch (err) {
            console.log(err);
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleDelete() {
        
        try {

            await api.delete(
                `/products/${selectedProduct._id}`
            )

            await fetchProducts();

            setIsDeleteModalOpen(false);
            setSelectedProduct(null);

        }

        catch (err) {
            console.log(err);
        }
    }

    return (
        <DashboardLayout>

            <main className="flex-1 p-10 bg-slate-100">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Products
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Manage your inventory.
                        </p>

                    </div>

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                        onClick={() => {
                            setIsModalOpen(true),
                            setSelectedProduct(null)
                        }}
                    >
                        + Add Product
                    </button>

                    

                </div>

                {loading ? (

                    <div className="mt-8 text-slate-500">
                        Loading products...
                    </div>

                ) : (

                    <DataTable
                        columns={[
                            "Product",
                            "Category",
                            "Stock",
                            "Price",
                            "Actions",
                        ]}
                    >
                        {products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="text-center py-12 text-slate-500"
                                >
                                    No products found.
                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-5 font-medium text-slate-800">
                                        {product.name}
                                    </td>

                                    <td className="px-6 py-5">
                                        {product.category}
                                    </td>

                                    <td className="px-6 py-5">
                                        {product.stock}
                                    </td>

                                    <td className="px-6 py-5">
                                        ${product.price}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex gap-3">

                                            <button 
                                                className="text-blue-600 hover:text-blue-700"
                                                onClick={() => {
                                                    setSelectedProduct(product),
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button 
                                                className="text-red-600 hover:text-red-700"
                                                onClick={() => {
                                                    setSelectedProduct(product),
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                        

                    </DataTable>

                )}

                {isModalOpen && (
                    <ProductModal
                        selectedProduct={selectedProduct}
                        onClose={() => setIsModalOpen(false)}
                        onProductCreated={fetchProducts}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteModal
                        productName={selectedProduct?.name}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDelete}
                    />
                )}

            </main>

        </DashboardLayout>
    );
}