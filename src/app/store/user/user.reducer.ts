import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import { UserRS } from "@lib/interfaces/user";

export const usersFeatureKey = 'users';

export interface UsersFeatureState {
  users: UserRS[] | null;
}

const initialState: UsersFeatureState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
  })),
  on(UserActions.loadUsersSuccess, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
)
