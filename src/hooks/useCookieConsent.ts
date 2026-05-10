import { useState, useEffect } from "react";

export function useCookieConsent() {
    const [show, setShow] = useState(false); // siempre false en SSR

    useEffect(() => {
        // solo corre en el cliente, después de montar
        const saved = localStorage.getItem("recallnest_cookies");
        if (!saved) setShow(true);
    }, []);

    const accept = () => {
        localStorage.setItem("recallnest_cookies", "accepted");
        setShow(false);
    };

    const decline = () => {
        localStorage.setItem("recallnest_cookies", "declined");
        setShow(false);
    };

    return { show, accept, decline };
}