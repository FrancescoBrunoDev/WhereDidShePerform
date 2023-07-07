import {
  ExternalLink,
  Github,
  Info,
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  Loader2,
  Settings2,
  X,
  ArrowRight,
  Undo,
  Home,
  CheckCircle2,
  LogIn,
  User,
  Circle,
  type Icon as LucideIcon,
} from "lucide-react"
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb"

export type Icon = LucideIcon

export const Icons = {
  status: Circle,
  user: User,
  login: LogIn,
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  undo: Undo,
  home: Home,
  check: CheckCircle2,
  gitHub: Github,
  loader: Loader2,
  exit: X,
  info: Info,
  externalLink: ExternalLink,
  settings: Settings2,
  arrowRight: ArrowRight,
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
  google: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 24 24'>
      <path
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        fill='#4285F4'
      />
      <path
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        fill='#34A853'
      />
      <path
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
        fill='#FBBC05'
      />
      <path
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        fill='#EA4335'
      />
      <path d='M1 1h22v22H1z' fill='none' />
    </svg>
  ),
}
