import { useEffect, useRef, useState } from "react";
import { TextField, Typography } from "@mui/material";

export default function EditableText({
  value,
  onChange,
  variant = "body1",
  placeholder = "Click to edit",
  textFieldProps = {},
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  const inputRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const save = () => {
    setEditing(false);

    if (text !== value) {
      onChange?.(text);
    }
  };

  if (editing) {
    return (
      <TextField
        inputRef={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            save();
          }

          if (e.key === "Escape") {
            setText(value);
            setEditing(false);
          }
        }}
        size="small"
        {...textFieldProps}
      />
    );
  }

  return (
    <Typography
      variant={variant}
      onClick={() => setEditing(true)}
      sx={{
        cursor: "pointer",
        minHeight: 32,
        display: "flex",
        alignItems: "center",
        "&:hover": {
          bgcolor: "grey.100",
          borderRadius: 1,
          px: 1,
        },
      }}
    >
      {text || <span style={{ color: "#999" }}>{placeholder}</span>}
    </Typography>
  );
}
