import { Box, Card, CardContent, Container, Tab, Tabs } from "@mui/material/";
import * as React from "react";

import { Flight, Hotel } from "@mui/icons-material";
import PropTypes from "prop-types";
import FlightSearch from "../components/inputs/FlightSearch";
import HotelSearch from "../components/inputs/HotelSearch";
import Layout from "./layout";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Home() {
  const [formSection, setFormSection] = React.useState(0);

  const handleFormSection = (event, newValue) => {
    setFormSection(newValue);
  };

  return (
    <>
      <Layout>
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: "10",
            transform: "translateY(50%)",
          }}
        >
          <Card sx={{ minWidth: 275, mt: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={formSection}
                variant="fullWidth"
                onChange={handleFormSection}
                aria-label=""
              >
                <Tab
                  label={
                    <div className="flex text-lg">
                      <Flight /> Flight
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <div className="flex text-lg">
                      <Hotel />  Hotel
                    </div>
                  }
                  {...a11yProps(1)}
                />
                {/* <Tab icon={<Flight />} label="Flight" {...a11yProps(0)}  />
              <Tab icon={<Hotel />} label="Hotel" {...a11yProps(1)}  /> */}
              </Tabs>
            </Box>
            <CardContent>
              <TabPanel value={formSection} index={0}>
                <FlightSearch />
              </TabPanel>
              <TabPanel value={formSection} index={1}>
                <HotelSearch></HotelSearch>
              </TabPanel>
            </CardContent>
          </Card>
        </Container>
        <Container
          maxWidth="auto"
          sx={{
            position: "relative",
            backgroundColor: "white",
            height: "50vh",
            // position: "absolute",
            color: "black",
          }}
        ></Container>
      </Layout>
    </>
  );
}
export default Home;
