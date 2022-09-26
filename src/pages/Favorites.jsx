import Card from '../components/Card/Card'
import { useContext } from "react";
import AppContext from '../context';

const Favorites = ({ addToCart, removeFromeCart }) => {
    const { favorites, addToFavorites } = useContext(AppContext)

    return (
        <div className='contant p-40'>
            <div className='d-flex justify-between align-center mb-40'>
                <h1>My Favorites</h1>
            </div>

            <div className='d-flex flex-wrap'>
                {favorites.map(obj => (
                    <Card
                        {...obj}
                        key={obj.id}
                        elected={true}
                        addToCart={() => addToCart(obj)}
                        addToFavorites={() => addToFavorites(obj)}
                        removeFromeCart={() => removeFromeCart(obj)}
                    />
                ))}
            </div>

        </div>

    )
};

export default Favorites;