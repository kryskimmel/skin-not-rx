import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../../../utils/OpenModalButton";
import { useModal } from "../../../../context/Modal";
import CurrentCollectionModal from "../CurrentCollectionModal";
import { getCurrUserCollections } from "../../../../redux/collection";
import { Icon } from "@iconify/react";
import "./SearchCollectionsModal.css";


function SearchCollectionsModal () {
    const [searchInput, setSearchInput] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [collectionId, setCollectionId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const userCollections = useSelector(state => state.collections.allCollections);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getCurrUserCollections());
    }, [dispatch]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setShowDropdown(true);
    };

    const collectionList = useMemo(() => {
        const collectionList = [];
        for (let collection in userCollections) {
            collectionList.push({
                id: userCollections[collection].id,
                name: userCollections[collection].name,
                products: userCollections[collection].Products
            });
        }
        return collectionList;
    }, [userCollections]);

    // const logSearchTerm = (searchTerm) => {
    //     setSearchInput(searchTerm.name);
    //     setCollectionId(searchTerm.id);
    //     setSearchInput("");
    //     setCollectionId(null);
    // };

    useEffect(() => {
        collectionList.filter(
            (collection) => (
                collection.name.toLowerCase() === searchInput.toLowerCase()) &&
                setCollectionId(collection.id)
        );
        setShowDropdown(true);
    }, [collectionList, searchInput]);

    const handleClickOutside = (e) => {
        const searchBar = document.querySelector(".search-bar-div");
        const dropdown = document.querySelector(".search-coll-dropdown-row");
        if (
            searchBar &&
            !searchBar.contains(e.target) &&
            dropdown &&
            !dropdown.contains(e.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="search-bar-container">
            <div className="search-bar-close-modal-div" onClick={()=> closeModal()}>
                <Icon 
                    icon="material-symbols-light:close" 
                    width="25" 
                    height="25" 
                    color="white"
                />
            </div>
            <div className="search-bar-div">
                <input
                    type="text"
                    placeholder="Type in a collection name..."
                    value={searchInput}
                    onChange={handleInputChange}
                    className="search-bar-input"
                />
                <div
                    className="search-bar-dropdown"
                    style={{
                        display: showDropdown ? "" : "none",
                    }}
                >
                    {collectionList
                        .filter((collection) => {
                            const searchTerm = searchInput.toLowerCase();
                            const collectionName = collection.name.toLowerCase();
                            return searchTerm && collectionName.startsWith(searchTerm);
                        })
                        .map((collection) => (
                            <div key={`search-collection-${collection.id}`}>
                            <OpenModalButton
                                buttonText={
                                    <div className="search-coll-dropdown-row">
                                        <div className="search-result-collname-div">
                                            <p className="search-result-collname">{collection.name}</p>
                                        </div>
                                        <div className="search-result-coll-imgs-div">
                                            {collection.products?.slice(0, 4)?.map((attr, idx) => (
                                                <img
                                                    key={`faveColl-${attr.preview_image}-${idx}`}
                                                    src={attr.preview_image} 
                                                    alt={attr.product_name} 
                                                    title={attr.product_name} 
                                                    className="search-fave-coll-tile-img" 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                }
                                modalComponent={<CurrentCollectionModal  collectionName={collection.name} items={collection.products} collectionId={collection.id} />}
                                onButtonClick={() => { setSearchInput(""); }}
                            />
                            </div>
                        ))}
                </div>
            </div >
        </div>
    )
}

export default SearchCollectionsModal;