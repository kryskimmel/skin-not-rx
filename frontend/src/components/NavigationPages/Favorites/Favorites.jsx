import FavoriteProducts from "./FavoriteProducts";
import FavoriteCollections from "./FavoriteCollections";
import './Favorites.css'

function Favorites () {
    return (
        <div className="favorites-container">
            <FavoriteProducts/>
            <FavoriteCollections/>
        </div>
    )
}

export default Favorites;