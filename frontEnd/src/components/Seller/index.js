import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct"
import ProductInfo from "./ProductInfo";
import "./style.css";

export default function Seller({ token }) {
  const [product, setProduct] = useState("");
  

  useEffect(() => {
    const getSellerProduct = async () => {
      try {
        const product = await axios.get("http://localhost:5000/product", {
          headers: { authorization: `Bearer ${token}` },
        });
        setProduct(product.data);
      } catch (error) {}
    };
    if (token) {
      getSellerProduct();
    }
  }, [token]);

  

  return (
    <div>
      {product === null ? (
        <AddProduct token={token} setProduct={setProduct} />
      ) : (
        <ProductInfo token={token} product={product} />
      )}
    </div>
  );
}
