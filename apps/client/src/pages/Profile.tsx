import { useState } from "react"
import Address from "../components/Location/Address"
import ProfileInformation from "../components/ProfileInformation/ProfileInformation"

const Profile = () => {
  const [tab] = useState("address")

  if (tab === "address") return <Address />

  return <ProfileInformation />
}

export default Profile
