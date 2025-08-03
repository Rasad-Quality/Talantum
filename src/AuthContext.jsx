import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

            if (firebaseUser) {
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || firebaseUser.email,
                };
                
                try {
                    const userKey = `user_profile_${firebaseUser.uid}`;
                    const savedProfile = localStorage.getItem(userKey);
                    if (savedProfile) {
                        const profileData = JSON.parse(savedProfile);
                        userData.username = profileData.username;
                        userData.description = profileData.description;
                        userData.skills = profileData.skills;
                    }
                } catch (error) {
                    console.error('Error loading saved profile:', error);
                }
                
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateUser = (userData) => {
         setUser(prevUser => ({ ...prevUser, ...userData }));
    };

    const logout = () => {
        const auth = getAuth();
        signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, logout, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
