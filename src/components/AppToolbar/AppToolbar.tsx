import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppBar, Box, Button, Grid, TextField, Toolbar, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "../UI/menus/userMenu/UserMenu";
import AnonymousMenu from "../AnonymousMenu/AnonymousMenu";
import { logoutUser } from "@/features/userSlice/userSlice";
import "./AppToolBar.css";
import { ChangeEvent, useState } from "react";
import { findBook } from "@/features/mainSlice/mainSlice";
const StyledLink = styled(Link)(() => ({
  color: "inherit",
  textDecoration: "none",
  ["&:hover"]: { color: "inherit" },
}));

const AppToolbar = () => {
  const user = useAppSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  
  const handleSubmit = () => {
    dispatch(findBook(inputText));
    navigate('/find')
  };
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent={"space-between"} display={'flex'} alignItems={'center'}>
            <Typography variant="h6" component={StyledLink} to={"/"}>
              <img className="logo" src="/8074804.png" alt="Not found"></img>
            </Typography>
            <Grid item display={'flex'}>
              <TextField
                label="Введите текст"
                variant="outlined"
                value={inputText}
                onChange={handleInputChange}
                size="small"
              />
              <Button variant="contained" onClick={handleSubmit}  size="small">
                Отправить
              </Button>
            </Grid>
            {user ? (
              <UserMenu
                username={user.username}
                onLogoutHandler={logoutHandler}
                userrole={user.role}
              />
            ) : (
              <Grid item>
                <AnonymousMenu />
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component={Toolbar} marginBottom={2} />
    </>
  );
};

export default AppToolbar;
