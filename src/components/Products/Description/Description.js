import classes from "./Description.module.css";
import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

// Component that defines the product description
const Description = (props) => {
  let weightData, ramData, sizeData, batteryData, cameraData;

  // In case weight is not defined
  if (props.details.weight !== "") {
    weightData = props.details.weight + "g";
  } else {
    weightData = "N/A";
  }

  // In case ram is not defined
  if (props.details.ram !== "") {
    ramData = props.details.ram;
  } else {
    ramData = "N/A";
  }

  // In case ram is not battery
  if (props.details.battery !== "") {
    batteryData = props.details.battery;
  } else {
    batteryData = "N/A";
  }

  // In case dimentions is not defined
  if (props.details.dimentions !== "-") {
    sizeData = props.details.dimentions;
  } else {
    sizeData = "N/A";
  }

  // In case primaryCamera is not defined
  if (props.details.primaryCamera !== "-") {
    if (Array.isArray(props.details.primaryCamera) === true) {
      cameraData = props.details.primaryCamera[0];
    }
  } else {
    cameraData = "N/A";
  }

  // This component will return the description of a specific phone
  return (
    <>
      <div className={classes.button}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Back to main page</Button>
        </Link>
      </div>
      <Container>
        <Typography align="justify" variant="h5">
          Description
        </Typography>
        <div style={{ marginTop: "1em" }}>
          <Typography align="justify">
            <b>Brand:</b> {props.details.brand}
          </Typography>
          <Typography align="justify">
            <b>Model:</b> {props.details.model}
          </Typography>
          <Typography align="justify">
            <b>CPU:</b> {props.details.cpu}
          </Typography>
          <Typography align="justify">
            <b>Ram:</b> {ramData}
          </Typography>
          <Typography align="justify">
            <b>Operating System:</b> {props.details.os}
          </Typography>
          <Typography align="justify">
            <b>Screen resolution:</b> {props.details.displaySize}
          </Typography>
          <Typography align="justify">
            <b>Battery:</b> {batteryData}
          </Typography>
          <Typography align="justify">
            <b>Camera:</b> {cameraData}
          </Typography>
          <Typography align="justify">
            <b>Size:</b> {sizeData}
          </Typography>
          <Typography align="justify">
            <b>Weight:</b> {weightData}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Description;
