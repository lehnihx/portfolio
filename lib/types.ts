import { components } from "@octokit/openapi-types"
import { Dispatch, SetStateAction } from "react"

export interface State<S> { states: Readonly<S>, setStates: Dispatch<SetStateAction<S>> }

export interface RepositoryLanguageStats {
  language: string
  files: number,
  lines: number,
  blanks: number,
  comments: number,
  linesOfCode: number
}

export type Repository = components["schemas"]["repository"]
export type Organization = components["schemas"]["organization-simple"]
export type Commit = components["schemas"]["commit"]
export type Language = components["schemas"]["language"]
export type Languages = Array<{
  name: string
  bytes: number
}>