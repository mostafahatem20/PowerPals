import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import parse from "autosuggest-highlight/parse"
import { debounce } from "@mui/material/utils"

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyCKkhDTtDZqGCVCjajaWbn5k3AWcv3CTf4"

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return
  }

  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute("id", id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }
const getDetailsService = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  place_id: string
  description: string
  structured_formatting: StructuredFormatting
}

export interface PlaceDetails {
  street: string
  number: number
  postalCode: number
  city: string
  lat: number
  lng: number
}

interface IGoogleMaps {
  setPlaceDetails: (input: PlaceDetails) => void
}
const GoogleMaps = ({ setPlaceDetails }: IGoogleMaps) => {
  const [value, setValue] = React.useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])

  const loaded = React.useRef(false)

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps",
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          ;(autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          )
        },
        400,
      ),
    [],
  )
  const fetchDetails = React.useMemo(
    () =>
      (
        request: { placeId: string },
        callback: (placeResult: any, status: any) => void,
      ) => {
        ;(getDetailsService.current as any).getDetails(request, callback)
      },

    [],
  )
  const extractPostalCode = (addressComponents: any) => {
    if (!Array.isArray(addressComponents)) return ""

    const postalCodeComponent = addressComponents.find(
      (component) =>
        component.types.includes("postal_code") ||
        component.types.includes("postal_code_prefix"),
    )

    return postalCodeComponent ? postalCodeComponent.long_name : ""
  }
  const extractStreet = (addressComponents: any) => {
    if (!Array.isArray(addressComponents)) return ""

    const streetComponent = addressComponents.find((component) =>
      component.types.includes("route"),
    )

    return streetComponent ? streetComponent.long_name : ""
  }
  const extractStreetNumber = (addressComponents: any) => {
    if (!Array.isArray(addressComponents)) return ""

    const streetNumberComponent = addressComponents.find((component) =>
      component.types.includes("street_number"),
    )

    return streetNumberComponent ? streetNumberComponent.long_name : ""
  }
  const extractCity = (addressComponents: any) => {
    if (!Array.isArray(addressComponents)) return ""

    const cityComponent = addressComponents.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("administrative_area_level_1"),
    )

    return cityComponent ? cityComponent.long_name : ""
  }
  React.useEffect(
    () => {
      let active = true

      if (!autocompleteService.current && (window as any).google) {
        autocompleteService.current = new (
          window as any
        ).google.maps.places.AutocompleteService()
      }
      if (!getDetailsService.current && (window as any).google) {
        getDetailsService.current = new (
          window as any
        ).google.maps.places.PlacesService(document.createElement("div"))
      }
      if (!autocompleteService.current) {
        return undefined
      }
      if (!getDetailsService.current) {
        return undefined
      }
      if (inputValue === "") {
        setOptions(value ? [value] : [])
        return undefined
      }
      if (value) {
        fetchDetails({ placeId: value.place_id }, (placeResult, status) => {
          if (
            status === (window as any).google.maps.places.PlacesServiceStatus.OK
          ) {
            console.log(placeResult)
            setPlaceDetails({
              lat: placeResult.geometry.location.lat(),
              lng: placeResult.geometry.location.lng(),
              postalCode: extractPostalCode(placeResult.address_components),
              street: extractStreet(placeResult.address_components),
              number: extractStreetNumber(placeResult.address_components),
              city: extractCity(placeResult.address_components),
            })
          }
        })
      }

      fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = []

          if (value) {
            newOptions = [value]
          }

          if (results) {
            newOptions = [...newOptions, ...results]
          }

          setOptions(newOptions)
        }
      })

      return () => {
        active = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, inputValue, fetch, fetchDetails],
  )

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      disableClearable
      fullWidth
      value={value!}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ihren Standort"
          fullWidth
          focused
          color="info"
          required
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default GoogleMaps
