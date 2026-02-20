import { Dispatch, SetStateAction } from "react"

export interface State<S> { states: Readonly<S>, setStates: Dispatch<SetStateAction<S>> }
export interface Reviews {
  name: string
  username: string
  body: string
  img: string
  url: string
}