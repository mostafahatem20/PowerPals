import * as React from "react"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Paper from "@mui/material/Paper"
import { useTheme } from "@mui/material"
import HomeIcon from "../Icons/HomeIcon"
import WikiIcon from "../Icons/WikiIcon"
import EventIcon from "../Icons/EventIcon"
import ProfileIcon from "../Icons/ProfileIcon"
import { useNavigate } from "react-router-dom"

const style = {
  borderRadius: "50%",
  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#24345F",
  width: 45,
  height: 45,
  marginTop: -20,
}

export default function FixedBottomNavigation({ value }: { value: number }) {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 0) navigate("/home")
          if (newValue === 1) navigate("/wiki")
          if (newValue === 2) navigate("/event")
          if (newValue === 3) navigate("/profile")
        }}
        sx={{
          ".MuiBottomNavigationAction-root": {
            color: theme.palette.primary.dark,
          },
          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: theme.palette.primary.dark,
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon style={style} active={value === 0} />}
        />
        <BottomNavigationAction
          label="Wiki"
          icon={<WikiIcon style={style} active={value === 1} />}
        />
        <BottomNavigationAction
          label="Events"
          icon={<EventIcon style={style} active={value === 2} />}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<ProfileIcon style={style} active={value === 3} />}
        />
      </BottomNavigation>
    </Paper>
  )
}
