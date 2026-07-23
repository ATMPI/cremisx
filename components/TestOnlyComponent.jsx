import React, { useState } from "react";
import { Button } from "@mui/material";
import { Profile } from "./signin/UserAccount";

export default function App() {
  const [open, setOpen] = useState(false);

  const user = {
    fullName: "John Doe",
    username: "jdoe",
    email: "john@example.com",
    phone: "+63 912 345 6789",
    role: "Administrator",
    position: "Software Engineer",
    department: "IT Department",
    employeeId: "EMP-1001",
    avatar: "https://i.pravatar.cc/300",
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        View Profile
      </Button>

      <Profile open={open} onClose={() => setOpen(false)} user={user} />
    </>
  );
}
