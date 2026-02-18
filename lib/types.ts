import { Dispatch, SetStateAction } from "react";

export interface State<S> { states: Readonly<S>, setStates: Dispatch<SetStateAction<S>> }