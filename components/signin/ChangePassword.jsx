import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function ChangePassword({ onClose, open, user }) {
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
            <Typography variant="h5">Change Password</Typography>
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
          <Typography>Current Password</Typography>
          <TextField sx={{}} type="password" />
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
          <Typography>New Password</Typography>
          <TextField sx={{}} type="password" />
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
          <Typography>Re-enter Password</Typography>
          <TextField sx={{}} type="password" />
        </Box>

        <Box>
          <Button variant="contained" color="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
