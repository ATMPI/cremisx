import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuth } from "../../context/AuthProvider";
import { Profile, Setting } from "../signin/UserAccount";

// import ThemeSwitcher from "../ThemeSwitcher";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled("div")({
  position: "relative",
  height: 40,
  display: "flex",
  alignItems: "center",
  "& img": {
    maxHeight: 40,
  },
});

function DashboardHeader({ logo, title, menuOpen, onToggleMenu }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [settingOpen, setSettingOpen] = React.useState(false);

  const handleMenuOpen = React.useCallback(() => {
    onToggleMenu(!menuOpen);
  }, [menuOpen, onToggleMenu]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = () => {
    setAnchorEl(null);
    setProfileOpen(true);
  };
  const openSetting = () => {
    setAnchorEl(null);
    setSettingOpen(true);
  };

  const getMenuIcon = React.useCallback(
    (isExpanded) => {
      const expandMenuActionText = "Expand";
      const collapseMenuActionText = "Collapse";

      return (
        <Tooltip
          title={`${
            isExpanded ? collapseMenuActionText : expandMenuActionText
          } menu`}
          enterDelay={1000}
        >
          <div>
            <IconButton
              size="small"
              aria-label={`${
                isExpanded ? collapseMenuActionText : expandMenuActionText
              } navigation menu`}
              onClick={handleMenuOpen}
            >
              {isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </Tooltip>
      );
    },
    [handleMenuOpen]
  );

  return (
    <>
      <AppBar color="inherit" position="absolute" sx={{ displayPrint: "none" }}>
        <Toolbar sx={{ backgroundColor: "inherit", mx: { xs: -0.75, sm: -1 } }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box sx={{ mr: 1 }}>{getMenuIcon(menuOpen)}</Box>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  {logo ? <LogoContainer>{logo}</LogoContainer> : null}
                  {title ? (
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme.vars ?? theme).palette.primary.main,
                        fontWeight: "700",
                        ml: 1,
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                      }}
                    >
                      {title}
                    </Typography>
                  ) : null}
                </Stack>
              </Link>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", marginLeft: "auto" }}
            >
              <Stack>Hi! {user?.firstname}</Stack>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 2,
                        py: 2,
                      }}
                    >
                      <Avatar
                        src="https://i.pravatar.cc/150?img=12"
                        sx={{ width: 56, height: 56 }}
                      />

                      <Box>
                        <Typography fontWeight={600}>
                          {user?.firstname + " " + user?.lastname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <MenuItem onClick={openProfile}>
                      <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={openSetting}>
                      <ListItemIcon>
                        <SettingsOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    {/* <MenuItem onClick={handleClose}>
                      <ThemeSwitcher />
                    </MenuItem> */}
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Profile
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />
      <Setting
        open={settingOpen}
        onClose={() => {
          setSettingOpen(false);
        }}
        user={user}
      />
    </>
  );
}

DashboardHeader.propTypes = {
  logo: PropTypes.node,
  menuOpen: PropTypes.bool.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default DashboardHeader;
