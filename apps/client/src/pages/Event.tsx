import { Grid, Typography, Divider, TextField, useTheme } from "@mui/material"
import { useState } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PlaceIcon from "@mui/icons-material/Place"
import EventCard from "../components/Card/EventCard"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/auth/authSlice"
import { PlaceDetails, User } from "../features/user/userSlice"

export interface EventDetails {
  id?: number
  title?: string
  date?: Date
  location?: PlaceDetails
  user?: User
  info?: string
}

const events: EventDetails[] = [
  {
    title: "Energieversammlung NP",
    date: new Date(),
    info: "Kostenlos",
    location: { street: "Arcissstrasse", number: 73 },
  },
  {
    title: "Energieversammlung NP",
    date: new Date(),
    info: "Kostenlos",
    location: { street: "Arcissstrasse", number: 73 },
  },
  {
    title: "Energieversammlung NP",
    date: new Date(),
    info: "Kostenlos",
    location: { street: "Arcissstrasse", number: 73 },
  },
  {
    title: "Energieversammlung NP",
    date: new Date(),
    info: "Kostenlos",
    location: { street: "Arcissstrasse", number: 73 },
  },
]

const Event = () => {
  const theme = useTheme()
  const { token } = useAppSelector(selectAuth)
  const [search, setSearch] = useState<string>()

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
            Event Übersicht
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Search..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon color="info" />
            <Typography color="primary.dark" padding="0 10px" fontSize={14}>
              An meinem aktuellen Standort
            </Typography>
          </div>
        </Grid>
        {events.map((event, index) => (
          <Grid key={index} item lg={4} md={6} xs={12}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>

      <FixedBottomNavigation value={token ? 2 : 1} />
    </>
  )
}

export default Event
