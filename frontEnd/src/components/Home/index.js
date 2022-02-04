import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import {AiFillCloseCircle} from "react-icons/ai"
import "./style.css";

export default function Home({ token }) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      const products = await axios.get("http://localhost:5000/products");
      setProducts(products.data);
    };
    getProducts();
  }, []);

  const showProduct = (element)=>{
      if(token){
          setProduct(element);
          setToggle(true);
      }else{
          Navigate("/login");
      }
  }

  const closeModel = ()=>{
      setToggle(false)
  }

  const changeDate = (e)=>{
      setDate(new Date(e.target.value + "T13:00"));
  }

  const reserve = async ()=>{
      try {
        if(date){
          const booking = await axios.post(
            `http://localhost:5000/booking/${product._id}`,
            {date:date},
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          console.log(booking.data);
        }else{
          setErrorMessage("You must enter a valid date first")
        }
      } catch (error) {
          
      }
  }

  return (
    <>
      {toggle ? (
        <div className="product-model">
          <AiFillCloseCircle
            className="product-model-close-icon"
            onClick={closeModel}
          />
          <p className="product-model-name">{product.name}</p>
          <div className="product-model-container">
            <div className="product-model-img">
              <img src={product.image} alt="product" />
            </div>
            <div className="product-model-info">
              <div className="product-model-description">
                <p>{product.description}</p>
              </div>
              <div>
                <input type="date" onChange={changeDate} />
                <button onClick={reserve}>reserve</button>
              </div>
              {errorMessage}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="cards">
        {products.map((element) => {
          return (
            <div className="card" key={element._id}>
              <div
                className="card-img"
                onClick={() => {
                  showProduct(element);
                }}
              >
                <img src={element.image} alt="card img" />
              </div>
              <p className="card-name">{element.name}</p>
              <div className="card-info">
                <p className="card-price">$ {element.price} JOD</p>
                <p
                  className="card-more"
                  onClick={() => {
                    showProduct(element);
                  }}
                >
                  Show More
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
