import React, { createContext, useContext, useReducer } from "react";
import { Gender, Patient } from "../types";
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patientForDetails: Patient;
};
const initialPatient: Patient = {
  name: "",
  occupation: "",
  gender: Gender.Other,
  id: "",
};

const initialState: State = {
  patients: {},
  patientForDetails: initialPatient,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
