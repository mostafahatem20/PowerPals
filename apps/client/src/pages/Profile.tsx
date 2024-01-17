import {
  Grid,
  Typography,
  Divider,
  Avatar,
  Badge,
  Button,
  Paper,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material"
import { useState, useEffect, useRef } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Address from "../components/Location/Address"
import ProfileInformation from "../components/ProfileInformation/ProfileInformation"
import EditIcon from "@mui/icons-material/Edit"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getUserThunk,
  patchUserThunk,
  selectUser,
} from "../features/user/userSlice"
import { logout, selectAuth } from "../features/auth/authSlice"
import SupportCenter from "../components/SupportCenter/SupportCenter"
import { toast } from "react-toastify"
const Profile = () => {
  const { currentUser } = useAppSelector(selectUser)
  const { id, type } = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<any>(null)
  const theme = useTheme()
  const [edit, setEdit] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    currentUser?.profile?.telephoneNumber,
  )
  const location = useLocation()
  const [tab, setTab] = useState<
    "profile" | "address" | "profileInfo" | "help"
  >(
    location.state?.from === "register"
      ? "profileInfo"
      : location.state?.from === "home"
      ? location.state?.edit
      : "profile",
  )

  const handleChangeImage = (e: any) => {
    const file = e.target.files[0]
    if (file && id) {
      const formData = new FormData()
      formData.append("file", file)
      dispatch(
        patchUserThunk({
          id,
          body: formData,
          isForm: true,
        }),
      )
    }
  }
  const handleSave = () => {
    if (phoneNumber && id) {
      dispatch(
        patchUserThunk({
          id,
          body: {
            profile: { telephoneNumber: phoneNumber },
          },
          isForm: false,
          callback: () => setEdit(false),
        }),
      )
    } else {
      toast.error("Phone number cannot be empty")
    }
  }
  useEffect(() => {
    if (id) dispatch(getUserThunk({ id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (tab === "address") return <Address onBack={() => setTab("profile")} />

  if (tab === "profileInfo")
    return <ProfileInformation onBack={() => setTab("profile")} />

  if (tab === "help") return <SupportCenter onBack={() => setTab("profile")} />

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        padding="5% 5%"
        marginBottom="80px"
        columnSpacing={1}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary.dark">
            Profil
          </Typography>
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
            <Badge
              color="primary"
              badgeContent={
                <IconButton
                  onClick={() => {
                    fileInputRef.current.click()!
                  }}
                >
                  <EditIcon color="secondary" />
                </IconButton>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              overlap="circular"
            >
              <Avatar
                alt={currentUser?.name}
                src={`http://localhost:3000/files/${currentUser?.profile?.profileImage}`}
                style={{ width: 136, height: 136 }}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChangeImage}
              />
            </Badge>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            color="primary.dark"
            fontSize={20}
            textAlign="center"
          >
            {currentUser?.name}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  fontSize={20}
                  style={{ display: "inline-block" }}
                >
                  {"Persönliche Information"}
                </Typography>
              </div>
              {edit ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button color="error" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSave()}>Save</Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => setEdit(true)}
                >
                  <EditOutlinedIcon color="primary" />
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    fontSize={14}
                    style={{ display: "inline-block" }}
                  >
                    {"Bearbeiten"}
                  </Typography>
                </div>
              )}
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
            <Paper
              elevation={1}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "15px 10px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setTab("profileInfo")}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  fontSize={16}
                  style={{ display: "inline-block" }}
                >
                  {"Allgemeine Profil-Informationen"}
                </Typography>
              </div>
              <IconButton>
                <KeyboardArrowRightIcon color="info" />
              </IconButton>
            </Paper>
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
            <Paper
              elevation={1}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "15px 10px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  fontSize={16}
                  style={{ display: "inline-block" }}
                >
                  {"Email"}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="info.light"
                style={{ display: "inline-block" }}
              >
                {currentUser?.email}
              </Typography>
            </Paper>
          </div>
        </Grid>
        {edit ? (
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
                label="Telefonnummer"
                focused
                fullWidth
                color="info"
                value={phoneNumber}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </div>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={1}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "15px 10px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary.dark"
                    fontSize={16}
                    style={{ display: "inline-block" }}
                  >
                    {"Telefonnummer"}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="info.light"
                  style={{ display: "inline-block" }}
                >
                  {currentUser?.profile?.telephoneNumber}
                </Typography>
              </Paper>
            </div>
          </Grid>
        )}

        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={1}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "15px 10px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setTab("address")}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  fontSize={16}
                  style={{ display: "inline-block" }}
                >
                  {"Meine Standorte"}
                </Typography>
              </div>
              <IconButton>
                <KeyboardArrowRightIcon color="info" />
              </IconButton>
            </Paper>
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
            <Paper
              elevation={1}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "15px 10px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setTab("help")}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  fontSize={16}
                  style={{ display: "inline-block" }}
                >
                  {"Hilfe & Support"}
                </Typography>
              </div>
              <IconButton>
                <KeyboardArrowRightIcon color="info" />
              </IconButton>
            </Paper>
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
              variant="outlined"
              color="error"
              style={{
                width: "210px",
                height: "63px",
                textTransform: "capitalize",
                borderRadius: "16px",
              }}
              onClick={() => dispatch(logout())}
            >
              <Typography variant="body1" color="error">
                Abmelden
              </Typography>
            </Button>
          </div>
        </Grid>
      </Grid>
      <FixedBottomNavigation value={type === "user" ? 3 : 4} />
    </>
  )
}

export default Profile
