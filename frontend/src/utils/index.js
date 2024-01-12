export const isLoggedIn = () => {
    let isLoggedIn = localStorage.getItem("access");
    return isLoggedIn;
  };
  
export const logOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userId");
    window.location.reload();
  };
  
  
  