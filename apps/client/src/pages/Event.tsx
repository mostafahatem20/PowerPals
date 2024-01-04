import {
  Grid,
  Typography,
  Divider,
  TextField,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material"
import { useState, useEffect } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import PlaceIcon from "@mui/icons-material/Place"
import EventCard from "../components/Card/EventCard"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/auth/authSlice"
import { getEventsThunk, selectEvent } from "../features/event/eventSlice"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

const Event = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token, type } = useAppSelector(selectAuth)
  const { loadingEvents, events } = useAppSelector(selectEvent)
  const [search, setSearch] = useState<string>()
  const [page, setPage] = useState(1)
  const [canLoad, setCanLoad] = useState(true)

  useEffect(() => {
    setCanLoad(true)
    setPage(1)
    dispatch(
      getEventsThunk({
        page: 1,
        limit: 10,
        callback: (l) => {
          if (l < 10) {
            setCanLoad(false)
          }
        },
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
        {type === "organizer" && (
          <Grid item xs={12}>
            {" "}
            <Button
              onClick={() => {
                navigate("/create-event")
              }}
            >
              <AddIcon color="primary" />
              <Typography color="primary" padding="0 10px" fontSize={14}>
                Add Event
              </Typography>
            </Button>
          </Grid>
        )}
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
        {loadingEvents && events.length === 0 ? (
          <Grid item xs={12}>
            <CircularProgress color="info" />
          </Grid>
        ) : events.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="info.dark">
              No Results Found
            </Typography>
          </Grid>
        ) : (
          events.map((event, index) => (
            <Grid key={index} item lg={4} md={6} xs={12}>
              <EventCard event={event} />
            </Grid>
          ))
        )}
        {canLoad && (
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
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
                onClick={() => {
                  setPage(page + 1)
                  dispatch(
                    getEventsThunk({
                      page: page + 1,
                      limit: 10,
                      callback: (l) => {
                        if (l < 10) {
                          setCanLoad(false)
                        }
                      },
                    }),
                  )
                }}
              >
                <Typography variant="body2" color="inherit">
                  Mehr laden
                </Typography>
              </Button>
            </div>
          </Grid>
        )}
      </Grid>

      <FixedBottomNavigation value={token ? 2 : 1} />
    </>
  )
}

export default Event
