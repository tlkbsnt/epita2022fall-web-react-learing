

import { AuthContext } from "@/contexts/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const theRouter = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      theRouter.push("/auth/login");
    }
  }, [isAuthenticated, theRouter]);

  return isAuthenticated ? <div>{children}</div> : <p>Loading...</p>;
};

export default MainLayout;
