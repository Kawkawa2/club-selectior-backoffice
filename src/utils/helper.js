
const KEY = "user";
function setUser(token) {
   console.log("Userrr Conect",token)
   localStorage.setItem(KEY, token);
}

function getUser() {
  return localStorage.getItem(KEY);
}

function isAdmin(){
    if(getUser()){
       console.log(getUser());
        return JSON.parse(getUser()).user.role === "admin";
    }
    return false;
}
function removeUser() {
  localStorage.removeItem(KEY);
}

function getToken() {
  if (getUser()) {
    return JSON.parse(getUser()).accessToken;
  }
  return null;
}

function logout(){
    removeUser();
    window.location.replace("/#/login");
   
}
function getHeader() {
  return {
    headers: {
      Authorization: `Bearer ${  getToken()}`,
    },
  };
}

export { logout, setUser, getUser, isAdmin, getToken,getHeader, removeUser };