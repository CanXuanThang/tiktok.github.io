import { useEffect, useState, createContext } from 'react';
import { auth } from '~/firebase/firebase';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubribed = auth.onAuthStateChanged((user) => {
            console.log({ user });
            if (user) {
                const { displayName, email, uid, photoURL } = user._delegate;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                return;
            }
        });

        return () => {
            unsubribed();
        };
    });

    return <AuthContext.Provider value={{ user }}></AuthContext.Provider>;
}

export default AuthProvider;
