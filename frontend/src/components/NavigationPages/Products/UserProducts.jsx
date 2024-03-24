import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrUserProducts } from "../../../redux/product";
import OpenModalButton from "../../../utils/OpenModalButton";
import SearchProductsModal from "../../Modals/ProductModals/SearchProductsModal";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import CreateProductModal from "../../Modals/ProductModals/CreateProductModal";
import { Icon } from "@iconify/react";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import "./UserProducts.css";

function UserProducts({isLoadings}) {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.allProducts);
    const[isLoading, setIsLoading] = useState(true);
    console.log('test', isLoadings)

    useEffect(() => {
        dispatch(getCurrUserProducts()).then(() => setIsLoading(false))
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner/>
    } else {
        return (
            <div className="prod-page-container">
                <div className="prod-header-div">
                    <h1 className="prod-heading">PRODUCTS</h1>
                    <p className="prod-count-text">{userProducts.length ? userProducts.length : 0} {userProducts.length === 1 ? "item" : "items"}</p>
                    <div className="prod-heading-btns-div">
                        <OpenModalButton
                            buttonText={
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p>Create A Product</p>
                                </div>}
                            className="prod-create-btn"
                            modalComponent={<CreateProductModal />}
                        />
                        <OpenModalButton
                            buttonText={<Icon icon="fluent:search-20-filled" width={20} height={20}/>}
                            className="prod-search-btn"
                            modalComponent={<SearchProductsModal />}
                        />
                    </div>
                </div>
                <div className="prod-tiles-div">
                    {!userProducts.length ? 
                    (<div className="no-products-div">
                        <p className="no-products-text">You have not added any products!</p>
                    </div>) : 
                    (userProducts.map((attr) => (
                        <div key={`prodtile-${attr.id}-${attr.product_name}`} style={{position:'relative'}}>
                            <OpenModalButton
                                className="prod-tile-btn"
                                buttonText={
                                <>
                                <img src={attr.preview_image} className="prod-tile-img"/>
                                <div>
                                    <ul className="prod-tile-info-ul">
                                        <li style={{ fontWeight: "600" }}>{attr.brand_name}</li>
                                        <li>{attr.product_name}</li>
                                    </ul>
                                </div>
                                </>
                                }
                                modalComponent={<ProductInfoModal productId={attr.id} />}
                            />
                        </div>)))}
                </div>
            </div>        
        )
    }

}

export default UserProducts;