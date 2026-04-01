import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";

function Cataloge() {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialCategoryId = query.get("categoryId");
  const initialSeasonId = query.get("seasonId");
  const initialSize = query.get("size");

  const [filters, setFilters] = useState({
    categoryIds: [],
    seasonIds: [],
    sizes: [],
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const newFilters = {
      categoryIds: initialCategoryId ? [Number(initialCategoryId)] : [],
      seasonIds: initialSeasonId ? [Number(initialSeasonId)] : [],
      sizes: initialSize ? [initialSize] : [],
    };
    setFilters(newFilters);
  }, [initialCategoryId, initialSeasonId, initialSize]);

  const lockedCategoryIds = initialCategoryId ? [Number(initialCategoryId)] : [];

  return (
    <section>
      <div className="container1">
        <Filters
          filters={filters}
          onChange={setFilters}
          lockedCategoryIds={lockedCategoryIds}
        />

        <main className="catalog1">
          <div className="catalog-header1">
            <h2>Catalog</h2>
            <div className="sort1">
              <label htmlFor="search">Поиск по названию:</label>
              <input
                type="text"
                id="search"
                placeholder="Введите название товара"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ProductList filters={filters} searchQuery={searchQuery} />
        </main>
      </div>
    </section>
  );
}

export default Cataloge;
