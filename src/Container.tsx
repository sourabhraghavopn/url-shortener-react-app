import { Button, Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./App.css";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import React from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import GetAppIcon from "@mui/icons-material/GetApp";
const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <p>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </p>
  );
};
export const Container = () => {
  const [value, setValue] = React.useState(0);
  const [shortUrl, setShortUrl] = React.useState("");
  const [originalUrl, setOriginalUrl] = React.useState("");

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const getOriginalUrl = () => {
    if (shortUrl === "") return;
    fetch(`http://localhost:8008/get`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        short_url: shortUrl,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((r) => {
              if (r.status === "success") {
                setOriginalUrl(r.original_url);
              } else {
                setOriginalUrl("");
              }
            })
            .catch((err) => {
              setOriginalUrl("");
            });
        } else {
          setOriginalUrl("");
          return {};
        }
      })
      .catch((e) => {
        setOriginalUrl("");
        return {};
      });
  };

  const getShortUrl = () => {
    if (originalUrl === "") return;
    fetch(`http://localhost:8008/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        original_url: originalUrl,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((r) => {
              if (r.status === "success") {
                setShortUrl(r.short_url);
              } else {
                setShortUrl("");
              }
            })
            .catch((err) => {
              setShortUrl("");
            });
        } else {
          setShortUrl("");
          return {};
        }
      })
      .catch((e) => {
        setShortUrl("");
        return {};
      });
  };
  return (
    <div className="container">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(e, v) => {
              setValue(v);
            }}
            aria-label="basic tabs example"
          >
            <Tab label="Create Short URL" {...a11yProps(0)} />
            <Tab label="Get Original URL" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Insert Original Url"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Button
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={(e) => {
                e.preventDefault();
                getShortUrl();
              }}
            >
              <NoteAddIcon />
            </Button>
          </Paper>
          <Grid className="output-label">
            SHORT URL
            <Grid>{shortUrl}</Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              value={shortUrl}
              onChange={(event) => setShortUrl(event.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Insert Short Url"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Button
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={(e) => {
                e.preventDefault();
                getOriginalUrl();
              }}
            >
              <GetAppIcon />
            </Button>
          </Paper>
          <Grid className="output-label">
            ORIGINAL URL
            <Grid>{originalUrl}</Grid>
          </Grid>
        </TabPanel>
      </Box>
    </div>
  );
};
