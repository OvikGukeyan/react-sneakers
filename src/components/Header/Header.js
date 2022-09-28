import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context';



const Header = ({ hendleCart }) => {

    const {inCart} = useContext(AppContext);
    const totalPrice = inCart.reduce((sum, obj) => sum + obj.price, 0)

    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to='/'>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src='img/logo.png' />
                    <div >
                        <h3 className='text-uppercase'>React Sneakers</h3>
                        <p className='opacity-5'>Best Sneakers Shop</p>
                    </div>
                </div>
            </Link>
            <ul className='d-flex'>
                <li onClick={hendleCart} className='mr-30'><img width={18} height={18} src='img/cart.svg' alt='cart' /><span>{totalPrice} UAH</span></li>
                <Link to='/favorites'><li className='mr-20'><img width={18} height={18} src='img/favorite.svg' alt='favorites' /></li></Link>
                <Link to='/orders'><img width={18} height={18} src='img/user.svg' alt='user' /></Link>
            </ul>
        </header>
    )
}

export default Header;