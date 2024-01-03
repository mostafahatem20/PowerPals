import {
  Grid,
  Typography,
  Divider,
  TextField,
  useTheme,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Card from "../components/Card/Card"
import { selectAuth } from "../features/auth/authSlice"
import {
  deleteNewsStickerThunk,
  getNewsStickersThunk,
  selectNewsSticker,
} from "../features/newsSticker/newsStickerSlice"
import {
  clearWikis,
  deleteWikiThunk,
  getWikisThunk,
  selectWiki,
} from "../features/wiki/wikiSlice"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

const Wiki = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(selectAuth)
  const { loadingWikis, wikis } = useAppSelector(selectWiki)
  const { loadingNewsStickers, newsStickers } =
    useAppSelector(selectNewsSticker)
  const [search, setSearch] = useState<string>()
  const [value, setValue] = useState<number>(0)
  const [tag, setTag] = useState<string>("Alles")
  const [page, setPage] = useState(1)
  const [canLoadWikis, setCanLoadWikis] = useState(true)
  const [canLoadNewsStickers, setCanLoadNewsStickers] = useState(true)
  const { type } = useAppSelector(selectAuth)
  const navigate = useNavigate()
  useEffect(() => {
    if (value === 0) {
      dispatch(clearWikis())
      setCanLoadWikis(true)
      setPage(1)
      dispatch(
        getWikisThunk({
          page: 1,
          limit: 10,
          tag: tag !== "Alles" ? tag : undefined,
          callback: (l) => {
            if (l < 10) {
              setCanLoadWikis(false)
            }
          },
        }),
      )
    } else {
      setCanLoadNewsStickers(true)
      setPage(1)
      dispatch(
        getNewsStickersThunk({
          page: 1,
          limit: 10,
          callback: (l) => {
            if (l < 10) {
              setCanLoadNewsStickers(false)
            }
          },
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tag])

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        padding="5% 5%"
        marginBottom="80px"
        columnSpacing={1}
      >
        {type === "organizer" ? (
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="primary.dark">
                Wiki
              </Typography>
              <Button
                onClick={() => {
                  if (value === 0) {
                    navigate("/create-wiki")
                  } else {
                    navigate("/create-news-sticker")
                  }
                }}
              >
                <AddIcon color="primary" />
                <Typography color="primary" padding="0 10px" fontSize={14}>
                  Add
                </Typography>
              </Button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary.dark">
              Wiki
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Search..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            style={{ width: "100%" }}
          >
            <Tab label="Wiki" />
            <Tab label="Newsticker" />
          </Tabs>
        </Grid>
        {value === 0 && (
          <>
            <Grid item xs={12}>
              <Chip
                label="Alles"
                style={{ margin: "0px 5px" }}
                variant={tag === "Alles" ? "filled" : "outlined"}
                onClick={() => setTag("Alles")}
              />
              <Chip
                label="Shared Energy"
                variant={tag === "Shared Energy" ? "filled" : "outlined"}
                style={{ margin: "0px 5px" }}
                onClick={() => setTag("Shared Energy")}
              />
              <Chip
                label="Tech"
                variant={tag === "Tech" ? "filled" : "outlined"}
                style={{ margin: "0px 5px" }}
                onClick={() => setTag("Tech")}
              />
              <Chip
                label="Regulatorik"
                variant={tag === "Regulatorik" ? "filled" : "outlined"}
                style={{ margin: "0px 5px" }}
                onClick={() => setTag("Regulatorik")}
              />
            </Grid>
            {loadingWikis && wikis.length === 0 ? (
              <Grid item xs={12}>
                <CircularProgress color="info" />
              </Grid>
            ) : wikis.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="info.dark">
                  No Results Found
                </Typography>
              </Grid>
            ) : (
              <>
                {wikis.map((wiki, index) => (
                  <Grid key={index} item lg={4} md={6} xs={12}>
                    <Card
                      to={wiki.id ? `/wiki/article/${wiki.id}` : ""}
                      title={wiki.title!}
                      tag={wiki.tag}
                      body={wiki.body!}
                      image={wiki.image}
                      onDelete={() =>
                        dispatch(deleteWikiThunk({ id: wiki.id! }))
                      }
                      onEdit={() => {}}
                    />
                  </Grid>
                ))}
                {canLoadWikis && (
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: theme.palette.info.light,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="inherit"
                        style={{
                          textTransform: "capitalize",
                          borderRadius: "10px",
                          padding: "10px 25px",
                        }}
                        onClick={() => {
                          setPage(page + 1)
                          dispatch(
                            getWikisThunk({
                              page: page + 1,
                              limit: 10,
                              tag: tag !== "Alles" ? tag : undefined,
                              callback: (l) => {
                                if (l < 10) {
                                  setCanLoadWikis(false)
                                }
                              },
                            }),
                          )
                        }}
                      >
                        <Typography variant="body2" color="inherit">
                          Mehr laden
                        </Typography>
                      </Button>
                    </div>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
        {value === 1 && (
          <>
            {loadingNewsStickers && newsStickers.length === 0 ? (
              <Grid item xs={12}>
                <CircularProgress color="info" />
              </Grid>
            ) : newsStickers.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="info.dark">
                  No Results Found
                </Typography>
              </Grid>
            ) : (
              <>
                {newsStickers.map((newsSticker, index) => (
                  <Grid key={index} item lg={4} md={6} xs={12}>
                    <Card
                      to={newsSticker.id ? `/wiki/news/${newsSticker.id}` : ""}
                      title={newsSticker.title!}
                      body={newsSticker.body!}
                      image={newsSticker.image}
                      onDelete={() =>
                        dispatch(
                          deleteNewsStickerThunk({ id: newsSticker.id! }),
                        )
                      }
                      onEdit={() => {}}
                    />
                  </Grid>
                ))}
                {canLoadNewsStickers && (
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: theme.palette.info.light,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="inherit"
                        style={{
                          textTransform: "capitalize",
                          borderRadius: "10px",
                          padding: "10px 25px",
                        }}
                        onClick={() => {
                          setPage(page + 1)
                          dispatch(
                            getNewsStickersThunk({
                              page: page + 1,
                              limit: 10,
                              callback: (l) => {
                                if (l < 10) {
                                  setCanLoadNewsStickers(false)
                                }
                              },
                            }),
                          )
                        }}
                      >
                        <Typography variant="body2" color="inherit">
                          Mehr laden
                        </Typography>
                      </Button>
                    </div>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Grid>
      <FixedBottomNavigation value={token ? 1 : 0} />
    </>
  )
}

export default Wiki
