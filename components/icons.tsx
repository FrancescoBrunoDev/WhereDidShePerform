import {
  ExternalLink,
  Github,
  Info,
  Laptop,
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  type Icon as LucideIcon,
} from "lucide-react"
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  gitHub: Github,
  info: Info,
  externalLink: ExternalLink,
  nextjs: (props: LucideProps) => <TbBrandNextjs {...props} />,
  tailwind: (props: LucideProps) => <TbBrandTailwind {...props} />,
  reactsimpleMaps: (props: LucideProps) => (
    <svg
      {...props}
      width="88"
      height="64"
      viewBox="0 0 88 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M61.6262 20.5157C58.0079 15.3657 52.022 12 45.25 12C34.2043 12 25.25 20.9543 25.25 32C25.25 43.0457 34.2043 52 45.25 52C48.911 52 52.3422 51.0163 55.2938 49.2989L61.6262 20.5157Z"
        fill="currentColor"
      ></path>
      <path
        d="M48.8333 23.6L51.3101 25.4575C51.4357 25.5517 51.577 25.6231 51.7274 25.6682C53.2237 26.1171 54.1411 24.0714 52.8106 23.2527L48.5 20.6C46.9571 19.6743 47.5214 17.3127 49.3161 17.1845L50.5 17.1L56.8282 16.7484C58.4974 16.6557 60.1057 17.4075 61.1087 18.7449C61.9895 19.9193 62.3125 21.4252 61.9871 22.8567L60 31.6L58.4178 38.72C58.1489 39.93 57.4417 40.9991 56.4179 41.6977C55.5206 42.31 54.4007 43.0564 53.5 43.6C52.2209 44.3719 50.508 45.2634 49.1618 45.9398C47.8712 46.5882 46.3181 46.318 45.2968 45.2967C44.4869 44.4868 44.1368 43.325 44.3643 42.2025L45.4272 36.9592C45.4756 36.7203 45.5 36.4772 45.5 36.2334C45.5 34.6607 44.4937 33.2645 43.0017 32.7672L41.823 32.3743C40.4357 31.9119 39.5 30.6136 39.5 29.1513C39.5 28.7861 39.5589 28.4234 39.6743 28.0769L40.3604 26.0188C41.0409 23.9771 42.9516 22.6 45.1038 22.6H45.8333C46.9152 22.6 47.9679 22.9509 48.8333 23.6Z"
        fill="currentColor"
      ></path>
      <path
        d="M60 31.6L58.4178 38.72C58.1489 39.93 57.4417 40.9991 56.4179 41.6977C55.5206 42.31 54.4007 43.0564 53.5 43.6C52.2209 44.3719 50.508 45.2634 49.1618 45.9398C47.8712 46.5882 46.3181 46.318 45.2968 45.2967C44.4869 44.4868 44.1368 43.325 44.3643 42.2025L45.4272 36.9592C45.4756 36.7203 45.5 36.4772 45.5 36.2334C45.5 34.6607 44.4937 33.2645 43.0017 32.7672L41.823 32.3743C40.4357 31.9119 39.5 30.6136 39.5 29.1513C39.5 28.7861 39.5589 28.4234 39.6743 28.0769L40.3604 26.0188C41.0409 23.9771 42.9516 22.6 45.1038 22.6H45.8333C46.9152 22.6 47.9679 22.9509 48.8333 23.6L51.3101 25.4575C51.4357 25.5517 51.577 25.6231 51.7274 25.6682C53.2237 26.1171 54.1411 24.0714 52.8106 23.2527L48.5 20.6C46.9571 19.6743 47.5214 17.3127 49.3161 17.1845L50.5 17.1L56.8282 16.7484C58.4974 16.6557 60.1057 17.4075 61.1087 18.7449C61.9895 19.9193 62.3125 21.4252 61.9871 22.8567L60 31.6ZM60 31.6L56.9209 32.2842C56.0858 32.4698 55.2316 32.0632 54.849 31.298C54.2292 30.0584 55.1306 28.6 56.5165 28.6H56.602C57.171 28.6 57.7106 28.8527 58.0749 29.2898L60 31.6Z"
        stroke="white"
        stroke-width="1.5"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.5 32C22.5 19.5736 32.5736 9.5 45 9.5C51.9392 9.5 58.1448 12.6414 62.2721 17.5796L63.0601 13.9977C58.4433 9.36612 52.0563 6.5 45 6.5C30.9167 6.5 19.5 17.9167 19.5 32C19.5 46.0833 30.9167 57.5 45 57.5C48.1062 57.5 51.0826 56.9446 53.8355 55.9277L54.624 52.3437C51.7062 53.7265 48.4434 54.5 45 54.5C32.5736 54.5 22.5 44.4264 22.5 32Z"
        fill="currentColor"
      ></path>
      <path
        d="M72.5 42L84 33L72.5 24"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="bevel"
      ></path>
      <path
        d="M15.5 42L4 33L15.5 24"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="bevel"
      ></path>
      <path
        d="M67.5 10L57.5 57"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
      ></path>
      <path
        d="M33.5 26.5C34 30 34.8 31 34.8 34C34.8 36.2 33 37.5 33 37.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>
      <path
        d="M29.9997 40C25.9996 31 29 20 38.9037 16"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>
    </svg>
  ),
}
