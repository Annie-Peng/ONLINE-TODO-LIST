const URL = "https://fathomless-brushlands-42339.herokuapp.com/todo2";

//得到項目
export function getToDoList() {
  // console.log(setToDoListData);
  fetch(URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

//新增項目
export function addToDoListItem(value) {
  fetch(URL, {
    method: "POST",
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