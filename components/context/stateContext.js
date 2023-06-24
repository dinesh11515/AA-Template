import { createContext, useState } from "react";

export const AppContext = createContext();

const AppWrapper = (props) => {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [simpleAccount, setSimpleAccount] = useState(null);
  return (
    <AppContext.Provider
      value={{
        signer,
        simpleAccount,
        setSimpleAccount,
        address,
        setSigner,
        setAddress,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppWrapper;
