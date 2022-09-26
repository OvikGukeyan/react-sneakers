import { useContext } from "react";
import AppContext from "../../context";


const Inform = ({title, discription, image}) => {
    const {hendleCart} = useContext(AppContext)

    return (
        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
            <img className='mb-20' width={120}  src={image} alt='empty-cart' />
            <h2>{title}</h2>
            <p className='opacity-6'>{discription}</p>
            <button onClick={hendleCart} className='greenButton'><img src='img/row.svg' /> Back </button>
        </div>

    )
}

export default Inform;