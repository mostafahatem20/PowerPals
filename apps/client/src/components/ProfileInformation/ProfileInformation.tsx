import {
  Grid,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface Profile {
  number?: string
  type?: string
  solar?: boolean
  electricityStorage?: boolean
}
const ProfileInformation = () => {
  const [profile, setProfile] = useState<Profile>({})
  const theme = useTheme()
  const navigate = useNavigate()

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleSubmit = () => {
    console.log(profile)
    navigate("/home")
  }
  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: theme.palette.info.light,
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            style={{
              textTransform: "capitalize",
              borderRadius: "10px",
              padding: "10px 25px",
            }}
            onClick={() => navigate("/home")}
          >
            <Typography variant="body2" color="inherit">
              Überspringen
            </Typography>
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Profil Vervollständigen
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
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            Hilf uns dabei, dich besser kennenzulernen.
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Typography variant="body1" color="info.dark">
              Welcher Benutzer Typ bist du?
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
                color: theme.palette.info.light,
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={profile.type}
                exclusive
                onChange={(_, newType) => handleChange("type", newType)}
                aria-label="User Type"
                size="large"
              >
                <ToggleButton value="PRIVAT">Privat</ToggleButton>
                <ToggleButton value="GEWERBLICH">Gewerblich</ToggleButton>
                <ToggleButton value="GEMEINDE">Gemeinde</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Typography variant="body1" color="info.dark">
              Wie viele Personen?
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
                color: theme.palette.info.light,
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={profile.number}
                exclusive
                onChange={(_, newNumber) => handleChange("number", newNumber)}
                aria-label="User Type"
                size="large"
              >
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
                <ToggleButton value="4+">4+</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Typography variant="body1" color="info.dark">
              Details zu deiner Energieproduktion
            </Typography>
            <Typography
              variant="body1"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              Photovoltaik-Anlage
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
                color: theme.palette.info.light,
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={profile.solar}
                exclusive
                onChange={(_, newSolar) => handleChange("solar", newSolar)}
                aria-label="User Type"
                size="large"
              >
                <ToggleButton value={true}>Ja</ToggleButton>
                <ToggleButton value={false}>Nein</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Typography
              variant="body1"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              Stromspeicher
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
                color: theme.palette.info.light,
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={profile.electricityStorage}
                exclusive
                onChange={(_, newElectricityStorage) =>
                  handleChange("electricityStorage", newElectricityStorage)
                }
                aria-label="User Type"
                size="large"
              >
                <ToggleButton value={true}>Ja</ToggleButton>
                <ToggleButton value={false}>Nein</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
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
            onClick={handleSubmit}
          >
            <Typography variant="body1" color="secondary">
              Speichern
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default ProfileInformation
