import { useState } from "react"
import {
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
  Button,
} from "@mui/material"
import GoogleMaps, { PlaceDetails } from "./GoogleMaps"
import { useNavigate } from "react-router-dom"

interface Address {
  name?: string
  placeDetails?: PlaceDetails
  meterNumber?: string
  networkProvider?: string
}
const AddressInformation = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [address, setAddress] = useState<Address>({})
  const handleChange = (field: string, value: string) => {
    console.log(field, value)
    setAddress({ ...address, [field]: value })
  }
  const handleSubmit = () => {
    console.log(address)
    navigate("/home")
  }

  return (
    <Grid container rowSpacing={3} padding="5% 5%" columnSpacing={1}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Standort Anlegen
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Lege den Standort an, der an der Energiegemeinschaft teilnehmen soll.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Standortbezeichnung"
          focused
          fullWidth
          color="info"
          value={address.name}
          required
          onChange={(e) => handleChange("name", e.target.value)}
          InputProps={{
            style: {
              color: theme.palette.info.light,
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <GoogleMaps
          setPlaceDetails={(placeDetails) =>
            setAddress({ ...address, placeDetails })
          }
        />
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          label="Straße"
          fullWidth
          color="info"
          value={address.placeDetails?.street}
          key={address.placeDetails?.street}
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
          value={address.placeDetails?.number}
          key={address.placeDetails?.number}
          disabled
          InputProps={{
            style: {
              color: theme.palette.info.light,
            },
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          variant="outlined"
          label="PLZ"
          fullWidth
          color="info"
          value={address.placeDetails?.postalCode}
          key={address.placeDetails?.postalCode}
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
          value={address.placeDetails?.city}
          key={address.placeDetails?.city}
          disabled
          InputProps={{
            style: {
              color: theme.palette.info.light,
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TextField
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
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TextField
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
      </Grid>
      <Grid item xs={12}>
        <Divider />
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
