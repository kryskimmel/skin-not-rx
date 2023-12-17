import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";


function ExploreButton() {
    const [showMenu, setShowMenu] = useState(false);
    const exploreRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (exploreRef.current && !exploreRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <p onClick={toggleMenu}>
                Explore
            </p>
            {showMenu && (
                <ul className="explore-dropdown" ref={exploreRef}>
                    <li>
                      <NavLink to="/products/explore">PRODUCTS</NavLink>
                    </li>
                    <li>
                      COLLECTIONS
                    </li>
                </ul>
            )}
        </>
    )
}

export default ExploreButton;
