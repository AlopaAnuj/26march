import React from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from "@mui/material";
import '../AccountAdmin/ListOfState.css';
import { Card, CardContent, Typography } from "@mui/material";
import profilePhoto from "./profile.png"
import NavBar from "../PublicPage/NavBar";
import Footer from "../PublicPage/Footer";

export default function UserHome() {
  const [condidate, setCondidate] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/userservice/getAllCondidates`, {
      method: 'GET',
      headers: {
        'x-access-token': user.acessToken,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.result.length > 0) {
          setCondidate(r.result)
        }
      })
  }, [])
  const handleAddCondidate = () => {
    navigate("/createcondidates")
  }

  return (
    <div>
      <NavBar />
      <div className="pagestyle">
      <Grid container spacing={2} >
        <Grid item xs={9}>
        <Typography  style={{ fontSize: "24px", color: "blue", fontWeight: 600 }}>List of Condidates of <b>{user.userName}</b></Typography>
        <Typography style={{ fontSize: "16px", color: "blue", fontWeight: 50 }}>You have logged in as a State Admin. Here you will be able to see list of State condidates. On clicking on "Add New Condidate" Button you will be able to register new condidate.</Typography>
        </Grid>
        <Grid item xs={3} style={{ textAlign: "end" }}>
          <button className="buttonStyle" onClick={handleAddCondidate}>Add New Condidate</button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2} >
        {condidate.map((item, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card
                style={{
                  margin: "20px",
                  borderRadius: "15px",
                  backgroundColor: "#FFFFED",
                }}
              >
                <CardContent>
                  <div style={{textAlign:"center"}}><img src={item.photo?item.photo:profilePhoto} className="img-profile" /></div>
                  <Typography>Name: {item.fullName}</Typography>
                  <Typography>Guardian: {item.guardianName}</Typography>
                  <Typography>DOB: {item.dateOfBirth}</Typography>
                  <Typography>Gender: {item.gender}</Typography>
                  <Typography>Contact: {item.contactNumber}</Typography>
                  <Typography>Email Id: {item.email}</Typography>
                  <Typography>PrimaryRole: {item.primaryRole}</Typography>
                  <Typography>Secondary Role: {item.secondaryRole}</Typography>
                  <Typography>Other Role: {item.otherRole ? item.otherRole : "NA"}</Typography>
                  <Typography>Email Id: {item.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })} </Grid>
        </div>
        <Footer />
    </div>
  );
}
