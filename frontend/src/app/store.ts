import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import talkListReducer from "../features/talkList/TalkListSlice";
import talkReducer from "../features/talk/TalkSlice";
import userReducer from "../features/users/UsersSlice";

export const store = configureStore({
  reducer: {
    talkList: talkListReducer,
    talk: talkReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
