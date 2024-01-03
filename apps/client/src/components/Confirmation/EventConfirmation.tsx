import React from "react"
import Check from "../../static/Check.png"
import {
  Grid,
  Button,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { EventDetails } from "../../features/event/eventSlice"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Date from "../../static/Date.png"
import Location from "../../static/Location.png"
import dayjs from "dayjs"
const EventConfirmation = ({ event }: { event: EventDetails }) => {
  const navigate = useNavigate()
  const date = dayjs(event.eventDateTime)
  // Set locale to German
  dayjs.locale("de")
  return (
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2%",
          }}
        >
          <img src={Check} alt="check" />
        </div>
        <Typography variant="subtitle1" color="primary.dark" textAlign="center">
          Du hast dich erfolgreich für folgendes event angemeldet
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" textAlign="center" fontSize={24}>
          {event.title}
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
              {`${event?.street} ${event?.number}, ${event?.postalCode} ${event?.city}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              src={`http://localhost:3000/files/${event?.createdBy?.profile?.profileImage}`}
              alt={event?.createdBy?.name}
              style={{ width: 48, height: 48, borderRadius: "4px" }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" color="info.dark" fontSize={16}>
              {event?.createdBy?.name}
            </Typography>
            <Typography variant="body1" fontSize={12}>
              Organizer
            </Typography>
          </Grid>
        </Grid>
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
            onClick={() => navigate("/event")}
          >
            <Typography variant="body1" color="secondary">
              Zur Event Übersicht
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default EventConfirmation
