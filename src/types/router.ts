import { FutureConfig } from "react-router-dom";

// Estendendo o tipo FutureConfig para incluir as flags do v7
export type ExtendedFutureConfig = FutureConfig & {
  v7_startTransition?: boolean;
  v7_relativeSplatPath?: boolean;
};
