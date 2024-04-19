import { Button } from "@mui/material";
import {Link} from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <>
      <Button component={Link} to="/register" color="inherit">
        Зарегестрироваться
      </Button>
      <Button component={Link} to="/login" color="inherit">
        Войти
      </Button>
    </>
  );
};


export default AnonymousMenu;