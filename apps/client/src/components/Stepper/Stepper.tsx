import * as React from "react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Typography from "@mui/material/Typography"
import StepIcon from "../Icons/StepIcon"
import { useNavigate } from "react-router-dom"

const steps = [
  {
    label: "Profil Angelegen",
    description: `Du erstellst dein Profil, mit allen relevanten Informationen, um die nächsten Schritte einzuleiten.`,
  },
  {
    label: "Standort Angelegt",
    description:
      "Du stellst deine Standortdaten und Zählpunktinformation bereit und erlaubst uns damit, eine Zählpunktabfrage für dich zu starten.",
  },
  {
    label: "An Community-Event Teilnehmen",
    description: `Wir suchen mit deinen Daten nach einem Match in deiner Umgebung. Sobald sich genügend TeilnehmerInnen in deiner Region gefunden haben, wird ein initiales Community freigeschaltet, an dem du teilnehmen kannst. Außerdem werden dir alle PowerPals angezeigt, die für dich in Frage kommen. `,
  },
  {
    label: "Community Beitritt Unterzeichnen",
    description: `Sobald sich eine Community gefunden hat und ein Vorstand gewählt wurde, musst du lediglich den Beitritt bestätigen. Die weitere Planung wird vom Vorstand deiner Community durchgeführt.`,
  },
]
const VerticalLinearStepper = ({
  stepsStatus,
}: {
  stepsStatus: [boolean, boolean, boolean, boolean]
}) => {
  const navigate = useNavigate()
  return (
    <Stepper orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label} active={true}>
          <StepLabel
            StepIconComponent={() => <StepIcon done={stepsStatus[index]} />}
            onClick={() => {
              if (index === 0 && !stepsStatus[index]) {
                navigate("/profile", {
                  state: { from: "home", edit: "profileInfo" },
                })
              }
              if (index === 1 && !stepsStatus[index] && stepsStatus[0]) {
                navigate("/profile", {
                  state: { from: "home", edit: "address" },
                })
              }
            }}
          >
            <Typography variant="body1">{step.label}</Typography>
          </StepLabel>
          <StepContent style={{ color: "rgba(0, 0, 0, 0.62)" }}>
            <Typography variant="body2" color="inherit">
              {step.description}
            </Typography>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}

export default VerticalLinearStepper
