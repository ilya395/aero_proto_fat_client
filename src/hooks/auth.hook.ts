import localAuthDataService from "../services/localAuthData/localAuthData.service";

const useAuth = () => {
  // const data = useSelector(authDataSelector);
  const localUid = localAuthDataService.getUId();
  return {
    isAuth: !!localUid, // !!data?.uid,
  }
}

export default useAuth;