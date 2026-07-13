

export default function DeleteModal({
    onClose,
    onConfirm,
    productName,
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <h2 className="text-2xl font-bold text-slate-800">
                    Delete Product
                </h2>

                <p className="text-slate-500 mt-4">
                    Are you sure you want to delete
                    <span className="font-semibold text-slate-800">
                        {" "}{productName}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}