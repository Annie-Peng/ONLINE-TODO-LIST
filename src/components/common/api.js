const URL = "https://todoo.5xcamp.us/";

//得到項目OK
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
    alert("讀取失敗，請聯絡系統管理員");
  }
}

//新增項目OK
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
      const newRes = new Response("新增項目不得為空", { status: 422 });
      const alertNewRes = await newRes.text();
      alert(alertNewRes);
      return newRes;
    }
    if (!res.ok) {
      throw Error("Not Found");
    }
    return jsonData;
  } catch (err) {
    console.log(err);
    alert("新增項目失敗，請聯絡系統管理員");
  }
}

//刪除項目OK
export async function deleteToDoListItem(token, id) {
  try {
    const res = await fetch(`${URL}todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
    alert("刪除項目失敗，請聯絡系統管理員");
  }
}

//修改項目OK
export async function patchToDoListItem(token, value, id) {
  try {
    const res = await fetch(`${URL}todos/${id}`, {
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
    });
    const jsonData = await res.json();
    if (!res.ok) {
      throw Error("Could not fetch project");
    }
    return jsonData;
  } catch (err) {
    console.log(err);
    alert("更新項目失敗，請聯絡系統管理員");
  }
}

//註冊帳號OK
export function postUser(value) {
  return fetch(`${URL}users`, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//完成項目OK
export async function completeToDoListItem(token, id) {
  try {
    const res = await fetch(`${URL}todos/${id}/toggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const jsonData = await res.json();
    console.log(jsonData);
    if (!res.ok) {
      throw Error("Could not fetch project");
    }
    return jsonData;
  } catch (err) {
    console.log(err);
    alert("切換完成項目失敗，請聯絡系統管理員");
  }
}

//登入帳號OK
export function loginToDoList(cusData) {
  return fetch(`${URL}users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cusData),
  });
}

//登出帳號OK
export async function logoutToDoList(token) {
  try {
    const res = await fetch(`${URL}users/sign_out`, {
      method: "DELETE",
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
    alert("登出失敗，請聯絡系統管理員");
  }
}
