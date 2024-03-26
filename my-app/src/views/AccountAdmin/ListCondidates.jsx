import React from "react";
import { Card, Grid, CardContent, Typography, Button, CardActions } from "@mui/material";
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ListOfState.css';
import profilePhoto from "../Users/profile.png"
import NavBar from "../PublicPage/NavBar";
import Footer from "../PublicPage/Footer";

export default function AdminCard(props) {
  const [condidate, setCondidate] = useState([])
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  let stateId = location.pathname.split("/")[2]
  useEffect(() => {
    fetch(`/api/adminservice/getAllCondidateOfState/${stateId}`, {
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
const handleBack = () => {
  navigate('/adminhome')
}
  return (
    <div>
      <NavBar />
    <div className="pagestyle">
      <Grid container spacing={2} >
        <Grid item xs={4}>
          <button className="buttonStyle" onClick={handleBack}>Back To Home</button>
        </Grid>
      {condidate.length>0&&<Grid item xs={4} style={{display:"flex"}}>
         <Typography style={{fontSize:"20px", fontWeight:600, color:"#551A8B"}}>State: {condidate[0].state}</Typography>
         {/* <Typography style={{fontSize:"20px", fontWeight:600, marginLeft: "10px", color:"blue"}}> District: {condidate[0].district}</Typography> */}
      </Grid>}
        </Grid>
        
      <Grid container spacing={2} >
      {condidate&&condidate.map((item)=>{
         return ( <Grid item xs={4}>
            <Card
              style={{
                margin: "20px",
                borderRadius: "15px",
                backgroundColor: "#FFFFED",
              }}
            >
              <CardContent>
                <div style={{textAlign:"left"}}><img src={profilePhoto} className="img-profile" /></div>
                <Typography> Name: {item.fullName}</Typography>
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
          </Grid>)
      })}
      </Grid>
     </div>
     <Footer />
    </div>
  );
}
