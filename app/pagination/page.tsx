'use client';
import { useEffect, useState } from 'react';

interface ProductT {
  id: number;
  title: string;
  images: string[];
}

const LIMIT = 8;

const Page = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<ProductT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAll = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    setProducts(data.products);
  };

  const PaginateFn = (page: number) => {
    setCurrentPage(page);
    const start = (page - 1) * LIMIT;
    const end = Math.min(start + LIMIT, products.length);
    setPaginatedProducts(products.slice(start, end));
  };

  const totalPages = Math.ceil(products.length / LIMIT);

  const handlePrev = () => {
    if (currentPage > 1) {
      PaginateFn(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      PaginateFn(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      PaginateFn(1);
    }
  }, [products]);

  return (
    <div className="flex flex-col h-screen w-screen p-5 items-center gap-5">
      <h1 className="text-2xl font-bold">Pagination</h1>
      <div className="grid grid-cols-4 gap-3">
        {products.length === 0 ? (
          <div className="col-span-4 text-center">Loading...</div>
        ) : (
          paginatedProducts.map((product) => {
            return <Product key={product.id} product={product} />;
          })
        )}
      </div>

      {products.length > 0 && (
        <div className="flex flex-row gap-3 items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => PaginateFn(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;

const Product = ({ product }: { product: ProductT }) => {
  return (
    <div className="flex flex-col gap-2 border border-black items-center justify-center p-3">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-40 h-40 object-cover"
      />
      <div className="text-center text-sm">{product.title}</div>
    </div>
  );
};
