import {
  Grid,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  TextField,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import RegistrationConfirmation from "../components/Confirmation/RegistrationConfirmation"
import {
  loginThunk,
  registerThunk,
  selectAuth,
} from "../features/auth/authSlice"
import { toast } from "react-toastify"
import { User } from "../features/user/userSlice"

const Register = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const { loading } = useAppSelector(selectAuth)
  const [user, setUser] = useState<User>({})
  const [success, setSuccess] = useState(false)
  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value })
  }
  const handleSubmit = () => {
    if (user.type && user.name && user.password && user.email) {
      dispatch(
        registerThunk({
          email: user.email,
          name: user.name,
          password: user.password,
          type: user.type as "user" | "organizer",
          callback: () =>
            dispatch(
              loginThunk({
                email: user.email!,
                password: user.password!,
                callback: () => {
                  setUser({})
                  setSuccess(true)
                },
              }),
            ),
        }),
      )
    } else {
      toast.error("Please fill all required fields")
    }
  }
  if (success) return <RegistrationConfirmation />

  return (
    <Grid container rowSpacing={5} padding="5% 5%">
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
            onClick={() => navigate("/wiki")}
          >
            <Typography variant="body2" color="inherit">
              Überspringen
            </Typography>
          </Button>
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
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Typography variant="caption" color="primary.dark">
              Account-Typ
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
                value={user.type}
                exclusive
                onChange={(_, newType) => handleChange("type", newType)}
                aria-label="User Type"
                size="large"
              >
                <ToggleButton value="user">User</ToggleButton>
                <ToggleButton value="organizer">Organizer</ToggleButton>
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Name"
            focused
            fullWidth
            color="info"
            value={user.name}
            required
            onChange={(e) => handleChange("name", e.target.value)}
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
            value={user.email}
            required
            onChange={(e) => handleChange("email", e.target.value)}
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
            label="Password"
            focused
            fullWidth
            color="info"
            value={user.password}
            required
            onChange={(e) => handleChange("password", e.target.value)}
            type="password"
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
            onClick={loading ? () => {} : handleSubmit}
          >
            <Typography variant="body1" color="secondary">
              Registrieren
            </Typography>
          </Button>
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
          <Typography variant="body2" color="info.light">
            Bereits einen Account?
          </Typography>
          <Link to="/login">
            <Typography variant="body2" color="primary.dark" paddingLeft="5px">
              Anmelden
            </Typography>
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}
export default Register
