import {
  Grid,
  Typography,
  Divider,
  Avatar,
  Badge,
  Button,
  Paper,
  IconButton,
} from "@mui/material"
import { useState } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Address from "../components/Location/Address"
import ProfileInformation from "../components/ProfileInformation/ProfileInformation"
import EditIcon from "@mui/icons-material/Edit"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
const Profile = () => {
  const [tab] = useState<"profile" | "address" | "profileInfo" | "help">(
    "profile",
  )

  if (tab === "address") return <Address />

  if (tab === "profileInfo") return <ProfileInformation />

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
              badgeContent={<EditIcon color="secondary" />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              overlap="circular"
            >
              <Avatar
                alt="Remy Sharp"
                src=""
                style={{ width: 136, height: 136 }}
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
            Max Mustermann
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
              <>
                <EditOutlinedIcon color="primary" />
                <Typography
                  variant="subtitle2"
                  color="primary"
                  fontSize={14}
                  style={{ display: "inline-block" }}
                >
                  {"Bearbeiten"}
                </Typography>
              </>
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
                {"max.mustermann@gmail.com"}
              </Typography>
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
                  {"Telefonnummer"}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="info.light"
                style={{ display: "inline-block" }}
              >
                {"+49 547 599 541"}
              </Typography>
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
            >
              <Typography variant="body1" color="error">
                Abmelden
              </Typography>
            </Button>
          </div>
        </Grid>
      </Grid>
      <FixedBottomNavigation value={3} />
    </>
  )
}

export default Profile
