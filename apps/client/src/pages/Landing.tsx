import { useSpringCarousel } from "react-spring-carousel"
import Button from "@mui/material/Button"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import { Grid, IconButton, Stack, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface IItem {
  className: string
  backgroundColor: "primary" | "secondary"
  item: string
  slideToItem: (item: string) => void
  title: string
  subtitle: string
}
const Item = ({
  className,
  backgroundColor,
  item,
  slideToItem,
  title,
  subtitle,
}: IItem) => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Grid item xs={12}>
      <Grid container className={className} />
      <Grid
        container
        style={{
          background:
            backgroundColor === "primary"
              ? theme.palette.primary.dark
              : theme.palette.secondary.dark,
          height: "60%",
        }}
      >
        <Grid item xs={12} style={{ height: "40%" }}>
          <Typography variant="subtitle1" style={{ padding: "5% 8%" }}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            style={{ padding: "0% 8%" }}
            color="secondary"
          >
            {subtitle}
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ height: "40%" }}>
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
              }}
              onClick={() => navigate("/register")}
            >
              <Typography variant="body1" color="secondary">
                PowerPal Werden
              </Typography>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                width: "272px",
                height: "54px",
                textTransform: "capitalize",
              }}
              onClick={() => navigate("/wiki")}
            >
              <Typography variant="body1" color="secondary">
                Ohne Profil Fortfahren
              </Typography>
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "auto", height: "20%" }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            style={{ padding: "20px" }}
          >
            <IconButton onClick={() => slideToItem("item-1")} color="secondary">
              <FiberManualRecordIcon
                color={item === "item-1" ? "primary" : "inherit"}
                fontSize="large"
              />
            </IconButton>
            <IconButton onClick={() => slideToItem("item-2")} color="secondary">
              <FiberManualRecordIcon
                color={item === "item-2" ? "primary" : "inherit"}
                fontSize="large"
              />
            </IconButton>
            <IconButton onClick={() => slideToItem("item-3")} color="secondary">
              <FiberManualRecordIcon
                color={item === "item-3" ? "primary" : "inherit"}
                fontSize="large"
              />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}
const Landing = () => {
  const slide = (item: string) => slideToItem(item)
  const { carouselFragment, slideToItem } = useSpringCarousel({
    items: [
      {
        id: "item-1",
        renderItem: (
          <Item
            className="hand"
            backgroundColor="primary"
            item="item-1"
            slideToItem={slide}
            title={"Energiewende Leichtgemacht"}
            subtitle={"Lorem Ipsum"}
          />
        ),
      },
      {
        id: "item-2",
        renderItem: (
          <Item
            className="solar"
            backgroundColor="secondary"
            item="item-2"
            slideToItem={slide}
            title={"Energiewende Leichtgemacht"}
            subtitle={"Lorem Ipsum"}
          />
        ),
      },
      {
        id: "item-3",
        renderItem: (
          <Item
            className="wind"
            backgroundColor="primary"
            item="item-3"
            slideToItem={slide}
            title={"Energiewende Leichtgemacht"}
            subtitle={"Lorem Ipsum"}
          />
        ),
      },
    ],
  })

  return (
    <Grid container style={{ height: "100vh", overflow: "hidden" }}>
      {carouselFragment}
    </Grid>
  )
}

export default Landing
