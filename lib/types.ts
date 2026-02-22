import { DefaultLocales } from "@/app/dictionaries"
import { Dispatch, SetStateAction } from "react"

export interface State<S> { states: Readonly<S>, setStates: Dispatch<SetStateAction<S>> }
export type Review = {
  name: string
  username: string
  body: string
  avatar: string
  reviewLink: string
  banner: string
  color: string | null
  locale: string | undefined
  verified: boolean | undefined
  avatar_decoration: string | undefined
  tag: string | null | undefined
  badge: string | null | undefined
} | undefined

export interface Profile {
  profile: string
}

export type ReviewsJSON = DefaultLocales["reviews"]

export type ReviewUserId = keyof ReviewsJSON
