import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";
import axios from 'axios'
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const callFunction=async()=>{
  try {
    const response = await axios.post("/.netlify/functions/store-in-db", {
      key,
      value,
    });

    if (response.status === 200) {
      console.log(response.data.message);
    } else {
      console.log("Error storing data");
    }
  } catch (error) {
    console.log("An error occurred");
  }
}
  useEffect(() => {
      // on login
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      callFunction()
      netlifyIdentity.close();
    });

    // on logout
    netlifyIdentity.on("logout", (user) => {
      setUser(null);
    });


    // connect with Netlify Identity
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };


  const logout = () => {
    netlifyIdentity.logout();
  };


  const context = {
    login,
    logout,
    user,
  };


  return (
    <AuthContext.Provider value={context}>
    {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;