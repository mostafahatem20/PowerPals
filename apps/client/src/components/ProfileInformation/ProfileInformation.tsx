import {
  Grid,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Profile,
  patchUserThunk,
  selectUser,
} from "../../features/user/userSlice"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectAuth } from "../../features/auth/authSlice"
import { toast } from "react-toastify"

const ProfileInformation = ({ onBack }: { onBack: () => void }) => {
  const { id } = useAppSelector(selectAuth)
  const { currentUser } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<Profile>({})
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleSubmit = () => {
    if (
      id &&
      profile.type &&
      profile.size &&
      profile.electricityStorage !== undefined &&
      profile.solar !== undefined
    ) {
      dispatch(
        patchUserThunk({
          id,
          body: {
            profile: { ...profile },
          },
          isForm: false,
          callback: () => {
            if (
              location.state?.from === "register" ||
              location.state?.from === "home"
            )
              navigate("/home", { replace: true })
            else onBack()
          },
        }),
      )
    } else {
      toast.error("Please fill all required fields")
    }
  }

  useEffect(() => {
    if (currentUser) {
      setProfile({
        type: currentUser?.profile?.type,
        size: currentUser?.profile?.size,
        electricityStorage: currentUser?.profile?.electricityStorage,
        solar: currentUser?.profile?.solar,
      })
    }
  }, [JSON.stringify(currentUser)])

  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      {location.state?.from === "register" ? (
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
      ) : (
        <Grid item xs={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() =>
                location.state?.from === "home"
                  ? navigate("/home", { replace: true })
                  : onBack()
              }
            >
              <KeyboardBackspaceIcon color="info" />
            </IconButton>
            <Typography color="primary.dark" padding="0 10px" fontSize={16}>
              {location.state?.from === "home" ? "Home" : "Zurück zum Profil"}
            </Typography>
          </div>
        </Grid>
      )}
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
                <ToggleButton value="Privat">Privat</ToggleButton>
                <ToggleButton value="Gewerblich">Gewerblich</ToggleButton>
                <ToggleButton value="Gemeinde">Gemeinde</ToggleButton>
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
                value={profile.size}
                exclusive
                onChange={(_, newNumber) => handleChange("size", newNumber)}
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
