import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./header.module.scss";
import useDeviceWidth from "../../utils/utils";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { v4 as uuidv4 } from 'uuid';


interface HeaderModel {
  label: string;
  selected: boolean;
}

const Header = () => {
  const headerData = [
    {
      label: "Home",
      selected: true,
      icon: <HomeIcon />,
    },
    {
      label: "Who we are",
      selected: false,
      icon: <EmojiPeopleIcon />,
    },
    {
      label: "What we do",
      selected: false,
      icon: <LaptopChromebookIcon />,
    },
    {
      label: "Careers",
      selected: false,
      icon: <BusinessCenterIcon />,
    },
    {
      label: "Reach us",
      selected: false,
      icon: <MailIcon />,
    },
  ];
  const [chipData, setChipData] = React.useState<HeaderModel[]>(headerData);
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const [isDesktop] = useDeviceWidth();
  const list = () => (
    <Box
      sx={{ width: 250 }}
    >
      <List>
        {headerData.map((text) => (
          <ListItem key={uuidv4()} disablePadding>
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const onChipClick = (newChip: number) => {
    const newData = chipData.map((item, ind) => {
      return { ...item, selected: ind === newChip ? true : false };
    });
    setChipData(newData);
  };
  return (
    <>
      <Box className={styles.headerContainer}>
        <Box className={styles.headerBar}>
          {isDesktop ? (
            <Box sx={{ padding: "8px" }} className={styles.contentContainer}>
              <Box sx={{ paddingLeft: "16px", fontWeight: 800 }}>
                AB Solutions Pvt. Ltd.
              </Box>
              <Box sx={{ gap: "8px" }}>
                {chipData.map((item, ind) => {
                  return (
                    <Chip
                      label={item.label}
                      key={uuidv4()}
                      sx={{
                        background: `${
                          item.selected ? "#FFFFFF" : "transparent"
                        }`,
                        cursor: "pointer",
                      }}
                      onClick={() => onChipClick(ind)}
                      data-testid={`chip_${ind}`}
                    />
                  );
                })}
              </Box>
            </Box>
          ) : (
            <>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                padding={"0px 8px"}
              >
                <IconButton onClick={() => setShowMobileMenu(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="body2">
                  AB Solutions Pvt. Ltd.
                </Typography>
                <Box sx={{ height: "40px", width: "40px" }}></Box>
              </Box>
              <SwipeableDrawer
                anchor={"left"}
                open={showMobileMenu}
                onClose={() => setShowMobileMenu(false)}
                onOpen={() => setShowMobileMenu(true)}
                disableScrollLock={true}
              >
                {list()}
              </SwipeableDrawer>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Header;
