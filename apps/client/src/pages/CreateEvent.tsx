import {
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Divider,
  Button,
} from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useNavigate } from "react-router-dom"
import UploadEvent from "../static/UploadEvent.png"
import {
  createEventThunk,
  EventDetails,
  selectEvent,
} from "../features/event/eventSlice"
import { useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { toast } from "react-toastify"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import GoogleMaps from "../components/Location/GoogleMaps"

const CreateEvent = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [url, setUrl] = useState<string>()
  const [event, setEvent] = useState<EventDetails>({})
  const [hasError, setHasError] = useState(false)
  const fileInputRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(selectEvent)
  const handleChangeImage = (e: any) => {
    const file = e.target.files[0]
    setFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUrl(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const handleChange = (field: string, value: any) => {
    setEvent({ ...event, [field]: value })
  }
  const handleSubmit = () => {
    if (
      file &&
      event.title &&
      event.eventDateTime &&
      event.street &&
      event.number &&
      event.postalCode &&
      event.city &&
      event.lat &&
      event.lng &&
      event.info &&
      !hasError
    ) {
      const currentDate = dayjs() // Get current datetime
      // Create another date for comparison (e.g., a date in the future)
      const isInFuture = (
        event.eventDateTime as unknown as dayjs.Dayjs
      ).isAfter(currentDate)
      if (!isInFuture) {
        toast.error("Event Date should be in the future")
        return
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", event.title)
      formData.append("eventDateTime", event.eventDateTime.toISOString())
      formData.append("street", event.street)
      formData.append("number", String(event.number))
      formData.append("postalCode", String(event.postalCode))
      formData.append("city", event.city)
      formData.append("lat", String(event.lat))
      formData.append("lng", String(event.lng))
      formData.append("info", event.info)

      dispatch(
        createEventThunk({
          body: formData,
          isForm: true,
          callback: (id: number) => {
            navigate(`/event/${id}`)
            toast.success("Event created successfully")
          },
        }),
      )
    }
    if (
      !file ||
      !event.title ||
      !event.eventDateTime ||
      !event.street ||
      !event.number ||
      !event.postalCode ||
      !event.city ||
      !event.lat ||
      !event.lng ||
      !event.info
    ) {
      toast.error("Please fill all required fields")
    }
    if (hasError) {
      toast.error("Please enter a valid date")
    }
  }
  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/event")}>
            <KeyboardBackspaceIcon color="info" />
          </IconButton>
          <Typography color="primary.dark" padding="0 10px" fontSize={16}>
            Zurück
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            style={{ height: "21vh", width: "100%", maxWidth: "500px" }}
          >
            <img
              src={url ? url : UploadEvent}
              alt="upload placeholder"
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                fileInputRef.current.click()!
              }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleChangeImage}
            />
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Title"
            focused
            fullWidth
            color="info"
            value={event?.title}
            required
            onChange={(e) => handleChange("title", e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              style={{
                width: "100%",
                maxWidth: "500px",
              }}
              label="Wann"
              value={
                event.eventDateTime ? dayjs(event.eventDateTime) : undefined
              }
              onChange={(newValue) => {
                if (newValue) setHasError(false)
                handleChange("eventDateTime", newValue)
              }}
              format="L HH:mm"
              fullWidth
              focused
              color="info"
              required
              onError={(e, val) => {
                if (e) setHasError(true)
              }}
            />
          </LocalizationProvider>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleMaps
            label="Wo?"
            setPlaceDetails={(placeDetails) =>
              setEvent({ ...event, ...placeDetails })
            }
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            columnSpacing={1}
          >
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                label="Straße"
                fullWidth
                color="info"
                value={event.street}
                key={event.street}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Nr."
                fullWidth
                color="info"
                value={event.number}
                key={event.number}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            columnSpacing={1}
          >
            {" "}
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                label="PLZ"
                fullWidth
                color="info"
                value={event.postalCode}
                key={event.postalCode}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                label="Ort"
                fullWidth
                color="info"
                value={event.city}
                key={event.city}
                disabled
                InputProps={{
                  style: {
                    color: theme.palette.info.light,
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Weitere Infos"
            focused
            fullWidth
            color="info"
            value={event?.info}
            required
            onChange={(e) => handleChange("info", e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              width: "225px",
              height: "56px",
              textTransform: "capitalize",
              borderRadius: "15px",
            }}
            color="info"
            onClick={loading ? () => {} : handleSubmit}
          >
            <Typography variant="body1" color="secondary">
              {"Event Anlegen"}
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default CreateEvent
