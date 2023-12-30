import { Divider, Grid, Typography, useTheme } from "@mui/material"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import VerticalLinearStepper from "../components/Stepper/Stepper"
import UsersList from "../components/UsersList/UsersList"

const Home = () => {
  const theme = useTheme()
  return (
    <>
      <Grid container rowSpacing={3} padding="5% 5%" marginBottom="80px">
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary.dark">
            Hallo [XYZ]
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
          <VerticalLinearStepper stepsStatus={[true, true, false, false]} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="info.dark">
            PowerPals in deiner Umgebung
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UsersList
            users={[
              { name: "Mostafa123", email: "mostafahatem@gmail.com" },
              { name: "Rostafa123", email: "rostafahatem@gmail.com" },
            ]}
          />
        </Grid>
      </Grid>
      <FixedBottomNavigation value={0} />
    </>
  )
}

export default Home
