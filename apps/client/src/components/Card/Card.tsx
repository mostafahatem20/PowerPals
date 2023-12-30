import * as React from "react"
import MUICard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Solar from "../../static/Solar.png"
import ReadIcon from "../Icons/ReadIcon"

function calculateReadingTime(text: string, wordsPerMinute = 200) {
  // Count words in the text using regular expression
  const wordCount = text.trim().split(/\s+/).length

  // Calculate reading time based on word count and average reading speed
  const readingTimeInMinutes = wordCount / wordsPerMinute

  // Round up the reading time to the nearest whole number
  const roundedReadingTime = Math.ceil(readingTimeInMinutes)

  return roundedReadingTime + " min"
}

const Card = ({
  title,
  tag,
  body,
}: {
  title: string
  body: string
  tag?: string
}) => {
  return (
    <MUICard sx={{ display: "flex", height: "75px", borderRadius: "15px" }}>
      <CardMedia
        component="img"
        sx={{ width: 80 }}
        image={Solar}
        alt="wiki image"
      />
      <CardContent sx={{ flex: "1 0 auto", padding: 0, color: "#A9A9A9" }}>
        <Typography variant="body1" color="info.dark" padding="5px 10px">
          {title}
        </Typography>
        <Typography variant="body2" color="inherit" padding="5px 10px">
          Artikel
          {tag && (
            <span style={{ padding: "0 10px" }}>
              <span>•</span> {tag}
            </span>
          )}
          <span style={{ padding: "0 10px" }}>
            <ReadIcon />
            <span style={{ padding: "0 5px" }}>
              {calculateReadingTime(body)}
            </span>
          </span>
        </Typography>
      </CardContent>
    </MUICard>
  )
}
export default Card
