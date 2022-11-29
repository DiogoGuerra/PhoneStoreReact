import classes from "./ProductItem.module.css";
import { Grid, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

// Component that defines the product item
const ProductItem = (props) => {
  let priceData;

  //in case price is not defined
  if (props.price !== "") {
    priceData = props.price + "€";
  } else {
    priceData = "Unavailable";
  }
  return (
    <Container className={classes.product}>
      <Grid className={classes.items}>
        <Link to="/details" state={{ props }}>
          <img src={props.img} alt="" />
        </Link>
      </Grid>
      <Typography align="center">
        {props.brand} - {props.model}
      </Typography>
      <Typography align="center">{priceData}</Typography>
    </Container>
  );
};
export default ProductItem;
