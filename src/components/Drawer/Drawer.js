import styles from './Drawer.scss'
import Inform from '../Inform/Inform';
import { useContext, useState } from 'react';
import AppContext from '../../context';
import axios from 'axios';
import { getByDisplayValue } from '@testing-library/react';

const dilay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ hendleCart, inCart, removeFromeCart, opened}) => {

    const [OrderProcessed, setOrderProcessed] = useState(false);
    const {setInCart} = useContext(AppContext);
    const [orderId, setOrderId] = useState(null);
    const [orderLoading, setOrderLoading] = useState(false);

    const totalPrice = inCart.reduce((sum, obj) => sum + obj.price, 0)


    const hendleOrder = async () => {
        try {
            setOrderLoading(true);
            const {data} = await axios.post('https://631989306b4c78d91b3d799c.mockapi.io/orders', {items: inCart});
            setOrderId(data.id)
            setOrderProcessed(true);
            setInCart([]);

            for(let i = 0; i < inCart.length; i++) {
                const item = inCart[i];
                await axios.delete(`https://631989306b4c78d91b3d799c.mockapi.io/sneakers_cart/` + item.id);
                await dilay(1000);
            }
            

        } catch (error) {
            alert('Error')
        }
        setOrderLoading(false);
    }

    return (
        <div className={`overlay ${opened ? 'overlayVisible' : ''}`}>
            <div className='drawer'>
                <h2 className='mb-30 d-flex justify-between '>Your Cart<img onClick={hendleCart} className='cu-p' src='/img/btn-remowe.svg' alt='remove' /></h2>


                {
                    inCart.length > 0 ?

                        <div className='d-flex flex-column flex' >
                            <div className='items'>
                                {inCart.map(obj => (
                                    <div key={obj.id} className='cart-item d-flex align-center mb-20'>
                                        <div className='cartItemImg' style={{ backgroundImage: `url(${obj.img})` }}>
                                        </div>
                                        <div className='mr-20 flex'>
                                            <p className='mb-5'>{obj.name}</p>
                                            <b>{obj.price} UAH</b>
                                        </div>
                                        <img onClick={() => removeFromeCart(obj)} className='removeBtn' src='/img/btn-remowe.svg' alt='remove' />
                                    </div>
                                ))}
                            </div>

                            <div className='cartTotalBlock'>
                                <ul>
                                    <li>
                                        <span>Total:</span>
                                        <div></div>
                                        <b>{totalPrice} UAH</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%:</span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} UAH</b>
                                    </li>
                                </ul>

                                <button disabled={orderLoading} onClick={hendleOrder} className='greenButton'>Checkout <img src='/img/row.svg' /></button>
                            </div>

                        </div>

                        :
                        <Inform 
                            title={OrderProcessed ? 'Order is processed' : 'Cart is empty'}
                            image={OrderProcessed ? 'order-is-processed.jpg' : '/img/empty_cart.jpg'}
                            discription={OrderProcessed ? `Your order #${orderId} will handed over to the delivery service soon` : 'Add a product'}/>
                        
                }








            </div>
        </div>
    )
}

export default Drawer;