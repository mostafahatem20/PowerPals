import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { User } from "../../features/user/userSlice"
import { Switch } from "@mui/material"

const UsersList = ({
  users,
  action,
}: {
  users: (User & { profileImage: string })[]
  action?: (id: number, type: "user" | "organizer" | "community_leader") => void
}) => {
  return (
    <List sx={{ width: "100%", padding: 0 }}>
      {users.map((user, index) => (
        <ListItem key={index} alignItems="flex-start" disablePadding>
          <ListItemAvatar>
            <Avatar
              alt={user.name}
              src={`http://localhost:3000/files/${user.profileImage}`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Email:
                </Typography>
                {` ${user.email}`}
              </React.Fragment>
            }
          />
          {action && (
            <Switch
              edge="end"
              color="info"
              onChange={() => action(user.id!, user.type!)}
              checked={user.type === "community_leader"}
              inputProps={{
                "aria-labelledby": "switch-list-label-wifi",
              }}
            />
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default UsersList
