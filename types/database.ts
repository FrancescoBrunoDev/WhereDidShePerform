export interface PersonM {
  title: string
  mUid: string
}

export interface WorkM {
  title: string
  mUid: string
}

export interface LocationM {
  title: string
  mUid: string
}

export enum StateVerification {
  PENDING,
  VERIFIED,
  REJECTED,
  NONE,
}

export enum Category {
  Season = "Season",
  Concert = "Concert",
  Religious_Event = "Religious_Event",
  Music_Theater = "Music_Theater",
}

export interface UserEventVerification {
  id: string
  user: string
  event: string
  stateVerification: StateVerification
}

export interface EventTable {
  uid: string
  title: string
  date?: Date | null
  stateVerification: StateVerification
  createdAt: Date
  updatedAt: Date
  creatorId?: string | null
  link?: string | null
}

export interface User {
  id: number
  name: string
  role: string
  email: string
  eventVerifications: [{ stateVerification: StateVerification; eventId: number }]
}
