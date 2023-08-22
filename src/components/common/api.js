const URL = "https://todoo.5xcamp.us/";

//得到項目
export async function getToDoList(token) {
  try {
    const res = await fetch(`${URL}todos`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const jsonData = await res.json();
    if (!res.ok) {
      throw Error("Could not fetch project");
    }
    return jsonData;
  } catch (err) {
    console.log(err);
  }
}

//新增項目
export async function addToDoListItem(token, value) {
  try {
    const res = await fetch(`${URL}todos`, {
      method: "POST",
      body: JSON.stringify({
        todo: {
          content: value,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const jsonData = await res.json();
    if (res.status === 422) {
      return new Response("新增項目不得為空", { status: 422 });
    }
    if (res.status === 400) {
      throw Error("Not Found");
    }
    return jsonData;
  } catch (err) {
    console.log(err);
    return err;
  }
}

//刪除項目
export function deleteToDoListItem(token, id) {
  fetch(`${URL}todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
}

//修改項目
export function patchToDoListItem(token, value, id) {
  fetch(`${URL}todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      todo: {
        content: value,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
}

//註冊帳號
export function postUser(value) {
  return fetch(`${URL}users`, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//完成項目
export function completeToDoListItem(token, id) {
  return fetch(`${URL}todos/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

//登入帳號
export function loginToDoList(cusData) {
  return fetch(`${URL}users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cusData),
  });
}

//登出帳號
export function logoutToDoList(token) {
  return fetch(`${URL}users/sign_out`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
}
