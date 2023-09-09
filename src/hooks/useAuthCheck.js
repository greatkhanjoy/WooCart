import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNonce } from "../features/auth/authSlice";

const useAuthCheck = (data) => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(setNonce({ nonce: data.nonce, wc_nonce: data.wc_nonce }));
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
};

export default useAuthCheck;
