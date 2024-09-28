import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI } from '../apis/user.api';

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
    login: any;
    logout: () => void;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => { },
    login: () => { },
    logout: () => { },
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(() => !!localStorage.getItem('token'));
    const navigate = useNavigate();
    
    const login = async (form : any) => {
        try {
            const result = await userAPI.login(form)

            if (result?.data?.statusCode === 1) {
                setAuthenticated(true);
                toast.success(`${result?.data?.message}`)
                localStorage.setItem('token', result?.data?.token )
                navigate('/');
            }

        } catch (error: any) {
            console.log(error);
            toast.error(`${error?.response?.data?.message}`)
        }
    }

    const logout = () => {
    }

   

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
