export interface NewTalkParams {
  talkName: string;
  talkDate: string;
}

export async function fetchTalkLists() {
    const res = await fetch("/api/talks");
    const json = await res.json();
    console.log(json);
    return json;
  }
export async function fetchAddNewTalk({talkName, talkDate}:NewTalkParams ) {
    const res = await fetch("/api/talks",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        talkName, talkDate
      }) // body data type must match "Content-Type" header
    });
    const json = await res.json();
    console.log(json);
    return json;
  }
  