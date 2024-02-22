import { useEffect } from "react";

const charCountRemaining = (inputField, maxChar, ref) => {
    const charLeft = maxChar - inputField.length;

    useEffect(() => {
        const trackKeyPress = (e) => {
            // If statement below will prevent user from typing more than the max char limit but allow backspacing
            if (charLeft <= 0 && e.key !== 'Backspace') {
                e.preventDefault();
            }
        };
        if (ref && ref.current) ref.current.addEventListener('keydown', trackKeyPress);
        return () => {
            if (ref && ref.current) {
                ref.current.removeEventListener('keydown', trackKeyPress);
            }
        };
    }, [charLeft, ref]);
    return charLeft;
};

export default charCountRemaining;
