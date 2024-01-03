import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Divider,
  Avatar,
  Button,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getEventThunk,
  registerEventThunk,
  selectEvent,
} from "../features/event/eventSlice"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Date from "../static/Date.png"
import Location from "../static/Location.png"
import dayjs from "dayjs"
import { selectAuth } from "../features/auth/authSlice"
import EventConfirmation from "../components/Confirmation/EventConfirmation"
import EventRegister from "../components/EventRegister/EventRegister"

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, currentEvent } = useAppSelector(selectEvent)
  const { token } = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState<"details" | "register" | "confirm">("details")

  useEffect(() => {
    if (id && (!currentEvent || currentEvent.id !== Number(id))) {
      dispatch(getEventThunk({ id: Number(id) }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const date = dayjs(currentEvent?.eventDateTime)
  // Set locale to German
  dayjs.locale("de")

  if (tab === "confirm") return <EventConfirmation event={currentEvent!} />
  if (tab === "register")
    return (
      <EventRegister
        eventId={Number(id)}
        onBack={() => setTab("details")}
        onSuccess={() => setTab("confirm")}
      />
    )

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "#24345F", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Grid container rowSpacing={3} padding="5% 5%">
        <Grid item xs={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/event")}>
              <KeyboardBackspaceIcon color="info" />
            </IconButton>
            <Typography color="primary.dark" padding="0 10px" fontSize={16}>
              Event Übersicht
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary.dark">
            {currentEvent?.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                src={Date}
                alt="DateIcon"
                style={{ width: 48, height: 48, borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" color="info.dark" fontSize={16}>
                {date.format("DD. MMMM YYYY")}
              </Typography>
              <Typography variant="body1" fontSize={12}>
                {date.format("dddd [um] HH:mm")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                src={Location}
                alt="LocationIcon"
                style={{ width: 48, height: 48, borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" color="info.dark" fontSize={16}>
                Hörsaal 1
              </Typography>
              <Typography variant="body1" fontSize={12}>
                {`${currentEvent?.street} ${currentEvent?.number}, ${currentEvent?.postalCode} ${currentEvent?.city}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                src={`http://localhost:3000/files/${currentEvent?.createdBy?.profile?.profileImage}`}
                alt={currentEvent?.createdBy?.name}
                style={{ width: 48, height: 48, borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" color="info.dark" fontSize={16}>
                {currentEvent?.createdBy?.name}
              </Typography>
              <Typography variant="body1" fontSize={12}>
                Organizer
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="info.dark">
            Über das Events
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="info.dark"
            fontSize={16}
            fontWeight={"regular"}
          >
            {currentEvent?.info}
          </Typography>
        </Grid>
        {token ? (
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
                  borderRadius: "15px",
                }}
                color="primary"
                onClick={() =>
                  dispatch(
                    registerEventThunk({
                      id: Number(id),
                      callback: () => setTab("confirm"),
                    }),
                  )
                }
              >
                <Typography variant="body1" color="secondary">
                  Anmelden
                </Typography>
              </Button>
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
              <Button
                variant="contained"
                style={{
                  width: "225px",
                  height: "56px",
                  borderRadius: "15px",
                }}
                color="info"
                onClick={() => setTab("register")}
              >
                <Typography variant="body1" color="secondary">
                  Zur Anmeldung
                </Typography>
              </Button>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default EventDetails
