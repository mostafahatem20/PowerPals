import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import Solar from "../../static/Solar.png"
import { EventDetails } from "../../pages/Event"
import dayjs from "dayjs"

const EventCard = ({ event }: { event: EventDetails }) => {
  const date = dayjs(event.date)
  // Set locale to German
  dayjs.locale("de")
  const formattedDate = date.format("dddd, D. MMMM [um] HH:mm")
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Solar}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="subtitle2">{event.title}</Typography>
          <Typography variant="subtitle2" fontSize={13}>
            {formattedDate}
          </Typography>
          <Typography variant="body1" fontSize={13}>
            {`${event.location?.street} ${event.location?.number}`}
          </Typography>
          <Typography variant="subtitle2" fontSize={13}>
            {event.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EventCard
