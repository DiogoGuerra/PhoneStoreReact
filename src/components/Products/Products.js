import classes from "./Products.module.css";
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem/ProductItem";
import { Grid, Typography, Container, TextField } from "@material-ui/core";
// Component that defines the product list in the main page
const Products = () => {
  const [query, setQuery] = useState("");
  const [productsList, setProductsList] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    let storedTime = new Date(JSON.parse(localStorage.getItem("dateSnapshot")));
    let deltaSnapshotsSec = Math.floor(
      Math.abs(new Date() - storedTime) / 1000
    );

    // 3600 are the time to check if an hour has passed
    if (deltaSnapshotsSec < 0) {
      deltaSnapshotsSec = 3600;
    }

    if (deltaSnapshotsSec < 3600) {
      console.log("This info is from the local storage");
      setProductsList(JSON.parse(localStorage.getItem("productList")));
    } else {
      fetch("https://front-test-api.herokuapp.com/api/product")
        .then((response) => response.json())
        .then((responseData) => {
          setProductsList(responseData);
          let currentTime = new Date();
          localStorage.setItem("productList", JSON.stringify(responseData));
          localStorage.setItem("dateSnapshot", JSON.stringify(currentTime));
        });
    }
  }, []);

  useEffect(() => {
    if (productsList !== undefined) {
      setIsDataLoaded(true);
    }
  }, [productsList]);

  return (
    <Container className={classes.prods}>
      <Container align="center">
        <Typography variant="h6" align="center">
          Find your dream phone
        </Typography>
        <TextField
          align="center"
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </Container>

      <div className={classes.prods}>
        <Grid container spacing={2}>
          {isDataLoaded &&
            productsList
              .filter((prod) => {
                if (query === "") {
                  return prod;
                } else if (
                  prod.brand.toLowerCase().includes(query.toLocaleLowerCase())
                ) {
                  return prod;
                } else if (
                  prod.model.toLowerCase().includes(query.toLocaleLowerCase())
                ) {
                  return prod;
                }
              })
              .map((prod) => (
                <Grid
                  item
                  key={prod.id}
                  xs={12}
                  md={6}
                  lg={3}
                  className={classes.items}
                >
                  <ProductItem
                    brand={prod.brand}
                    model={prod.model}
                    img={prod.imgUrl}
                    price={prod.price}
                    id={prod.id}
                  />
                </Grid>
              ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Products;
