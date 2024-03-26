import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../PublicPage/NavBar";
import Footer from "../PublicPage/Footer";
import './ListOfState.css';

export default function AdminHome() {
  const [userList, setuserList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    fetch('/api/adminservice/getAllStateUsers', {
      method: 'GET',
      headers: {
        'x-access-token': user.acessToken,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setuserList(r.result);
      })
  }, []);
  const handleCallCadidateList = (item) => {
    console.log(item)
    navigate(`/listofcondidates/${item.id}`)
  }

  return (
    <div >
      <NavBar />
      <div className="pagestyle">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography style={{ fontSize: "24px", color: "#551A8B", fontWeight: 600 }}>Welcome to Admin Dashboard.</Typography>
            <Typography style={{ fontSize: "16px", color: "#551A8B", fontWeight: 50 }}>Here we are showing the list of States. On clicking on "VIEW CONDIDATES" Button Admin can see the list of condidates of that state.</Typography>
          </Grid>
          {userList && userList.map((item) => {
            return <Grid item xs={4} style={{ textAlign: "center" }}>
              <Card
                style={{
                  margin: "20px",
                  borderRadius: "15px",
                  backgroundColor: "#FFFFED",
                }}
              >
                <CardContent>
                  <Typography style={{ padding: "10px", fontSize: "20px", color: "#551A8B" }}>State: {item.stateName}</Typography>
                  <Button size="small" onClick={() => {
                    handleCallCadidateList(item);
                  }} >View condidates</Button>
                </CardContent>
              </Card>
            </Grid>
          })}
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
