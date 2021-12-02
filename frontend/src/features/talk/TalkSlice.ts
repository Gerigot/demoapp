import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../users/UsersSlice";
import {
  AddInvitationParams,
  fetchAddNewInvitation,
  fetchSetParticipantState,
  fetchTalkInfo,
  fetchTalkRandomPartecipant,
} from "./talkAPI";

export interface Participant {
  id: number;
  user: User;
  absent: boolean;
  created: string | null;
  updated: string | null;
}

export interface Talk {
  id: number;
  talkName: string;
  talkDate: string | null;
  lastUpdate: string | null;
  expectedParticipants: Participant[];
}

export interface TalkState {
  status: "idle" | "loading" | "failed";
  talk: Talk | null;
  selectedParticipant: Participant | null;
  users: User[];
}

export const getTalkInfo = createAsyncThunk(
  "talk/getTalkInfo",
  async (id: number) => {
    const response = await fetchTalkInfo(id);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response;
  }
);
export const getTalkRandomParticipant = createAsyncThunk(
  "talk/getTalkRandomParticipant",
  async (talkId: number) => {
    const response = await fetchTalkRandomPartecipant(talkId);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response;
  }
);
export const addTalkNewInvitation = createAsyncThunk(
  "talk/addTalkNewInvitation",
  async (addInvitationParams: AddInvitationParams) => {
    await fetchAddNewInvitation(addInvitationParams);
    const response = fetchTalkInfo(addInvitationParams.talkId);
    return response;
  }
);
export const setTalkInvitationState = createAsyncThunk(
  "talk/setTalkInvitationState",
  async (setTalkInvitationStateParams: {
    talkId: number;
    invitationId: number;
    absent: boolean;
  }) => {
    await fetchSetParticipantState(setTalkInvitationStateParams);
    return fetchTalkInfo(setTalkInvitationStateParams.talkId);
  }
);

const initialState: TalkState = {
  status: "idle",
  selectedParticipant: null,
  talk: null,
  users: [],
};

export const talkSlice = createSlice({
  name: "talk",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getTalkInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTalkInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
        state.talk = action.payload;
      })
      .addCase(addTalkNewInvitation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTalkNewInvitation.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
        state.talk = action.payload;
      })
      .addCase(getTalkRandomParticipant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTalkRandomParticipant.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedParticipant = action.payload;
      })
      .addCase(setTalkInvitationState.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setTalkInvitationState.fulfilled, (state, action) => {
        state.status = "idle";
        state.talk = action.payload;
      });
  },
});

//   export const {} = talkListSlice.actions;

export default talkSlice.reducer;
