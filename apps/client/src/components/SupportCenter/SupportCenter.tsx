import { Grid, IconButton, Typography } from "@mui/material"
import React from "react"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"

const SupportCenter = ({ onBack }: { onBack: () => void }) => {
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
    </Grid>
  )
}

export default SupportCenter
