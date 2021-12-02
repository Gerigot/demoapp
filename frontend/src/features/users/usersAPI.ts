export interface NewUserParams {
  username: string;
}
export async function fetchAddNewUser({ username }: NewUserParams) {
  const res = await fetch("/api/users", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }), // body data type must match "Content-Type" header
  });
  const json = await res.json();
  console.log(json);
  return json;
}
