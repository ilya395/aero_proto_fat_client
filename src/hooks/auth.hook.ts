import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import localAuthDataService from "../services/localAuthData/localAuthData.service";

const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  useEffect(() => {
    setLoading(true);
    const signed = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        localAuthDataService.setAuthData(JSON.stringify({
          uid: user.uid,
          email: user.uid,
        }));
        setLoading(false);
        return setAuthUser(user);
      }
      localAuthDataService.removeAuthData();
      setLoading(null);
      return setAuthUser(null);
    });
    return () => signed();
  }, []);
  // const data = useSelector(authDataSelector);
  // const localUid = localAuthDataService.getUId();
  return {
    isAuth: !!authUser, //  !!localUid, // !!data?.uid,
    loading,
  }
}

export default useAuth;