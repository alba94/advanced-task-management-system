import { provideStore } from "@ngrx/store";
import { reducers } from "./reducers";
import { provideEffects } from "@ngrx/effects";

export const APP_STORE_PROVIDERS = [
  provideStore(reducers, {}),
  provideEffects([]),
]
