import React, { useEffect, useState } from "react";

export const CartContext = React.createContext({
  numberCart: 0,
  incrementCartCount: () => {},
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [valueCart, setValueCart] = useState(0);

  // In case it has been over an hour since the user added items to cart
  // it will not fetch the localStorage data
  useEffect(() => {
    let storedTime = new Date(
      JSON.parse(localStorage.getItem("cartSnapshotTime"))
    );
    let deltaSnapshotsSec = Math.floor(
      Math.abs(new Date() - storedTime) / 1000
    );

    if (deltaSnapshotsSec < 0) {
      deltaSnapshotsSec = 3600;
    }

    if (deltaSnapshotsSec < 3600) {
      setValueCart(JSON.parse(localStorage.getItem("cartValue")));
    }
  }, []);

  // After the API call, increments the cart and stores on local storage with a timestamp
  const incrementCart = () => {
    let newValue = valueCart + 1;
    setValueCart(newValue);
    let currentTime = new Date();
    localStorage.setItem("cartValue", JSON.stringify(newValue));
    localStorage.setItem("cartSnapshotTime", JSON.stringify(currentTime));
  };
  return (
    <CartContext.Provider
      value={{ numberCart: valueCart, incrementCartCount: incrementCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
