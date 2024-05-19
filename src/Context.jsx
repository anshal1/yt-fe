import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getUser } from "./Services/user.service";

export const UserContext = createContext();

const Context = ({ children }) => {
  const [User, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ User }}>{children}</UserContext.Provider>
  );
};

export default Context;
