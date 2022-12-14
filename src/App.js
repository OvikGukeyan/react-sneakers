import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState('');
  const [inCart, setInCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    async function fetchData() {

      try {
        const [cartResp, favoritesResp, stockResp] = await Promise.all([
          axios.get('https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_cart'),
          axios.get('https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_favorites'),
          axios.get('https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers')
        ])
       

        setIsLoading(false);

        setInCart(cartResp.data);
        setFavorites(favoritesResp.data);
        setStock(stockResp.data);
      } catch (error) {
        alert('error');
        console.error(error);
      }

    }

    fetchData();

  }, []);

  const addToFavorites = async (obj) => {
    try {
      const findItem = favorites.find(item => Number(item.perentId) === Number(obj.id))
      if (findItem) {
        setFavorites(prev => prev.filter(item => Number(item.perentId) !== Number(obj.id)))
        await axios.delete(`https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_favorites/${findItem.id}`)
      } else {
        setFavorites([...favorites, obj]);
        const { data } = await axios.post('https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_favorites', obj)
        setFavorites((prev) => prev.map(item => {
          if(item.perentId === obj.perentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))
      }

    } catch (error) {
      alert('Error')
      console.error(error);
    }
  }



  const addToCart = async (obj) => {
    try {
      const findItem = inCart.find(item => Number(item.perentId) === Number(obj.perentId))
      if (findItem) {
        setInCart(prev => prev.filter(item => Number(item.perentId) !== Number(obj.perentId)))
        await axios.delete(`https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_cart/${findItem.id}`)
      } else {
        setInCart([...inCart, obj]);
        const {data} = await axios.post('https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_cart', obj);
        setInCart((prev) => prev.map(item => {
          if(item.perentId === obj.perentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))
      }
    } catch (error) {
      alert('error in addToCart');
      console.error(error);
    }


  }




  const removeFromeCart = (obj) => {
    axios.delete(`https://6364d85c7b209ece0f4fcc02.mockapi.io/sneakers_cart/${obj.id}`)
    setInCart(prev => prev.filter((unit) => unit.id !== obj.id));

  }

  const hendleCart = () => {
    setOpenCart(!openCart)
  }

  const itemIsElected = (id) => {
    return favorites.some(item => Number(item.perentId) === Number(id))
  }

  const itemIsAdded = (id) => {

    return inCart.some(item => Number(item.perentId) === Number(id))
  }
  return (
    <AppContext.Provider value={{ stock, inCart, favorites, itemIsAdded, addToFavorites, hendleCart, setInCart, itemIsElected }}>
      <div className="wrapper clear">
        <Drawer
          inCart={inCart}
          hendleCart={hendleCart}
          removeFromeCart={removeFromeCart}
          opened={openCart}
        />
        <Header hendleCart={hendleCart} />

        <Routes>
          <Route
            element={<Home
              inCart={inCart}
              stock={stock}
              search={search}
              setSearch={setSearch}
              addToFavorites={addToFavorites}
              addToCart={addToCart}
              removeFromeCart={removeFromeCart}
              isLoading={isLoading}
            />}
            path=''
          />
          <Route
            path='orders'
            element={<Orders />}
          />
          <Route path='favorites'
            element={<Favorites
              addToFavorites={addToFavorites}
              addToCart={addToCart}
              removeFromeCart={removeFromeCart}
            />} />
        </Routes>






      </div>
    </AppContext.Provider>
  );
}

export default App;
