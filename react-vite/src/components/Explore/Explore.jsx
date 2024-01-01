import ExploreProducts from "../Products/ExploreProducts";
import ExploreCollections from "../Collections/ExploreCollections/ExploreCollections";


function Explore() {
    return (
        <div className="explore-wrapper">
            <h1>Products</h1>
            <div className="products-container">
                <ExploreProducts/>
            </div>
            <h1>Collections</h1>
            <div className="collections-container">
                <ExploreCollections/>
            </div>
        </div>
    )
}


export default Explore;
