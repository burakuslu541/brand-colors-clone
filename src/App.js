import Content from './components/Content';
import Sidebar from './components/Sidebar';
import MainContext from './MainContext';
import { useEffect, useState } from 'react';
import BrandsData from './brands.json';
import Copied from './components/Copied';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Collection from './components/Collection';
import { forceCheck } from 'react-lazyload';
function App() {
  const brandsArray = [];
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  Object.keys(BrandsData).forEach((key) => {
    brandsArray.push(BrandsData[key]);
  });
  const [brands, setBrands] = useState(brandsArray);
  const data = {
    brands,
    setSelectedBrands,
    selectedBrands,
    setCopied,
    search,
    setSearch,
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  useEffect(() => {
    if (search) {
      const filteredBrands = brandsArray.filter((brand) =>
        brand.title.toLowerCase().includes(search.toLowerCase())
      );
      setBrands(filteredBrands);
    } else {
      setBrands(brandsArray);
    }
  }, [search, brandsArray]);
  useEffect(() => {
    forceCheck();
  }, [brands]);
  return (
    <>
      <MainContext.Provider value={data}>
        {copied && <Copied color={copied} />}

        <Sidebar />
        <Router>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route
              path="/collection/:slugs"
              element={<Collection />}
            />
          </Routes>
        </Router>
      </MainContext.Provider>
    </>
  );
}

export default App;
