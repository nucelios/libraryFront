import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, {useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  userrole: string;
  onLogoutHandler: () => void;
}

export default function UserMenu({
  username,
  onLogoutHandler,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    onLogoutHandler();
    setAnchorEl(null);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {username}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div key={1}>
          <MenuItem
            onClick={handleCloseMenu}
            component={Link}
            to={"add_book"}
          >
            Добавить Книгу
          </MenuItem>
          <MenuItem onClick={handleClose}>Выйти</MenuItem>
        </div>
      </Menu>
    </div>
  );
}
