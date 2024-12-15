import { useState, useEffect } from 'react';

const useColorMode = () => {
    // Retrieve the color mode from local storage or default to 'light'
    const [colorMode, setColorMode] = useState(() => {
        const savedColorMode = localStorage.getItem('colorMode');
        return savedColorMode || 'light';
    });

    // Toggle the color mode between 'light' and 'dark'
    const toggleColorMode = () => {
        const newColorMode = colorMode === 'light' ? 'dark' : 'light';
        setColorMode(newColorMode);
        localStorage.setItem('colorMode', newColorMode); // Save the new color mode to local storage
    };

    // Apply the color mode to the body element
    useEffect(() => {
        document.body.className = colorMode;
    }, [colorMode]);

    return { colorMode, toggleColorMode };
};

export default useColorMode;