import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import localAuthDataService from "../services/localAuthData/localAuthData.service";

const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  useEffect(() => {
    const signed = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        localAuthDataService.setAuthData(JSON.stringify({
          uid: user.uid,
          email: user.uid,
        }));
        return setAuthUser(user);
      }
      localAuthDataService.removeAuthData();
      return setAuthUser(null);
    });
    return () => signed();
  }, []);
  // const data = useSelector(authDataSelector);
  // const localUid = localAuthDataService.getUId();
  return {
    isAuth: !!authUser, //  !!localUid, // !!data?.uid,
  }
}

export default useAuth;