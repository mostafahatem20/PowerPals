import { useState } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Address from "../components/Location/Address"
import ProfileInformation from "../components/ProfileInformation/ProfileInformation"

const Profile = () => {
  const [tab] = useState("profile")

  if (tab === "address") return <Address />

  if (tab === "profileInfo") return <ProfileInformation />

  return (
    <>
      <FixedBottomNavigation value={3} />
    </>
  )
}

export default Profile
