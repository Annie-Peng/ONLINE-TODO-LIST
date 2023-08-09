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
export function deleteToDoListItem(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
}

//修改項目
export function patchToDoListItem(value, id) {
  fetch(`${URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      todo: value,
      finished: false,
    }),
    headers: {
      "Content-Type": "application/json",
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
