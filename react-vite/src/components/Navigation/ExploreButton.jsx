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


    return (
        <>
            <button className="explore-button" onClick={toggleMenu}>
                EXPLORE
            </button>
            {showMenu && (
                <ul className="explore-dropdown" ref={exploreRef}>
                    <li>
                      <NavLink to="/products/explore" style={{ textDecoration: 'none', color: '#000000' }}>PRODUCTS</NavLink>
                    </li>
                    <li>
                    <NavLink to="/collections/explore" style={{ textDecoration: 'none', color: '#000000' }}>COLLECTIONS</NavLink>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ExploreButton;
