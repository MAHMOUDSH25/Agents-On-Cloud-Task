import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct({ token, setProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeImage = (e) => {
    setImage(e.target.value);
  };

  const changePrice = (e) => {
    setPrice(e.target.value);
  };
  const addProduct = async () => {
    try {
      if (name === "" || description === "" || image === "" || price === "") {
        setErrorMessage("You must fill all field");
        return;
      }
      const newProduct = await axios.post(
        "http://localhost:5000/product",
        {
          name,
          description,
          image,
          price,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (newProduct.status === 201) {
        setProduct(newProduct.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <p className="addProduct-title">
        You dont have any Product, Add one from this form{" "}
      </p>
      <div className="addProduct-container">
        <div className="addProduct-content">
          <div>
            <input
              type="text"
              placeholder="product name"
              onChange={changeName}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="description"
              onChange={changeDescription}
            />
          </div>
          <div>
            <input type="text" placeholder="image" onChange={changeImage} />
          </div>
          <div>
            <input type="number" placeholder="price" onChange={changePrice} />
          </div>
          <div>
            <button className="addProduct-button" onClick={addProduct}>
              Add Product
            </button>
          </div>
          {/* {errorMessage ? <h3>{errorMessage}</h3> : ""} */}
          <h3>{errorMessage}</h3>
        </div>
      </div>
    </div>
  );
}
