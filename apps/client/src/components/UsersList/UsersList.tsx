import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { User } from "../../features/user/userSlice"

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <List sx={{ width: "100%", padding: 0 }}>
      {users.map((user, index) => (
        <ListItem key={index} alignItems="flex-start" disablePadding>
          <ListItemAvatar>
            <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
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
        </ListItem>
      ))}
    </List>
  )
}

export default UsersList
