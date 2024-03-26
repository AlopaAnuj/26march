import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footercontainer">
      <Grid container spacing={2} style={{ borderTop: "2px solid #EDE9FD",  borderBottom: "2px solid #EDE9FD", paddingLeft: "80px", paddingTop: "24px", paddingRight: "80px", paddingBottom: "24px" }}>
        <Grid item xs={4}>
          <NavLink to={"/"} className="navlinkstyle">
            Facebook
            {/* <img src={link.image} style={link.style} alt={link.title} /> */}
          </NavLink>
          <NavLink to={"/"} className="navlinkstyle">
            Instagram
            {/* <img src={link.image} style={link.style} alt={link.title} /> */}
          </NavLink>  
          <NavLink to={"/"} className="navlinkstyle">
            Twitter
            {/* <img src={link.image} style={link.style} alt={link.title} /> */}
          </NavLink>
          <NavLink to={"/"} className="navlinkstyle">
            YouTube
            {/* <img src={link.image} style={link.style} alt={link.title} /> */}
          </NavLink>
        </Grid>
        <Grid item xs={5}>
          <Typography>Copyright @ TFI & Movers All Rights Reserved.</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>support@tfi.com   +91 9878345654</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
