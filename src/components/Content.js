import Search from './Search';
import Brand from './Brand';
import MainContext from '../MainContext';
import { useContext } from 'react';
import Download from './Download';
import Loader from './Loader';
import { AutoSizer, List } from 'react-virtualized';

const Content = () => {
  const { brands, selectedBrands } = useContext(MainContext);

  return (
    <main className="content">
      <header className="header">
        <Search />
        {selectedBrands.length !== 0 && <Download />}
      </header>
      <section className="brands">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={brands.length}
              rowHeight={113}
              rowRenderer={({ index, key, style, isScrolling }) => {
                const content = isScrolling ? (
                  <Loader />
                ) : (
                  <Brand brand={brands[index]} />
                );
                return (
                  <div key={key} style={style}>
                    {content}
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </section>
    </main>
  );
};
export default Content;
