import {
  Box,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./footer.module.scss";
import Pinterest from "../../assets/images/svg/Pinterest";
import Instagram from "../../assets/images/svg/Instagram";
import Facebook from "../../assets/images/svg/Facebook";
import LogoWhite from "../../assets/images/svg/LogoWhite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Footer = () => {
  const [signupOpen, setSignupOpen] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [contact, setContact] = React.useState<string>("");
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string>(
    "Registered Success!"
  );

  const updateSignupOpen = () => {
    setSignupOpen((prev) => !prev);
  };
  const handleRegisterClick = async () => {
    try {
      const response = await axios.post("https://api.restful-api.dev/objects", {
        email: email,
        password: password,
        contactNumber: contact,
      });
      if (response.status === 200) {
        setShowSuccess(true);
        setToastMessage(`Registered Successfully`);
        setSignupOpen(false);
      } else {
        setToastMessage(`Registration Failed`);
      }
      setShowSuccess(true);
    } catch (error) {
      console.log("Error in post api", error);
      setToastMessage(`Registration Failed`);
    }
  };
  const footerData = [
    {
      options: [
        {
          accessor: "home",
          label: "Home",
        },
        {
          accessor: "whoweare",
          label: "Who we are",
        },
        {
          accessor: "whatwedo",
          label: "What we do",
        },
        {
          accessor: "pricing",
          label: "Pricing",
        },
        {
          accessor: "careers",
          label: "Careers",
        },
      ],
    },
    {
      options: [
        {
          accessor: "moreinfo",
          label: "More Info",
        },
        {
          accessor: "privacy",
          label: "Privacy Policy",
        },
        {
          accessor: "terms",
          label: "Terms of use",
        },
        {
          accessor: "legal",
          label: "Legal",
        },
      ],
    },
    {
      options: [
        {
          accessor: "reachus",
          label: "Reach us",
        },
        {
          accessor: "signup",
          label: "Sign up",
          onLinkClick: () => setSignupOpen(true),
        },
        {
          accessor: "customer",
          label: "Customer Support",
        },
        {
          accessor: "infoemail",
          label: "info@abs.com",
        },
      ],
    },
  ];
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "48px",
    borderRadius: "25px",
  };
  return (
    <>
      <Box className={styles.footer}>
        <Box className={styles.footerHolder}>
          <Box className={styles.leftColumn}>
            <Box className={styles.heading}>
              <Box className={styles.logo}>
                <LogoWhite />
              </Box>
              <Box
                className={styles.company}
                sx={{ paddingLeft: "16px", fontWeight: 800 }}
              >
                AB Solutions Pvt. Ltd.
              </Box>
            </Box>
            <Box className={styles.columnContainer}>
              {footerData.map((column) => {
                return (
                  <Box key={uuidv4()} className={styles.column}>
                    {column.options.map((item) => {
                      return (
                        <Typography
                          key={uuidv4()}
                          variant="body1"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            item.onLinkClick &&
                              typeof item.onLinkClick === "function" &&
                              item.onLinkClick();
                          }}
                        >
                          {item.label}
                        </Typography>
                      );
                    })}
                  </Box>
                );
              })}
              <Box key={footerData?.length} className={styles.column}>
                <Typography variant="body1">Follow us</Typography>
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={"16px"}
                >
                  <Facebook />
                  <Instagram />
                  <Pinterest />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Modal open={signupOpen} onClose={updateSignupOpen}>
          <Box className={styles.modalContainer} sx={style}>
            <Box sx={{p:"36px"}}>
              <Typography variant="h6" component="h2" sx={{ mb: "16px" }}>
                Signup
              </Typography>
              <Box sx={{ mb: "16px" }}>
                <Typography variant="body1" sx={{ mb: "8px" }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  size="small"
                  value={email}
                  helperText="john.doe@yahoo.com"
                  error={email === ""}
                  onChange={(e) => setEmail(e.target.value ?? "")}
                  // data-testid={"email_test_id"}
                  inputProps={{ "data-testid": "email_test_id" }}
                />
              </Box>
              <Box sx={{ mb: "16px" }}>
                <Typography variant="body1" sx={{ mb: "8px" }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value ?? "")}
                  inputProps={{ "data-testid": "pwd_test_id" }}
                />
              </Box>
              <Box sx={{ mb: "16px" }}>
                <Typography variant="body1" sx={{ mb: "8px" }}>
                  Contact Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type={"text"}
                  value={contact}
                  onChange={(e) => setContact(e.target.value ?? "")}
                  inputProps={{ "data-testid": "contact_test_id" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  mt: "32px",
                  width: "100%",
                }}
              >
                <Button variant="outlined" sx={{borderColor:"#222629", color:"#222629"}} onClick={() => setSignupOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleRegisterClick()}
                  data-testid={"register_button"}
                  sx={{background:"#87C232"}}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={toastMessage}
        sx={{ borderRadius: "16px" }}
        autoHideDuration={3000}
        role="snackbar_role_id"
      />
    </>
  );
};
export default Footer;
