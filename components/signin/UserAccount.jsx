import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditableText from "../utilities/EditableText";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import ChangePassword from "./ChangePassword";

export function Profile({ open, onClose, user }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src="https://i.pravatar.cc/150?img=12"
                sx={{ width: 80, height: 80 }}
              />

              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: -3,
                  right: -3,
                  bgcolor: "background.paper",
                  border: "1px solid #ddd",
                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">
                {user?.firstname + " " + user?.lastname}
              </Typography>

              <Typography color="text.secondary">{user?.email}</Typography>
            </Box>
          </Stack>

          <IconButton xs={{ border: "none" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingY: 2,
            justifyContent: "space-between",
            alignItems: "center", // Vertically center all items
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignContent: "center",
              paddingY: 2,
              verticalAlign: "bottom",
              padding: "0px 8px 0px 0px",
            }}
          >
            First Name
          </Typography>
          <EditableText value={user?.firstname} />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingY: 2,
            justifyContent: "space-between",
            alignItems: "center", // Vertically center all items
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignContent: "center",
              paddingY: 2,
              verticalAlign: "bottom",
              padding: "0px 8px 0px 0px",
            }}
          >
            Last Name
          </Typography>
          <EditableText value={user?.lastname} />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingY: 2,
            justifyContent: "space-between",
            alignItems: "center", // Vertically center all items
          }}
        >
          <Typography>Email account</Typography>
          <EditableText value={user?.email} />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingY: 2,
            justifyContent: "space-between",
            alignItems: "center", // Vertically center all items
          }}
        >
          <Typography>Mobile Number</Typography>
          <EditableText value={user?.contact_number} />
        </Box>
        <Divider />
        <Box
          size="small"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            paddingY: 2,
            paddingX: 0,
          }}
        >
          <Button variant="contained" color="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export function Setting({ open, onClose, user }) {
  const [changePassOpen, setChangePassOpen] = React.useState(false);

  const openChangePass = () => {
    setChangePassOpen(true);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Typography variant="h5">Settings</Typography>
            </Stack>

            <IconButton xs={{ border: "none" }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingY: 2,
              justifyContent: "space-between",
              alignItems: "center", // Vertically center all items
            }}
          >
            <Typography>Theme</Typography>
            <ColorModeSelect sx={{}} />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingY: 2,
              justifyContent: "space-between",
              alignItems: "center", // Vertically center all items
            }}
          >
            <Typography>Security</Typography>
            <Button variant="text" onClick={openChangePass}>
              Change Password
            </Button>
          </Box>

          <Box>
            <Button variant="contained" color="primary" onClick={onClose}>
              Save Changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ChangePassword
        open={changePassOpen}
        onClose={() => setChangePassOpen(false)}
        user={user}
      />
    </>
  );
}
