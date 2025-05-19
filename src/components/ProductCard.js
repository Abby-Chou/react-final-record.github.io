import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  console.log(product);
  return (
    <>
      <div className="col" key={product.id}>
        <div className="card border-0 mb-4 h-100 card-special-hover d-flex flex-column">
          <div className="card-img-wrapper position-relative overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.imageUrl[0]}
                className="card-img-top rounded-0 product-card-img"
                alt="..."
              />
              <div className="overlay d-flex justify-content-center align-items-center">
                <span className="text-white fs-5">查看內容</span>
              </div>
            </Link>
          </div>

          <div className="card-body p-2 pb-0 text-center flex-grow-1 mb-n3">
            <h4 className="mt-1 fw-bold mb-0 text-gray fs-s-20">
              {product.title}
            </h4>
            <p className="text-pink fs-s-20 fw-bold mt-1 mb-0">
              NT$ {product.price.toLocaleString()}
            </p>
          </div>
          <div className="card-footer pt-0 border-0 bg-white text-center">
            <button
              type="button"
              className="btn btn-pink w-100 rounded-0"
              onClick={() => {
                addToCart(product?.id);
              }}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
