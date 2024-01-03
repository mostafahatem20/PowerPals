import {
  Grid,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useLocation, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import {
  createWikiThunk,
  selectWiki,
  WikiDetails,
} from "../features/wiki/wikiSlice"
import {
  createNewsStickerThunk,
  NewsStickerDetails,
  selectNewsSticker,
} from "../features/newsSticker/newsStickerSlice"
import UploadWiki from "../static/UploadWiki.png"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { toast } from "react-toastify"
const CreateWiki = () => {
  const theme = useTheme()
  const location = useLocation()
  const [file, setFile] = useState()
  const [url, setUrl] = useState<string>()
  const [wiki, setWiki] = useState<WikiDetails | NewsStickerDetails>({})
  const fileInputRef = useRef<any>(null)
  const wikiState = useAppSelector(selectWiki)
  const newsStickerState = useAppSelector(selectNewsSticker)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
  const handleChange = (field: string, value: string) => {
    setWiki({ ...wiki, [field]: value })
  }
  const handleSubmit = () => {
    if (file && wiki.body && wiki.title && wiki.subHeading) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("body", wiki.body)
      formData.append("title", wiki.title)
      formData.append("subHeading", wiki.subHeading)
      if ((wiki as WikiDetails).tag) {
        formData.append("tag", (wiki as WikiDetails).tag!)
      }
      if (location.pathname === "/create-wiki") {
        dispatch(
          createWikiThunk({
            body: formData,
            isForm: true,
            callback: (id: number) => {
              navigate(`/wiki/article/${id}`)
              toast.success("Wiki created successfully")
            },
          }),
        )
      } else {
        dispatch(
          createNewsStickerThunk({
            body: formData,
            isForm: true,
            callback: (id: number) => {
              navigate(`/wiki/news/${id}`)
              toast.success("NewsSticker created successfully")
            },
          }),
        )
      }
    } else {
      toast.error("Please fill all required fields")
    }
  }
  return (
    <Grid container rowSpacing={3} padding="5% 5%">
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/wiki")}>
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
              src={url ? url : UploadWiki}
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
            value={wiki?.title}
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Subheading"
            focused
            fullWidth
            color="info"
            value={wiki?.subHeading}
            required
            onChange={(e) => handleChange("subHeading", e.target.value)}
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
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Body"
            focused
            fullWidth
            multiline
            rows={4} // Set the number of rows for the textarea
            color="info"
            value={wiki?.body}
            required
            onChange={(e) => handleChange("body", e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
            }}
          />
        </div>
      </Grid>
      {location.pathname === "/create-wiki" && (
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
              label="Tag"
              focused
              fullWidth
              color="info"
              value={(wiki as WikiDetails).tag}
              onChange={(e) => handleChange("tag", e.target.value)}
              InputProps={{
                style: {
                  color: theme.palette.info.light,
                },
              }}
            />
          </div>
        </Grid>
      )}
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
            onClick={
              wikiState.loading || newsStickerState.loading
                ? () => {}
                : handleSubmit
            }
          >
            <Typography variant="body1" color="secondary">
              {location.pathname === "/create-wiki"
                ? "Wiki Veröffentlichen"
                : "NewsSticker Veröffentlichen"}
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default CreateWiki
