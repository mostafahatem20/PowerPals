import * as React from "react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepIcon from "../Icons/StepIcon"
import { Box } from "@mui/material"

const HorizontalLinearStepper = ({ steps }: { steps: boolean[] }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index} active={true} style={{ padding: 0 }}>
            <StepLabel
              StepIconComponent={() => <StepIcon done={step} />}
              style={{ padding: 0 }}
            />
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default HorizontalLinearStepper
