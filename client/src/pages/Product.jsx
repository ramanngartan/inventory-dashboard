
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

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [sortBy, setSortBy] = useState("newest");


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


    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {

        const query = searchTerm.toLowerCase();

        const matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    const sortedProducts = [...filteredProducts];

    switch (sortBy) {

        case "name-asc":
            sortedProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "name-desc":
            sortedProducts.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            break;

        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;

        case "stock-asc":
            sortedProducts.sort((a, b) => a.stock - b.stock);
            break;

        case "stock-desc":
            sortedProducts.sort((a, b) => b.stock - a.stock);
            break;

        case "newest":
            sortedProducts.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;

        case "oldest":
            sortedProducts.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;

        default:
            break;
    }

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];

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
                            setIsModalOpen(true);
                            setSelectedProduct(null);
                        }}
                    >
                        Add Product
                    </button>

                    

                </div>

                <div className="mt-8 mb-6 flex gap-4">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        {categories.map((category) => (

                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>

                        ))}

                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="newest">Newest</option>

                        <option value="oldest">Oldest</option>

                        <option value="name-asc">Name (A-Z)</option>

                        <option value="name-desc">Name (Z-A)</option>

                        <option value="price-asc">Price (Low → High)</option>

                        <option value="price-desc">Price (High → Low)</option>

                        <option value="stock-asc">Stock (Low → High)</option>

                        <option value="stock-desc">Stock (High → Low)</option>

                    </select>

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
                        {filteredProducts.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="text-center py-12 text-slate-500"
                                >
                                    No products found.
                                </td>

                            </tr>

                        ) : (

                            sortedProducts.map((product) => (

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
                                                    setSelectedProduct(product);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button 
                                                className="text-red-600 hover:text-red-700"
                                                onClick={() => {
                                                    setSelectedProduct(product);
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