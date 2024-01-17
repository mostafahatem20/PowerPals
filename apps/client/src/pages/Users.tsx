import {
  Divider,
  Grid,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  clearUsers,
  getUsersThunk,
  patchOtherUserThunk,
  selectUser,
} from "../features/user/userSlice"
import UsersList from "../components/UsersList/UsersList"

const Users = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { users, loadingUsers } = useAppSelector(selectUser)
  const [page, setPage] = useState(1)

  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    setCanLoad(true)
    setPage(1)
    dispatch(clearUsers())
    dispatch(
      getUsersThunk({
        page: 1,
        limit: 10,
        byDistance: false,
        callback: (l) => {
          if (l < 10) {
            setCanLoad(false)
          }
        },
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Grid
        container
        rowSpacing={3}
        padding="5% 5%"
        marginBottom="80px"
        columnSpacing={1}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary.dark">
            Users
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {loadingUsers && users.length === 0 ? (
          <Grid item xs={12}>
            <CircularProgress color="info" />
          </Grid>
        ) : users.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="info.dark">
              No Results Found
            </Typography>
          </Grid>
        ) : (
          <UsersList
            users={users}
            action={(id, type) => {
              dispatch(
                patchOtherUserThunk({
                  id,
                  body: {
                    user: {
                      type: type === "user" ? "community_leader" : "user",
                    },
                  },
                  isForm: false,
                }),
              )
            }}
          />
        )}
        {canLoad && (
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
                    getUsersThunk({
                      page: page + 1,
                      limit: 10,
                      byDistance: false,
                      callback: (l) => {
                        if (l < 10) {
                          setCanLoad(false)
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
      </Grid>
      <FixedBottomNavigation value={3} />
    </>
  )
}

export default Users
