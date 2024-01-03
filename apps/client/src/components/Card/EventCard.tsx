import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import dayjs from "dayjs"
import { EventDetails } from "../../features/event/eventSlice"
import { useNavigate } from "react-router-dom"

const EventCard = ({ event }: { event: EventDetails }) => {
  const navigate = useNavigate()
  const date = dayjs(event.eventDateTime)
  // Set locale to German
  dayjs.locale("de")
  const formattedDate = date.format("dddd, D. MMMM [um] HH:mm")
  return (
    <Card onClick={() => navigate(`/event/${event.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={`http://localhost:3000/files/${event.image}`}
          alt={event.title}
        />
        <CardContent>
          <Typography variant="subtitle2">{event.title}</Typography>
          <Typography variant="subtitle2" fontSize={13}>
            {formattedDate}
          </Typography>
          <Typography variant="body1" fontSize={13}>
            {`${event.street} ${event.number}`}
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
