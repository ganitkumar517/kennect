export const isLoggedIn = () => {
    let isLoggedIn = localStorage.getItem("access");
    return isLoggedIn;
  };
  
export const logOut = () => {
    localStorage.removeItem("access");
    window.location.reload();
  };
  
  
  