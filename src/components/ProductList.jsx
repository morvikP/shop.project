import { useEffect, useState } from "react";
import Product from "./Product";
import { a } from "../services/axiosinstance";
import Paginator from "./Paginator";
import { Link } from "react-router-dom";

function ProductList({ filters, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 9;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await a.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (
      filters.categoryIds.length > 0 &&
      !filters.categoryIds.includes(product.categoryId)
    ) return false;

    if (
      filters.seasonIds.length > 0 &&
      !filters.seasonIds.includes(product.seasonId)
    ) return false;

    if (filters.sizes.length > 0) {
      if (!Array.isArray(product.sizes)) return false;

      const hasSize = filters.sizes.some((size) =>
        product.sizes.includes(size)
      );
      if (!hasSize) return false;
    }

    //  фильтрация по названию
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!product.title.toLowerCase().includes(q)) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <>
      <div className="products1">
        {currentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/item/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Product product={product} />
          </Link>
        ))}
      </div>

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page >= 1 && page <= totalPages) setCurrentPage(page);
        }}
      />
    </>
  );
}

export default ProductList;
