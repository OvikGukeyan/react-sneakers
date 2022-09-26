import styles from './Card.scss';
import { useState, useContext } from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

const Card = ({ id, price, name, img, addToCart, addToFavorites, elected, loading }) => {
    const [favorite, setFavorite] = useState(elected);
    const {itemIsAdded} = useContext(AppContext);

    const hendleAddClick = () => {
        addToCart();
    }

    const hendleOnFavorite = () => {
        setFavorite(!favorite);
        addToFavorites();
    }

    return (
        <div className='card'>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="120" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="162" rx="5" ry="5" width="80" height="25" />
                    <rect x="118" y="155" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> :
                    <>
                        <div className='favorite'>
                            {addToFavorites && <img onClick={hendleOnFavorite} alt='favorite' src={favorite ? 'img/heart-liked.svg' : 'img/heart-unliked.svg'}></img>}
                        </div>
                        <img height={112} width={133} src={img} />
                        <h5>{name}</h5>
                        <div className='d-flex justify-between align-center'>
                            <div className='d-flex flex-column'>
                                <span>Price:</span>
                                <b> {price} UAH</b>
                            </div>
                            {addToCart && <img onClick={hendleAddClick} className='cu-p' alt='plus' src={itemIsAdded(id) ? 'img/btn-cheked.svg' : 'img/btn-plus.svg'} />}
                        </div>
                    </>
            }

        </div>
    )
}

export default Card;