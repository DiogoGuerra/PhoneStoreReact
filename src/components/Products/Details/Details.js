import { useLocation } from "react-router-dom";
import FetchDetails from "../../API/FetchDetails";
import classes from "./Details.module.css";
import { Grid, Typography } from "@material-ui/core";
import Description from "../Description/Description";
import Options from "../Options/Options";
import { useEffect, useState } from "react";

// Component that defines the product details
const Details = () => {
  const location = useLocation();
  const id = location.state.props.id;
  const img = location.state.props.img;
  const [dataLoad, setDataLoad] = useState(false);
  const details = FetchDetails(id);
  let priceData;

  // In case price is non defined, the product turns unavailable
  if (details.price !== "") {
    priceData = details.price + "€";
  } else {
    priceData = "Unavailable";
  }

  //Verify if the data is loaded
  useEffect(() => {
    if (details.length !== 0) {
      setDataLoad(true);
    }
  }, [details]);

  //Don't render the component until the data is loaded
  if (dataLoad === false) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={classes.box}>
      <div>
        <Grid container spacing={2}>
          <Grid container item xs={6} direction="column">
            <div className={classes.productImage}>
              <img src={img} alt="" />
            </div>
            <div className={classes.brandAndModel}>
              <Typography align="center" variant="h5">
                {details.brand} - {details.model}
              </Typography>
              <Typography align="center" variant="h6">
                {priceData}
              </Typography>
            </div>
          </Grid>
          <Grid container item xs={6} direction="column">
            <div>{dataLoad && <Description details={details} />}</div>
            <div>{dataLoad && <Options details={details} />}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Details;
