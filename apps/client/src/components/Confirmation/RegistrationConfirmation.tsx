import React from "react"
import Check from "../../static/Check.png"
import { Grid, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const RegistrationConfirmation = () => {
  const navigate = useNavigate()
  return (
    <Grid container padding="5% 5%" style={{ height: "100vh" }}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2%",
          }}
        >
          <img src={Check} alt="check" />
        </div>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Der erste Schritt ist erledigt
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" textAlign="center">
          Deine Verifikation war erfolgreich
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              width: "225px",
              height: "56px",
              textTransform: "capitalize",
              borderRadius: "15px",
            }}
            color="info"
            onClick={() => navigate("/profile")}
          >
            <Typography variant="body1" color="secondary">
              Weiter Geht’s
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default RegistrationConfirmation
