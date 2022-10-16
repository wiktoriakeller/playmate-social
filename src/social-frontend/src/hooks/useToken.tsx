import { createContext, useContext, useState } from "react";

type TokenType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const TokenContext = createContext<TokenType>({} as TokenType);

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;

export const useToken = () => useContext(TokenContext);
