import { useEffect, useState } from 'react';
import Card from '../components/Card/Card'
import axios from 'axios';


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('https://6364d85c7b209ece0f4fcc02.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('error');
                console.error(error);
            }

        }
        fetchData();
    }, [])


    return (
        <div className='contant p-40'>
            <div className='d-flex justify-between align-center mb-40'>
                <h1>My Orders</h1>
            </div>

            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(12)] : orders).map((obj, ind) => (
                    <Card
                        {...obj}
                        key={ind}
                        loading={isLoading}
                    />
                ))}
            </div>

        </div>

    )
};

export default Orders;