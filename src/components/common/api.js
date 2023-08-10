const URL = "https://todoo.5xcamp.us/";

//得到項目
export function getToDoList(token) {
  // console.log(token);
  return fetch(`${URL}todos`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

//新增項目
export function addToDoListItem(token, value) {
  return fetch(`${URL}todos`, {
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
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
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
  fetch(`${URL}users`, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}
