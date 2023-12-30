import React from "react"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Grid, IconButton, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const WikiDetailsComponent = () => {
  const navigate = useNavigate()
  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/wiki")}>
            <KeyboardBackspaceIcon color="info" />
          </IconButton>
          <Typography color="primary.dark" padding="0 10px" fontSize={16}>
            Artikel 2
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="solar" style={{ height: "21vh" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary.dark" fontSize={20}>
          Artikel description
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="info.dark" fontSize={12} fontWeight="normal">
          Eu nunc ultrices laoreet enim vitae. Diam varius massa eleifend semper
          tortor, euismod scelerisque dolor. Sit tortor, nulla suspendisse in.
          Vitae lectus eu, id auctor feugiat aliquam sollicitudin neque, eu.
          Elementum nulla lectus varius ut pellentesque. Eu ultrices bibendum
          lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim,
          integer. Integer tristique venenatis sed pellentesque et. Mauris
          sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus.
          Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus,
          porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec
          euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar
          turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies
          massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra,
          vitae neque elementum natoque enim, porta pellentesque Eu ultrices
          bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus
          turpis enim, integer. Integer tristique venenatis sed pellentesque et.
          Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in
          purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo
          rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis
          nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc
          lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper
          ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis.
          Donec pharetra, vitae neque elementum natoque enim, porta pellentesque
          Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit
          dapibus turpis enim, integer. Integer tristique venenatis sed
          pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam
          adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar.
          Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque
          turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing
          nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet
          ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit
          amet duis. Donec pharetra, vitae neque elementum natoque enim, porta
          pellentesque
        </Typography>
      </Grid>
    </Grid>
  )
}

export default WikiDetailsComponent
