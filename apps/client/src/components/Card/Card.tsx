import * as React from "react"
import MUICard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import ReadIcon from "../Icons/ReadIcon"
import { useNavigate } from "react-router-dom"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../features/auth/authSlice"
import { Button } from "@mui/material"

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
  to,
  title,
  tag,
  body,
  image,
  onDelete,
  onEdit,
}: {
  to?: string
  title: string
  body: string
  tag?: string
  image?: string
  onDelete: () => void
  onEdit: () => void
}) => {
  const navigate = useNavigate()
  const { type } = useAppSelector(selectAuth)

  return (
    <MUICard sx={{ display: "flex", borderRadius: "15px" }}>
      <CardMedia
        component="img"
        sx={{ width: 80 }}
        src={`http://localhost:3000/files/${image}`}
        alt="wiki image"
        onClick={() => {
          if (to) navigate(to)
        }}
      />
      <CardContent sx={{ flex: "1 0 auto", padding: 0, color: "#A9A9A9" }}>
        {type === "organizer" ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                color="info.dark"
                padding="5px 5px"
                onClick={() => {
                  if (to) navigate(to)
                }}
              >
                {title}
              </Typography>

              <Button onClick={onEdit}>
                <EditOutlinedIcon color="primary" />
                <Typography color="primary" padding="0 5px" fontSize={14}>
                  Edit
                </Typography>
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="inherit"
                padding="5px 5px"
                onClick={() => {
                  if (to) navigate(to)
                }}
                style={{ maxWidth: "165px" }}
              >
                Artikel
                {tag && (
                  <span style={{ padding: "0 5px" }}>
                    <span>•</span> {tag}
                  </span>
                )}
                <span style={{ padding: "0 5px" }}>
                  <ReadIcon />
                  <span style={{ padding: "0 5px" }}>
                    {calculateReadingTime(body)}
                  </span>
                </span>
              </Typography>
              <Button onClick={onDelete}>
                <DeleteIcon color="error" />
                <Typography color="error" padding="0 5px" fontSize={14}>
                  Delete
                </Typography>
              </Button>
            </div>
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              color="info.dark"
              padding="5px 5px"
              onClick={() => {
                if (to) navigate(to)
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              padding="5px 5px"
              onClick={() => {
                if (to) navigate(to)
              }}
            >
              Artikel
              {tag && (
                <span style={{ padding: "0 5px" }}>
                  <span>•</span> {tag}
                </span>
              )}
              <span style={{ padding: "0 5px" }}>
                <ReadIcon />
                <span style={{ padding: "0 5px" }}>
                  {calculateReadingTime(body)}
                </span>
              </span>
            </Typography>
          </>
        )}
      </CardContent>
    </MUICard>
  )
}
export default Card
