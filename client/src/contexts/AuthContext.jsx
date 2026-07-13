
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    async function fetchProfile(){

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await api.get("/auth/profile", {
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            });

            setUser(response.data);

        }

        catch (error) {

            console.log(error);

            localStorage.removeItem("token");

            setUser(null);
        }

    } 

    useEffect(() => {
        fetchProfile();
    }, []);
    
    return (
        <AuthContext.Provider   value = {{
            user,
            setUser,
            loading,
            setLoading,
            fetchProfile,
        }}>
            {children}
        </AuthContext.Provider>
    )
}