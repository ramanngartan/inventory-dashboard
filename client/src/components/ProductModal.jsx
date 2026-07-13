import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function ProductModal({ onClose, onProductCreated, selectedProduct }) {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {

        if (selectedProduct) {
            setName(selectedProduct.name);
            setCategory(selectedProduct.category);
            setPrice(selectedProduct.price);
            setStock(selectedProduct.stock);
        } else {
            setName("");
            setCategory("");
            setPrice("");
            setStock("");
        }

    }, [selectedProduct])


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            
            let response;

            if (selectedProduct) {
                response = await api.patch(
                    `/products/${selectedProduct._id}`,
                    {
                        name,
                        category,
                        price : Number(price),
                        stock: Number(stock)
                    }
                );
            } else {

                response = await api.post(
                    "/products",
                    {
                        name,
                        category,
                        price : Number(price),
                        stock: Number(stock)
                    }
                );
            }

            onProductCreated();
            onClose();
        }

        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

                <h2 className="text-2xl font-bold text-slate-800">
                    {selectedProduct ? "Edit Product" : "Add Product"}
                </h2>

                <p className="text-slate-500 mt-1">
                    {selectedProduct
                        ? "Update the product information."
                        : "Fill in the product information."
                    }
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex justify-end gap-4 mt-8">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            {selectedProduct
                                ? "Update"
                                : "Create"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}