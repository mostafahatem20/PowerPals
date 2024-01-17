import React, { useState } from "react"
import {
  Grid,
  IconButton,
  Typography,
  Divider,
  Stack,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import HorizontalLinearStepper from "../components/Stepper/HorizontalStepper"
import DownloadIcon from "@mui/icons-material/Download"
import TestPDF from "../static/test.pdf"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const steps = [
  {
    title: "Informationen & Konzept",
    checkBoxs: [
      { label: "Ziele und Rollen definiert", field: "Ziele" },
      { label: "Erzeugung und Verbrauch passen zusammen", field: "Erzeugung" },
      { label: "Nahbereichsabfrage durchgeführt", field: "Nahbereisabfrage" },
      {
        label:
          "Jeder/e Teilnehmer:in hat die Registrierung im Netzbetreiber-Kundenportal abgeschlossen",
        field: "Registrierung",
      },
    ],
  },
  {
    title: "Vereinsgründung",
    checkBoxs: [
      { label: "Statuten erstellt und Vorstand festgelegt", field: "Statuten" },
      {
        label: "Anzeige bei Vereinsbehörde eingebracht",
        field: "Vereinsbehörde",
      },
      {
        label: "Positiven Gründungsbescheid der Behörde erhalten",
        field: "Gründungsbescheid",
      },
    ],
  },
  {
    title: "Interne Vereinbarungen",
    checkBoxs: [
      {
        label:
          "Vereinbarung zwischen Erzeuger und Energiegemeinschaft ist getroffen",
        field: "Vereinbarung_1",
      },
      {
        label:
          "Vereinbarung zwischen den Teilnehmer:innen und Energiegemeinschaft ist getroffen",
        field: "Vereinbarung_2",
      },
      {
        label:
          "Wichtige Regelungen zu Punkten wie Tarif/Entgelt, Anlagenwartung, Haftung, Kündigungsfristen) sind getroffen",
        field: "Regelungen",
      },
    ],
  },
  {
    title: "Registrierung als Marktpartner",
    checkBoxs: [
      {
        label:
          "Registrierung als Marktpartner unter ebutilitites abgeschlossen",
        field: "ebutilities",
      },
      { label: "Marktpartner-ID erhalten", field: "Marktpartner_ID" },
    ],
  },
  {
    title: "Vertrag mit Netzbetreiber",
    checkBoxs: [
      {
        label: "Zuständigen Netzbetreiber ausfindig gemacht",
        field: "Netzbetreiber",
      },
      {
        label:
          "Bilaterale Abstimmung mit dem Netzbetreiber zwecks Vertragsvorbereitung",
        field: "Vertragsvorbereitung",
      },
      { label: "Vertragsfertigstellung", field: "Vertragsfertigstellung" },
    ],
  },
  {
    title: "Registrierung im EDA-portal",
    checkBoxs: [
      {
        label: "Registrierung der EEG im EDA Anwenderportal abgeschlossen",
        field: "EDA",
      },
      {
        label: "Alle Teilnehmer:innen im EDA-Anwenderportal angelegt",
        field: "Angelegt",
      },
      {
        label:
          "Alle Teilnehmer:innen wurden durch den Netzbetreiber freigeschaltet und der EEG zugeordnet (Online- oder Offline-Prozess)",
        field: "Freigeschaltet",
      },
      {
        label: "Alle Teilnehmer:innen sind mit einem Smart-Meter ausgestattet",
        field: "Ausgestattet",
      },
      {
        label:
          "Alle Teilnehmer:innen haben im Netzbetreiber-Kundenportal der Teilnahme an der Energiegemeinschaft zugestimmt",
        field: "Zugestimmt",
      },
    ],
  },
]
const CreateCommunity = () => {
  const [step] = useState(1)
  const handleDownloadPDF = (path: string, name: string) => {
    // Create an anchor element
    const link = document.createElement("a")

    // Set the href attribute to the path of the PDF file
    link.href = path

    // Set the download attribute with the desired file name
    link.download = name

    // Append the anchor element to the document body
    document.body.appendChild(link)

    // Trigger a click on the anchor element to start the download
    link.click()

    // Remove the anchor element from the document body
    document.body.removeChild(link)
  }

  const navigate = useNavigate()
  return (
    <Grid
      container
      rowSpacing={3}
      padding="5% 5%"
      style={{
        color: "rgba(0, 0, 0, 0.62)",
      }}
    >
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/community")}>
            <KeyboardBackspaceIcon color="info" />
          </IconButton>
          <Typography color="primary.dark" padding="0 10px" fontSize={16}>
            Community
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary.dark">
          {`${step + 1}. ${steps[step].title}`}
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
          <HorizontalLinearStepper
            steps={[true, false, false, false, false, false]}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Folgende grundlegende Punkte sollten vor der Gründung einer
          Energie-gemeinschaft behandelt werden:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="primary.dark" fontSize={20}>
          {"1. Ziele und Hintergründe"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="inherit" fontSize={14}>
          Folgende grundlegende Punkte sollten vor der Gründung einer
          Energiegemeinschaft behandelt werden
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="subtitle2" color="primary.dark" fontSize={18}>
              Welche Ziele können mit einer Energiegemeinschaft erreicht werden?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="inherit" fontSize={14}>
              Welche Ziele können mit einer Energiegemeinschaft erreicht
              werden?Welche Ziele können mit einer Energiegemeinschaft erreicht
              werden?Welche Ziele können mit einer Energiegemeinschaft erreicht
              werden?
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="subtitle2" color="primary.dark" fontSize={18}>
              Welche Rollen gibt es in einer Energiegemeinschaft?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>
                <Typography variant="body2" color="inherit" fontSize={14}>
                  Reiner Verbraucher: Verbrauchszählpunkt (Vorteile: weniger
                  Strombezug vom Energielieferanten, Strom aus der Gemeinschaft
                  beziehen, die Energiewende aktiv mitgestalten)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="inherit" fontSize={14}>
                  Reiner Einspeiser: Einspeisezählpunkt (Vorteile: Abnahme zu
                  einem höheren und mitbestimmten Tarif durch die Gemeinschaft,
                  im Vergleich zu anderen Abnehmern; finanzielle Amortisation
                  kann dadurch besser kalkuliert werden)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="inherit" fontSize={14}>
                  Prosumer (Einspeiser u. Verbraucher gleichzeitig): Verbrauchs-
                  und Einspeisezählpunkt (Vorteile: alle erwähnten, die auf
                  Verbraucher und Einspeiser zutreffen)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="inherit" fontSize={14}>
                  Organisatorische Rolle (Gründung, Abrechnung, Monitoring oder
                  Betreuung von EG)
                </Typography>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="primary.dark" fontSize={20}>
          {"2. Matching Erzeugung und Verbrauch"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="inherit" fontSize={14}>
          Für jede Energiegemeinschaft ist folgende Frage essentiell: findet
          Erzeugung und Verbrauch zeitgleich statt? So kann es von Vorteil sein,
          wenn z.B. Betriebe in Energiegemeinschaften teilnehmen:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <li>
            <Typography variant="body2" color="inherit" fontSize={14}>
              Durch einen zeitlich versetzten Strombedarf können sich Betriebe,
              private Haushalte und die Gemeinde in ihrem Lastprofil gut
              ergänzen.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="inherit" fontSize={14}>
              Um Ihnen bei der Beantwortung dieser Frage weiterzuhelfen, lohnt
              es sich einen Blick in unser Benefit-Tool zu werfen.
            </Typography>
          </li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="inherit" fontSize={14}>
          Um die Eigenverbrauchsquote innerhalb einer Energiegemeinschaft gut
          aufeinander abzustimmen, lohnt es sich einen Mix verschiedener
          Erzeugungstechnologien, wie etwa Photovoltaik, Wasserkraft und
          Windkraft in die Energiegemeinschaft zu integrieren.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="primary.dark" fontSize={20}>
          {"3. Unterstützende Unterlagen"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="inherit" fontSize={14}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip.
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
        <Stack
          spacing={2}
          height="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="outlined"
            style={{
              width: "300px",
              height: "54px",
              textTransform: "capitalize",
              borderRadius: "15px",
            }}
            color="info"
            onClick={() => handleDownloadPDF(TestPDF, "ticket.pdf")}
          >
            <Typography
              variant="body2"
              color="inherit"
              style={{ marginRight: "15px" }}
            >
              Vorlage1 : Vereinbarung Volleinspeiser
            </Typography>
            <DownloadIcon color="inherit" fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            color="info"
            style={{
              width: "300px",
              height: "54px",
              textTransform: "capitalize",
              borderRadius: "15px",
            }}
            onClick={() => handleDownloadPDF(TestPDF, "ticket.pdf")}
          >
            <Typography
              variant="body2"
              color="inherit"
              style={{ marginRight: "15px" }}
            >
              Vorlage2 : Vereinbarung Volleinspeiser
            </Typography>
            <DownloadIcon color="inherit" fontSize="small" />
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="primary.dark" fontSize={20}>
          {"4. Checklist"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          {steps[step].checkBoxs.map((one, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox defaultChecked />}
              label={one.label}
            />
          ))}
        </FormGroup>
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
            onClick={() => {}}
          >
            <Typography variant="body1" color="secondary">
              Speichern und Weiter
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
              onClick={() => {}}
            >
              <Typography variant="body1" color="inherit">
                Zurück
              </Typography>
            </Button>
          </div>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default CreateCommunity
