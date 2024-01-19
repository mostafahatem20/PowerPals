import React, { useEffect } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import {
  Divider,
  Grid,
  Typography,
  useTheme,
  Button,
  Stack,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { selectUser, getUserThunk } from "../features/user/userSlice"

const Community = () => {
  const theme = useTheme()
  const { name, id } = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const { currentUser } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id && currentUser?.id !== id) dispatch(getUserThunk({ id }))
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
            Community&nbsp;
            <span style={{ color: theme.palette.primary.light }}>Gründen</span>,
            Mitglieder&nbsp;
            <span style={{ color: theme.palette.primary.light }}>Gewinnen</span>
            , Gemeinsam die &nbsp;
            <span style={{ color: theme.palette.primary.light }}>
              Energiewende Beschleunigen
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            height="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant="contained"
              style={{
                width: "272px",
                height: "54px",
                textTransform: "capitalize",
                borderRadius: "15px",
              }}
              color="info"
              onClick={() =>
                navigate("/create-community", {
                  state: {
                    community: {
                      Ziele: false,
                      Erzeugung: false,
                      Nahbereisabfrage: false,
                      Registrierung: false,
                      Statuten: false,
                      Vereinsbehörde: false,
                      Gründungsbescheid: false,
                      Vereinbarung_1: false,
                      Vereinbarung_2: false,
                      Regelungen: false,
                      ebutilities: false,
                      Marktpartner_ID: false,
                      Netzbetreiber: false,
                      Vertragsvorbereitung: false,
                      Vertragsfertigstellung: false,
                      EDA: false,
                      Angelegt: false,
                      Freigeschaltet: false,
                      Ausgestattet: false,
                      Zugestimmt: false,
                    },
                  },
                })
              }
            >
              <Typography variant="body1" color="secondary">
                Energy Community Gründen
              </Typography>
            </Button>
            <div style={{ color: "#A9A9A9" }}>
              <Button
                variant="outlined"
                color="inherit"
                style={{
                  width: "272px",
                  height: "54px",
                  textTransform: "capitalize",
                  borderRadius: "15px",
                }}
                onClick={() =>
                  navigate("/create-community", {
                    state: {
                      community: currentUser?.community || {
                        Ziele: false,
                        Erzeugung: false,
                        Nahbereisabfrage: false,
                        Registrierung: false,
                        Statuten: false,
                        Vereinsbehörde: false,
                        Gründungsbescheid: false,
                        Vereinbarung_1: false,
                        Vereinbarung_2: false,
                        Regelungen: false,
                        ebutilities: false,
                        Marktpartner_ID: false,
                        Netzbetreiber: false,
                        Vertragsvorbereitung: false,
                        Vertragsfertigstellung: false,
                        EDA: false,
                        Angelegt: false,
                        Freigeschaltet: false,
                        Ausgestattet: false,
                        Zugestimmt: false,
                      },
                    },
                  })
                }
              >
                <Typography variant="body1" color="inherit">
                  Fortsetzen
                </Typography>
              </Button>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <FixedBottomNavigation value={3} />
    </>
  )
}

export default Community
