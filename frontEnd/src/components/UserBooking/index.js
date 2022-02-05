import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function UserBooking({ token }) {
  const [booking, setBooking] = useState([]);
  const { newId } = useParams();
  useEffect(() => {
    const getUserBooking = async () => {
      const data = await axios.get(`http://localhost:5000/booking`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setBooking(data.data);
    };
    // here we get the data from back end after make sure
    // if there is a save token
    if (token) {
      getUserBooking();
    }
  }, [token]);

  useEffect(() => {
    // this if to scroll to the new book of the user
    // since the user reserve from home page the app will direct him automatically
    // to this page
    if (newId) {
      // use setTimeout for better user experience , first load all booking
      // then scroll the new book.
      setTimeout(() => {
        const violation = document.getElementById(newId);
        window.scrollTo({
          top: violation.offsetTop,
          behavior: "smooth",
        });
      }, 1000);
    }
  }, [newId]);

  return (
    <>
      {booking.length ? (
        <>
          <p className="user-booking-title">Your Booking</p>
          <div className="userBooking-cards">
            {booking.map((element) => {
              return (
                <div
                  className="userBooking-card"
                  id={element._id}
                  key={element._id}
                >
                  <div className="userBooking-card-img">
                    <img src={element.product.image} alt="product" />
                  </div>
                  <div className="userBooking-card-info">
                    <p className="name">{element.product.name}</p>
                    <div className="name-price">
                      <p className="price">$ {element.product.price} JOD</p>
                      <p className="date">{element.date.split("T")[0]}</p>
                    </div>
                    <p
                      className={
                        element.status === "accepted"
                          ? "accept-status"
                          : element.status === "pending"
                          ? "pending-status"
                          : "rejected-status"
                      }
                    >
                      {element.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="user-booking-title">You dont have any previous booking</p>
      )}
    </>
  );
}
