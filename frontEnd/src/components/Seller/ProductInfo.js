import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductInfo.css";

export default function ProductInfo({ token, product }) {
  const [pendingBooking, setPendingBooking] = useState([]);
  const [acceptedBooking, setAcceptedBooking] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("pending");

  useEffect(() => {
    const getBooking = async () => {
      const result = await axios.get(
        `http://localhost:5000/booking/${product._id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      // here set all pending booking use filter on data come from server
      setPendingBooking(
        result.data.filter((element) => {
          return element.status === "pending";
        })
      );
      // here set all  accepted booking use filter on data come from server
      setAcceptedBooking(
        result.data.filter((element) => {
          return element.status === "accepted";
        })
      );
    };
    if (product) {
      getBooking();
    }
  }, [product, token]);

  const toPendingStatus = () => {
    setCurrentStatus("pending");
  };

  const toAcceptedStatus = () => {
    setCurrentStatus("accepted");
  };

  const accept = async (id, i) => {
    try {
      const updatedBook = await axios.put(
        `http://localhost:5000/booking/${id}`,
        {
          newStatus: "accepted",
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      // here after chick from back end if all thing okay
      // i make a copy from pending array then splice with index to
      // delete this object from array.
      if (updatedBook.status === 200) {
        const copy = [...pendingBooking];
        copy.splice(i, 1);
        setPendingBooking(copy);
        // add the updated object to accepted array after deleted from pending
        setAcceptedBooking([...acceptedBooking, updatedBook.data]);
      }
    } catch (error) {}
  };

  const rejected = async (id, i) => {
    try {
      const updatedBook = await axios.put(
        `http://localhost:5000/booking/${id}`,
        {
          newStatus: "rejected",
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      // here after chick from back end if all thing okay
      // i make a copy from pending array then splice with index to
      // delete this object from array.
      if (updatedBook.status === 200) {
        const copy = [...pendingBooking];
        copy.splice(i, 1);
        setPendingBooking(copy);
      }
    } catch (error) {}
  };

  return (
    <>
      <p className="product-head">Your Product Information</p>
      <div className="product-container">
        <div className="product-info">
          <div className="product-info-img">
            <img src={product.image} alt="product" />
          </div>
          <div>
            <div className="product-name-price">
              <p className="product-name">{product.name}</p>
              <p className="product-price">$ {product.price} JOD</p>
            </div>
            <p className="product-desc">{product.description}</p>
          </div>
        </div>
        <div className="product-booking">
          <div className="status-btn-container">
            <button className="pending-btn" onClick={toPendingStatus}>
              Pending
            </button>
            <button className="accepted-btn" onClick={toAcceptedStatus}>
              Accepted
            </button>
          </div>
          {currentStatus === "pending" ? (
            <>
              <h3 className="status-title">
                {pendingBooking.length
                  ? "Pending Requests :"
                  : "No Pending Request"}
              </h3>
              <div className="pending-cards">
                {pendingBooking.map((element, i) => {
                  return (
                    <div className="pending-card" key={element._id}>
                      <p>
                        Date : <span>{element.date.split("T")[0]}</span>
                      </p>
                      <p>
                        Name : <span>{element.userId.name}</span>{" "}
                      </p>
                      <p>
                        Email : <span>{element.userId.email}</span>
                      </p>
                      <div className="action-btn">
                        <button
                          className="accepted-btnAction"
                          onClick={() => {
                            accept(element._id, i);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="rejected-btnAction"
                          onClick={() => {
                            rejected(element._id, i);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h3 className="status-title">
                {acceptedBooking.length
                  ? "Accepted Requests :"
                  : "No Accepted Request"}
              </h3>
              <div className="accepted-cards">
                {acceptedBooking.map((element) => {
                  return (
                    <div className="accepted-card" key={element._id}>
                      <p>
                        Date : <span>{element.date.split("T")[0]}</span>
                      </p>
                      <p>
                        Name : <span>{element.userId.name}</span>{" "}
                      </p>
                      <p>
                        Email : <span>{element.userId.email}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
