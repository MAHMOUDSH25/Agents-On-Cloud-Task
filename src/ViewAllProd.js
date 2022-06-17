import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, ListItem } from "@mui/material";
import ProductCard from "./ProductCard";

function ViewAllProd() {
  const [product, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/product/all`
      );
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {product.map((product) => (
          <Grid item xs={2} sm={3} md={4} key={product._id}>
            <ListItem>
              <ProductCard product={product} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewAllProd;
