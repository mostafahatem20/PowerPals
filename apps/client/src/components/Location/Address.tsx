import { useEffect, useState } from "react"
import {
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
  Button,
  IconButton,
} from "@mui/material"
import GoogleMaps from "./GoogleMaps"
import { useLocation, useNavigate } from "react-router-dom"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { patchUserThunk, selectUser } from "../../features/user/userSlice"
import { selectAuth } from "../../features/auth/authSlice"
import { toast } from "react-toastify"

const AddressInformation = ({ onBack }: { onBack: () => void }) => {
  const { id } = useAppSelector(selectAuth)
  const { currentUser } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [address, setAddress] = useState({
    addressName: currentUser?.profile?.addressName,
    street: currentUser?.profile?.street,
    number: currentUser?.profile?.number,
    postalCode: currentUser?.profile?.postalCode,
    city: currentUser?.profile?.city,
    lat: currentUser?.profile?.lat,
    lng: currentUser?.profile?.lng,
    meterNumber: currentUser?.profile?.meterNumber,
    networkProvider: currentUser?.profile?.networkProvider,
  })
  const handleChange = (field: string, value: string) => {
    setAddress({ ...address, [field]: value })
  }
  const handleSubmit = () => {
    if (
      id &&
      address.addressName &&
      address.street &&
      address.number &&
      address.postalCode &&
      address.city &&
      address.lat &&
      address.lng &&
      address.meterNumber &&
      address.networkProvider
    ) {
      dispatch(
        patchUserThunk({
          id,
          body: {
            profile: { ...address },
          },
          isForm: false,
          callback: () => {
            if (
              location.state?.from === "register" ||
              location.state?.from === "home"
            )
              navigate("/home")
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
      setAddress({
        addressName: currentUser?.profile?.addressName,
        street: currentUser?.profile?.street,
        number: currentUser?.profile?.number,
        postalCode: currentUser?.profile?.postalCode,
        city: currentUser?.profile?.city,
        lat: currentUser?.profile?.lat,
        lng: currentUser?.profile?.lng,
        meterNumber: currentUser?.profile?.meterNumber,
        networkProvider: currentUser?.profile?.networkProvider,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentUser)])

  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() =>
              location.state?.from === "home" ? navigate("/home") : onBack()
            }
          >
            <KeyboardBackspaceIcon color="info" />
          </IconButton>
          <Typography color="primary.dark" padding="0 10px" fontSize={16}>
            {location.state?.from === "home" ? "Home" : "Zurück zum Profil"}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Standort Anlegen
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
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          >
            Lege den Standort an, der an der Energiegemeinschaft teilnehmen
            soll.
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Standortbezeichnung"
            focused
            fullWidth
            color="info"
            value={address.addressName}
            required
            onChange={(e) => handleChange("addressName", e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
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
          <GoogleMaps
            label={"Ihren Standort"}
            setPlaceDetails={(placeDetails) =>
              setAddress({ ...address, ...placeDetails })
            }
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
          <Grid
            container
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            columnSpacing={1}
          >
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                label="Straße"
                fullWidth
                color="info"
                value={address.street}
                key={address.street}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Nr."
                fullWidth
                color="info"
                value={address.number}
                key={address.number}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
          </Grid>
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
          <Grid
            container
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            columnSpacing={1}
          >
            {" "}
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                label="PLZ"
                fullWidth
                color="info"
                value={address.postalCode}
                key={address.postalCode}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                label="Ort"
                fullWidth
                color="info"
                value={address.city}
                key={address.city}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
          </Grid>
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Zählernummer"
            focused
            fullWidth
            color="info"
            value={address.meterNumber}
            required
            onChange={(e) => handleChange("meterNumber", e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Netzanbieter"
            focused
            fullWidth
            color="info"
            value={address.networkProvider}
            required
            onChange={(e) => handleChange("networkProvider", e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
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
              Standort Speichern
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default AddressInformation
