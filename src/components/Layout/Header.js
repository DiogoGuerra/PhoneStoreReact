import { AppBar, Toolbar, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../store/CartContext";
import { useContext } from "react";

const Header = (props) => {
  const { numberCart } = useContext(CartContext);
  // click on the logo to return to the first page
  const navigate = useNavigate();
  const routeToBasePage = () => {
    navigate("/");
  };

  const appLogo = (
    <ButtonBase onClick={routeToBasePage}>
      <Typography variant="h5">Diogo War Co.</Typography>
    </ButtonBase>
  );

  // Shopping cart component with the cart size
  const Cart = (
    <div style={{ marginLeft: "auto", display: "flex" }}>
      <Icon />
      <Typography>{numberCart}</Typography>
    </div>
  );

  return (
    <header>
      <AppBar style={{ background: "#29465B" }}>
        <Toolbar>
          {appLogo}
          {Cart}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </header>
  );
};

export default Header;
