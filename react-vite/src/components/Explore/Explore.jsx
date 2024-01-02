import ExploreProducts from "../Products/ExploreProducts";
import ExploreCollections from "../Collections/ExploreCollections/ExploreCollections";
import "./Explore.css";


function Explore() {
    return (
        <div className="explore-wrapper">
            <h1>PRODUCTS</h1>
            <div className="products-container">
                <ExploreProducts/>
            </div>
            <h1>COLLECTIONS</h1>
            <div className="collections-container">
                <ExploreCollections/>
            </div>
        </div>
    )
}


export default Explore;
