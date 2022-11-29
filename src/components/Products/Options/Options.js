import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Container,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../store/CartContext";

const Options = (props) => {
  //States to be aware of the change of color and storage, and the product availability
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  //Cart Context to increment the cart count
  const { incrementCartCount } = useContext(CartContext);

  //Change color handler
  const selectionColorChangeHandler = (event) => {
    setSelectedColor(event);
  };
  //Change storage handler
  const selectionStorageChangeHandler = (event) => {
    setSelectedStorage(event);
  };
  //Verify if the color or storage has only 1 option, and pre-select that option
  useEffect(() => {
    if (props.details.options.colors.length === 1) {
      setSelectedColor(props.details.options.colors[0].code);
    }

    if (props.details.options.storages.length === 1) {
      setSelectedStorage(props.details.options.storages[0].code);
    }
    if (props.details.price === "") {
      setIsAvailable(false);
    } else if (props.details.price !== "") {
      setIsAvailable(true);
    }
  }, []);

  // Colors options to appear on the dropdown
  const menuColorItemElements = props.details.options.colors.map(
    (colors, index) => (
      <MenuItem value={colors.code} key={index}>
        {colors.name}
      </MenuItem>
    )
  );
  // Storage options to appear on the dropdown
  const menuStorageItemElements = props.details.options.storages.map(
    (storages, index) => (
      <MenuItem value={storages.code} key={index}>
        {storages.name}
      </MenuItem>
    )
  );

  // Handler for when the cart button is pressed
  const addToCartHandler = () => {
    //Verify if the user select a color and a storage
    if (selectedColor === "" || selectedStorage === "") {
      alert("Please select a color and a storage option.");
      return;
    }
    //If user select color and storage, then post data
    fetch("https://front-test-api.herokuapp.com/api/cart", {
      method: "POST",
      body: JSON.stringify({
        id: props.details.id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        incrementCartCount();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container
      style={{
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container style={{ display: "flex" }}>
        <FormControl fullWidth style={{ padding: "1em" }}>
          <InputLabel style={{ InputLabel: "center" }}>Colors</InputLabel>
          <Select
            autoWidth
            value={selectedColor}
            onChange={(event) =>
              selectionColorChangeHandler(event.target.value)
            }
          >
            {menuColorItemElements}
          </Select>
          <FormHelperText>Select a color</FormHelperText>
        </FormControl>
        <FormControl fullWidth style={{ padding: "1em" }}>
          <InputLabel>Storage</InputLabel>
          <Select
            value={selectedStorage}
            onChange={(event) =>
              selectionStorageChangeHandler(event.target.value)
            }
          >
            {menuStorageItemElements}
          </Select>
          <FormHelperText>Select a storage</FormHelperText>
        </FormControl>
      </Container>
      {isAvailable && (
        <Button
          variant="outlined"
          style={{ marginTop: "2em" }}
          onClick={addToCartHandler}
        >
          ADD TO CART
        </Button>
      )}
    </Container>
  );
};

export default Options;
