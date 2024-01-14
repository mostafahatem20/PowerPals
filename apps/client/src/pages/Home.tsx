import { Divider, Grid, Typography, useTheme, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import VerticalLinearStepper from "../components/Stepper/Stepper"
import UsersList from "../components/UsersList/UsersList"
import { selectAuth } from "../features/auth/authSlice"
import {
  clearUsers,
  getUsersThunk,
  getUserThunk,
  selectUser,
} from "../features/user/userSlice"

const Home = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { currentUser, users } = useAppSelector(selectUser)
  const { id, name } = useAppSelector(selectAuth)
  const [page, setPage] = useState(1)

  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    if (id && currentUser?.id !== id) {
      dispatch(getUserThunk({ id }))
      dispatch(clearUsers())
    }
    if (currentUser?.profile?.lat && currentUser.profile.lng) {
      setCanLoad(true)
      dispatch(
        getUsersThunk({
          page,
          limit: 10,
          byDistance: true,
          callback: (l) => {
            if (l < 10) {
              setCanLoad(false)
            }
          },
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentUser?.id])

  return (
    <>
      <Grid container rowSpacing={3} padding="5% 5%" marginBottom="80px">
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary.dark">
            Hallo {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Willkommen in der PowerPal App. Starte deine Energiewende mit einer
            Fingerbewegung.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ overflow: "hidden", borderRadius: "30px" }}>
            <iframe
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/sUvaYycoWqI?si=Do6dMzlOEhaxkkqZ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="info.dark">
            Standort&nbsp;
            <span style={{ color: theme.palette.primary.light }}>Anlegen</span>,
            Community&nbsp;
            <span style={{ color: theme.palette.primary.light }}>
              Beitreten
            </span>
            , Gemeinsam die &nbsp;
            <span style={{ color: theme.palette.primary.light }}>
              Energiewende Beschleunigen
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="info.dark">
            Aktueller Status
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <VerticalLinearStepper
            stepsStatus={[
              !!currentUser?.profile,
              !!currentUser?.profile?.lat,
              false,
              false,
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {users.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="info.dark">
              PowerPals in deiner Umgebung
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <UsersList users={users} />
        </Grid>
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
                    getUsersThunk({
                      page: page + 1,
                      limit: 10,
                      byDistance: true,
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
      <FixedBottomNavigation value={0} />
    </>
  )
}

export default Home
