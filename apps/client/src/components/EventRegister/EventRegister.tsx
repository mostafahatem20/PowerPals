import {
  Grid,
  IconButton,
  Typography,
  TextField,
  useTheme,
  Button,
} from "@mui/material"
import { useState } from "react"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useAppDispatch } from "../../app/hooks"
import { registerEventThunk } from "../../features/event/eventSlice"
import { toast } from "react-toastify"
const EventRegister = ({
  eventId,
  onBack,
  onSuccess,
}: {
  eventId: number
  onBack: () => void
  onSuccess: () => void
}) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const [user, setUser] = useState<any>({})
  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onBack}>
            <KeyboardBackspaceIcon color="info" />
          </IconButton>
          <Typography color="primary.dark" padding="0 10px" fontSize={16}>
            Event Details
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Werde Teil einer Revolution
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Vorname"
            focused
            fullWidth
            color="info"
            value={user?.firstName}
            required
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Nachname"
            focused
            fullWidth
            color="info"
            value={user?.lastName}
            required
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Email"
            focused
            fullWidth
            color="info"
            value={user?.email}
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          <Button
            variant="contained"
            style={{
              width: "225px",
              height: "56px",
              textTransform: "capitalize",
              borderRadius: "15px",
            }}
            color="info"
            onClick={() => {
              if (user.firstName && user.lastName && user.email) {
                dispatch(
                  registerEventThunk({
                    id: eventId,
                    body: {
                      name: `${user.firstName} ${user.lastName}`,
                      email: user.email,
                    },
                    callback: onSuccess,
                  }),
                )
              } else {
                toast.error("Please fill all required fields")
              }
            }}
          >
            <Typography variant="body1" color="secondary">
              Anmelden
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default EventRegister
