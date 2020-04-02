import React, { useState } from "react";
const Context = React.createContext();
function ContextProvider({ children }) {
  const [fullAddress, setFullAddress] = useState([]);
  const [isError, setIsError] = useState(false);
  return (
    <Context.Provider
      value={{
        fullAddress,
        setFullAddress,
        isError,
        setIsError
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context, ContextProvider };
