import { useSelector } from "react-redux";
import { authDataSelector } from "../store/auth/reducers/auth.reducer";

const useAuth = () => {
  const data = useSelector(authDataSelector);

  return {
    isAuth: !!data?.uid,
  }
}

export default useAuth;