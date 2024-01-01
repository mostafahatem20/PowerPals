import React from "react"
import { Grid, Button, Typography, TextField, useTheme } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { loginThunk } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import { User } from "../features/user/userSlice"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const [user, setUser] = useState<User>({})
  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value })
  }
  const handleSubmit = () => {
    if (user.email && user.password) {
      dispatch(
        loginThunk({
          email: user.email,
          password: user.password,
          callback: () => navigate("/home"),
        }),
      )
    } else {
      toast.error("Please fill all required fields!")
    }
  }
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
              Zur Übersicht
            </Typography>
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Willkommen zurück, powerpal!
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
            onClick={handleSubmit}
          >
            <Typography variant="body1" color="secondary">
              Anmelden
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
            Noch keinen Account?
          </Typography>
          <Link to="/register">
            <Typography variant="body2" color="primary.dark" paddingLeft="5px">
              Registrieren
            </Typography>
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

export default Login
