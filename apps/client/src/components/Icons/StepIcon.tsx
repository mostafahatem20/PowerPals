import { SvgIcon } from "@mui/material"

const StepIcon = ({ done }: { done: boolean }) => {
  return (
    <SvgIcon>
      {done ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z"
            stroke="#4057E3"
            strokeWidth="1.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9998 19.2C15.9763 19.2 19.1998 15.9765 19.1998 12C19.1998 8.0236 15.9763 4.80005 11.9998 4.80005C8.02335 4.80005 4.7998 8.0236 4.7998 12C4.7998 15.9765 8.02335 19.2 11.9998 19.2Z"
            fill="#4057E3"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.25 10C19.25 15.1086 15.1086 19.25 10 19.25C4.89137 19.25 0.75 15.1086 0.75 10C0.75 4.89137 4.89137 0.75 10 0.75C15.1086 0.75 19.25 4.89137 19.25 10Z"
            stroke="#A9A9A9"
            strokeWidth="1.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"
            fill="#A9A9A9"
          />
        </svg>
      )}
    </SvgIcon>
  )
}

export default StepIcon
