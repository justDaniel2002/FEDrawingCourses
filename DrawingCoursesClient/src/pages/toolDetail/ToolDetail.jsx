
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToolDetail = ( product  ) => {
  const [quantity, setQuantity] = useState(1);
  
  const navigate = useNavigate();

  const onAddToCart = async () => {
    const productWithQuantity = {
      ...product,
      quantity,
    };

    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productWithQuantity),
    });

    navigate("/cart");
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-options">
          <span className="product-option">
            <label>Price:</label>
            <span>{product.price}</span>
          </span>
          <span className="product-option">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(parseInt(event.target.value))}
            />
          </span>
        </div>
        <button onClick={onAddToCart} className="product-add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ToolDetail;
