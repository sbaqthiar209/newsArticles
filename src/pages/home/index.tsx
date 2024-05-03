import { Box, Button, Link, Typography } from "@mui/material";
import styles from "./home.module.scss";
import Banner from "../../assets/images/banner.png";
import { v4 as uuidv4 } from 'uuid';
import { lazy, Suspense } from 'react';

const Header = lazy(()=>import("../../components/header"));
const TeamBuilding = lazy(()=>import("../../assets/images/svg/teamBuilding"));
const OfficeSetup = lazy(()=>import("../../assets/images/svg/OfficeSetup"));
const Leadership = lazy(()=>import("../../assets/images/svg/Leadership"));
const Branding = lazy(()=>import("../../assets/images/svg/Branding"));
const ExtendedTeam = lazy(()=>import("../../assets/images/svg/ExtendedTeam"));
const Recruitment = lazy(()=>import("../../assets/images/svg/Recruitment"));
const Payroll = lazy(()=>import("../../assets/images/svg/Payroll"));
const Consultancy = lazy(()=>import("../../assets/images/svg/Consultancy"));

const Footer = lazy(()=>import("../../components/footer"));

const Home = () => {
  const iconData = [
    {
      label: "Team Building",
      icon: <TeamBuilding />,
    },
    {
      label: "Office Setup",
      icon: <OfficeSetup />,
    },
    {
      label: "Leadership Hiring",
      icon: <Leadership />,
    },
    {
      label: "Branding & Advertising",
      icon: <Branding />,
    },
    {
      label: "Extended Team Setup",
      icon: <ExtendedTeam />,
    },
    {
      label: "Recruitment Services",
      icon: <Recruitment />,
    },
    {
      label: "Payroll Management",
      icon: <Payroll />,
    },
    {
      label: "Consultancy Services",
      icon: <Consultancy />,
    },
  ];
  const dotCardsData = [
    {
      label: "Expert Team with Industry Experience",
      link: "More",
    },
    {
      label: "Solutions for Every Business Size",
      link: "More",
    },
    {
      label: "Cost-Effective Strategies",
      link: "More",
    },
    {
      label: "Scalanle Services for Future Growth",
      link: "More",
    },
  ];
  return (
    <>
      <Box className={styles.homeContainer}>
        <Box className={styles.homeHeaderContainer}>
          <Header />
        </Box>
        <Box className={styles.imageContainer}>
          <img src={Banner} loading="lazy" alt="banner" data-testid={"home-banner"} width={1920} height={984.004}/>
          <Box className={styles.overlay}>
            <Typography
              variant="h3"
              sx={{ mb: "16px", fontWeight: 700 }}
            >
              Empowering Your Business Growth
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: "16px", fontWeight: 700 }}
            >
              Unlocking Potential Through Exceptional Services
            </Typography>
            <Button variant="contained" sx={{background:"#87C232", color:"black", borderRadius:"25px", pl:"36px", pr:"36px"}} size="large">Know more</Button>
          </Box>
        </Box>
        <Box className={styles.pageSection}>
          <Box className={styles.keyServices}>
            <Box className={styles.textContainer}>
              <Typography variant="h4" sx={{ mb: "16px", fontWeight: 700 }}>
                Key Services
              </Typography>
              <Typography variant="body1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
            </Box>
            <Box className={styles.iconsContainer}>
              {iconData.map((item, ind) => {
                return (
                  <Box className={styles.iconHolder} key={uuidv4()}>
                    <Box className={styles.icon}>{item.icon}</Box>
                    <Box className={styles.text}>
                      <Typography variant="body1">{item.label}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box className={styles.whyChoose}>
            <Box className={styles.textContainer}>
              <Typography
                variant="h4"
                sx={{ mb: "16px", fontWeight: 700, color: "#87C232" }}
              >
                Why Choose ABD Solutions
              </Typography>
              <Typography variant="body1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting.
              </Typography>
            </Box>
            <Box sx={{ height: "100px" }}></Box>
            <Box className={styles.iconsContainer}>
              {dotCardsData.map((item, ind) => {
                return (
                    <Box className={styles.dotCard} key={uuidv4()}>
                      <Box className={styles.dot}></Box>
                      <Typography variant="body1" className={styles.text}>
                        {item.label}
                      </Typography>
                      <Link className={styles.link} href="#">
                        {item.link}
                      </Link>
                    </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
export default Home;
