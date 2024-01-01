import {
  Grid,
  IconButton,
  Typography,
  Divider,
  Avatar,
  Paper,
  useTheme,
} from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Card from "../../static/Card.png"
import Money from "../../static/Money.png"
import Support from "../../static/Support.png"
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined"

const SupportCenter = ({ onBack }: { onBack: () => void }) => {
  const theme = useTheme()
  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => onBack()}>
            <KeyboardBackspaceIcon color="info" />
          </IconButton>
          <Typography color="primary.dark" padding="0 10px" fontSize={16}>
            Zurück zum Profil
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark">
          Support Center
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Hier findest du die Antworten auf deine Fragen.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Avatar
          alt={"Card"}
          src={Card}
          style={{ width: 40, height: 40, margin: "5px 0" }}
        />
        <Typography variant="body1" color="info.dark" fontSize={12}>
          Is there a chat function to engage with fellow PowerPals?
        </Typography>
        <Typography variant="body1" style={{ margin: "5px 0" }} fontSize={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacinia
          dolor, mattis elementum, egestas fermentum pulvinar ut porttitor
          morbi. Amet, amet donec vivamus a mi tortor interdum a. Quam urna
          condimentum turpis dui duis.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Avatar
          alt={"Card"}
          src={Card}
          style={{ width: 40, height: 40, margin: "5px 0" }}
        />
        <Typography variant="body1" color="info.dark" fontSize={12}>
          What can I do if....
        </Typography>
        <Typography variant="body1" style={{ margin: "5px 0" }} fontSize={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Avatar
          alt={"Money"}
          src={Money}
          style={{ width: 40, height: 40, margin: "5px 0" }}
        />
        <Typography variant="body1" color="info.dark" fontSize={12}>
          How can I ...
        </Typography>
        <Typography variant="body1" style={{ margin: "5px 0" }} fontSize={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacinia
          dolor, mattis elementum, egestas fermentum pulvinar ut porttitor
          morbi. Amet, amet donec vivamus a mi tortor interdum a. Quam urna
          condimentum turpis dui duis. Amet, amet donec vivamus a mi tortor
          interdum a. Quam urna condimentum turpis dui duis.
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
          <Paper
            elevation={1}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "15px 10px",
              borderRadius: "14px",
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary.dark"
              fontSize={20}
              textAlign="center"
              marginBottom={"10px"}
            >
              {"Keine Antwort auf deine Frage?"}
            </Typography>
            <Grid container columnSpacing={1}>
              <Grid item xs={5}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt={"Support"}
                    src={Support}
                    style={{ width: 58, height: 58 }}
                  />
                </div>
              </Grid>
              <Grid item xs={7}>
                <Typography color="primary.dark" fontSize={16}>
                  Support Hotline
                </Typography>
                <Typography
                  color="primary.dark"
                  fontSize={12}
                  fontWeight="normal"
                  style={{ padding: "5px 0px" }}
                >
                  +49 123 456789
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.info.light,
                  }}
                >
                  <WatchLaterOutlinedIcon color="inherit" />
                  <Typography
                    variant="body2"
                    color="info.light"
                    marginLeft={"7px"}
                  >
                    Werktags 9.00 - 17.00
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    </Grid>
  )
}

export default SupportCenter
