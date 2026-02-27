import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

// ✅ Global Settings Context — fetches ONCE, shared across entire app
// Footer, FloatingWhatsApp, About, Contact all use this — zero duplicate API calls
const SettingsContext = createContext({
    whatsappNumber: '',
    email: 'contact@alphastrix.in',
    address: 'Tarnaka, Hyderabad,\nTelangana, 500007'
});

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        whatsappNumber: '',
        email: 'contact@alphastrix.in',
        address: 'Tarnaka, Hyderabad,\nTelangana, 500007'
    });

    useEffect(() => {
        API.get('/settings')
            .then(res => { if (res.data) setSettings(res.data); })
            .catch(() => { }); // Fail silently, defaults are shown
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

// Hook for easy access in any component
export const useSettings = () => useContext(SettingsContext);
