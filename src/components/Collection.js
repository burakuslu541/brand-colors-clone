import React, { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainContext from '../MainContext';
import Brand from './Brand';
import Download from './Download';
import LazyLoad from 'react-lazyload';
import { GrLinkPrevious } from 'react-icons/gr';
import Loader from './Loader';
const Collection = () => {
  const { slugs } = useParams();
  const history = useNavigate();
  const { setSelectedBrands, selectedBrands, brands } =
    useContext(MainContext);
  const clearSelectedBrands = () => {
    setSelectedBrands([]);
    history('/');
  };
  useEffect(() => {
    setSelectedBrands(slugs.split(','));
  }, []);

  return (
    <main className="content">
      <header className="header">
        <Link
          className="back-link"
          to="/"
          onClick={clearSelectedBrands}
        >
          <a className="back-btn">
            <GrLinkPrevious />
            All brands
          </a>
        </Link>

        {selectedBrands.length !== 0 && <Download />}
      </header>
      <section className="brands">
        {selectedBrands.map((slug) => {
          let brand = brands.find((brand) => brand.slug === slug);

          return (
            <LazyLoad
              key={brand.slug}
              once={true}
              overflow={true}
              placeholder={<Loader />}
            >
              <Brand brand={brand} />
            </LazyLoad>
          );
        })}
      </section>
    </main>
  );
};

export default Collection;
