import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigateTo = useNavigate();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else if (!user && !isAuthenticated) {
            setIsAuthenticated(false);
            navigateTo('/');
        }
    }, [user, isAuthenticated, navigateTo]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);