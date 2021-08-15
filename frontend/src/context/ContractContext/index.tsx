import React from "react";
import { initialState } from "./state";

export const ContractContext = React.createContext<GameState>(initialState);

export const ContractProvider = () => {};
