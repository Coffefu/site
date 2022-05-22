import React, { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: "none",
  p: 4,
  textAlign: "center",
  color: "#000000",
  backgroundColor: "#F6FCFE",
};

const { REACT_APP_ENVIRONMENT } = process.env;

const ProfileChangeName = ({ showErrorPopup, showSuccessPopup }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [openChangeName, setOpenChangeName] = React.useState(false);
  const handleOpenChangeName = () => setOpenChangeName(true);
  const handleCloseChangeName = () => setOpenChangeName(false);

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(null);

  const handleNameChange = (event) => {
    if (
      /^[a-zA-Zа-яА-ЯёЁ]+$/.test(event.target.value) ||
      event.target.value === ""
    ) {
      setName(event.target.value);
    }
  };

  const closeModal = () => {
    handleCloseChangeName();
    navigate(-1);
  };

  const saveNewName = () => {
    if (name === "") {
      showErrorPopup("Имя не может быть пустым!");
      return;
    }
    const sendNewName = async () => {
      const res = await fetch(
        `https://cofefu.ru${REACT_APP_ENVIRONMENT || ""}/api/change_name`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": cookies.jwt,
          },
          body: JSON.stringify(name),
        }
      ).then((res) => res.json());

      if (!res.detail) {
         showSuccessPopup('Имя успешно изменено!');
         closeModal();
      }
    };

    sendNewName();
  };

  return (
    <Modal
      open={true}
      onClose={handleCloseChangeName}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex justify-content-start h6">
          <IconButton aria-label="delete" onClick={closeModal} className="p-0">
            <ArrowBackIcon color="#000000" sx={{ fontSize: 32 }} />
          </IconButton>
        </div>
        <div className="d-flex flex-column mt-5">
          <Typography variant="body1">Введите новое имя</Typography>
          <TextField
            onChange={handleNameChange}
            className="mb-2 mt-3"
            id="userName"
            label="Имя"
            variant="outlined"
            error={nameValid !== null && !nameValid}
            value={name}
          />
          <Button
            sx={{ border: "1px solid black", color: "#c28760" }}
            className={"btn"}
            onClick={saveNewName}
          >
            Сохранить
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileChangeName;
