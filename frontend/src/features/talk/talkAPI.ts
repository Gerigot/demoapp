export interface AddInvitationParams {
  talkId: number;
  userId: number;
}

export async function fetchUsers() {
  const res = await fetch(`/api/users/`);
  const json = await res.json();
  console.log(json);
  return json;
}
export async function fetchTalkInfo(talkId: number) {
  const res = await fetch(`/api/talks/${talkId}`);
  const json = await res.json();
  console.log(json);
  return json;
}
export async function fetchTalkRandomPartecipant(talkId: number) {
  const res = await fetch(`/api/talks/${talkId}/selectParticipant`);
  const json = await res.json();
  console.log(json);
  return json;
}

export async function fetchAddNewInvitation({
  talkId,
  userId,
}: AddInvitationParams) {
  const res = await fetch(`/api/talks/${talkId}/addInvitation`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }), // body data type must match "Content-Type" header
  });
  const json = await res.json();
  console.log(json);
  return json;
}
export async function fetchSetParticipantState({
  invitationId,
  absent,
}: {
  invitationId: number;
  absent: boolean;
}) {
  const res = await fetch(`/api/invitations/${invitationId}/absent`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      absent,
    }), // body data type must match "Content-Type" header
  });
  const json = await res.json();
  console.log(json);
  return json;
}
