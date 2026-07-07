
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";


const DashboardLayout = ({children}) => {

    return (
        <>
            <div className="flex h-screen">

                <Sidebar />

                <div className="flex-1 flex flex-col">

                    <Navbar />

                    <main className="flex-1">
                        {children}
                    </main>

                </div>

            </div>
        </>
    )
}

export default DashboardLayout;