

export default function DataTable({ columns, children }) {

    

    return (
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>

                        {columns.map((column) => (
                            <th
                                key={column}
                                className="text-left px-6 py-4 text-sm font-semibold text-slate-600"
                            >
                                {column}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>

        </div>
    );
}