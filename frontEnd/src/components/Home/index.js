import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import "./style.css";

let allProductsData = [];
export default function Home({ token }) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Navigate = useNavigate();

  // get all product data from backend side
  useEffect(() => {
    const getProducts = async () => {
      const products = await axios.get("http://localhost:5000/products");
      setProducts(products.data);
      allProductsData = products.data;
    };
    getProducts();
  }, []);

  // this function first chick if user login and have token or not
  // then show the product model for login user by change the toggle state to true
  // or redirect the gust to login page
  const showProduct = (element) => {
    if (token) {
      setProduct(element);
      setToggle(true);
    } else {
      Navigate("/login");
    }
  };

  const closeModel = () => {
    setToggle(false);
  };

  const changeDate = (e) => {
    setDate(new Date(e.target.value + "T13:00"));
  };

  // this function for reserve the product but first chick if the  user
  // select a date or not
  const reserve = async () => {
    try {
      if (date) {
        const booking = await axios.post(
          `http://localhost:5000/booking/${product._id}`,
          { date: date },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        // if the booking was completed in backend redirect
        // the user to his booking information
        if (booking.status === 201) {
          Navigate(`/your-booking/${booking.data._id}`);
        }
      } else {
        setErrorMessage("You must enter a valid date first");
      }
    } catch (error) {}
  };

  // i use frontend search so i have 2 variable for product one in static (not change)
  // witch is allProductsData and its not state because its not render or change any thing on screen
  // and the other one products and its state and we render all the products on screen use map on it
  // and when search input change (user write on it) the state will change
  // mean what render on screen will change directly.
  const search = (e) => {
    setProducts(
      allProductsData.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
  };

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
              <p className="product-model-price">$ {product.price} JOD</p>
              <div className="product-model-description">
                <p>{product.description}</p>
              </div>
              <div className="reserve-div">
                <input type="date" onChange={changeDate} />
                <button className="reserve-btn" onClick={reserve}>
                  reserve
                </button>
              </div>
              <p className="product-model-error">{errorMessage}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="search-div">
        <input type="text" placeholder="Search" onChange={search} />
      </div>
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
