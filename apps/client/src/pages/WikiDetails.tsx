import React, { useEffect, useState } from "react"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  selectNewsSticker,
  getNewsStickerThunk,
  NewsStickerDetails,
} from "../features/newsSticker/newsStickerSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  selectWiki,
  getWikiThunk,
  WikiDetails,
} from "../features/wiki/wikiSlice"

const WikiDetailsComponent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [wiki, setWiki] = useState<WikiDetails | NewsStickerDetails>()
  const newsStickerState = useAppSelector(selectNewsSticker)
  const wikiState = useAppSelector(selectWiki)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(location.pathname)
    if (
      id &&
      location.pathname === `/wiki/article/${id}` &&
      (!wikiState.currentWiki || wikiState.currentWiki.id !== Number(id))
    ) {
      dispatch(
        getWikiThunk({ id: Number(id), callBack: (data) => setWiki(data) }),
      )
    } else if (
      id &&
      location.pathname === `/wiki/news/${id}` &&
      (!newsStickerState.currentNewsSticker ||
        newsStickerState.currentNewsSticker.id !== Number(id))
    ) {
      dispatch(
        getNewsStickerThunk({
          id: Number(id),
          callBack: (data) => setWiki(data),
        }),
      )
    } else if (location.pathname === `/wiki/article/${id}`) {
      setWiki({ ...wikiState.currentWiki })
    } else {
      setWiki({ ...newsStickerState.currentNewsSticker })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      {(wikiState.loading || newsStickerState.loading) && (
        <Backdrop
          sx={{ color: "#24345F", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Grid container rowSpacing={3} padding="5% 5%">
        <Grid item xs={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/wiki")}>
              <KeyboardBackspaceIcon color="info" />
            </IconButton>
            <Typography color="primary.dark" padding="0 10px" fontSize={16}>
              {wiki?.title}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container style={{ height: "21vh" }}>
            <img
              src={`http://localhost:3000/files/${wiki?.image}`}
              alt="dsdf"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography color="primary.dark" fontSize={20}>
            {wiki?.subHeading}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="info.dark" fontSize={12} fontWeight="normal">
            {wiki?.body}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default WikiDetailsComponent
