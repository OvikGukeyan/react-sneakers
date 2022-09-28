import Card from '../components/Card/Card';



const Home = ({stock, search, setSearch, addToFavorites, removeFromeFavorites, addToCart, removeFromeCart, isLoading}) => {

    const renderStock = () => {
        const filterStock = stock.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()));
        return (isLoading ? [...Array(12)] : filterStock)
        .map((obj, ind) => (
            <Card
                {...obj}
                key={ind}
                addToCart={() => addToCart(obj)}
                addToFavorites={() => addToFavorites(obj)}
                removeFromeFavorites={() => removeFromeFavorites(obj)}
                removeFromeCart={() => removeFromeCart(obj)}
                loading={isLoading}
            />
        ))
    }

    return (
        <div className='contant p-40'>
            <div className='d-flex justify-between align-center mb-40'>
                <h1>{search ? `Find '${search}'` : 'All Sneakers'} </h1>
                <div className='search-block d-flex'>
                    <img src='img/search.svg' alt='search' />
                    {search && <img onClick={() => setSearch('')} className='clear ' src='img/btn-remowe.svg' alt='remove' />}
                    <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search ...' />
                </div>
            </div>


            <div className='sneakers-wraper'>
                {renderStock()}
            </div>
        </div>
    )
};

export default Home;