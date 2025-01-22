import { services } from "@/apis/services";
import firebaseInitialize from "@/configs/firebase";
import { login, logout, setUser } from "@/store/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteCookie, getCookies, setCookies } from "@/utils/serverActions";
import { UserData } from "@repo/shared/src/types/userType.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export function useFirebaseAuth() {
  const { auth } = firebaseInitialize();
  const userState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const setUserData = async (userId: string, refresh = false) => {
    if (refresh) {
      sessionStorage.removeItem("user_data");
    }

    const userDataFromSessionStorage = sessionStorage.getItem("user_data");
    if (userDataFromSessionStorage) {
      const persistentUserData: UserData = JSON.parse(
        userDataFromSessionStorage || "{}"
      );
      return dispatch(setUser({ user: persistentUserData }));
    }

    const { success, data } = await services.getUserById({
      params: { id: userId },
    });

    if (!success || !data) {
      return dispatch(setUser({ user: null }));
    }

    sessionStorage.setItem("user_data", JSON.stringify(data));
    return dispatch(setUser({ user: data }));
  };

  const getAuthState = async () => {
    await auth.authStateReady();
    const currentUser = auth.currentUser;

    return currentUser;
  };

  const authStateHandler = async (forceRefresh = false) => {
    const currentUser = await getAuthState();

    if (!currentUser) {
      sessionStorage.removeItem("user_data");
      return dispatch(logout());
    }

    const userIdToken = await currentUser.getIdToken(true);
    const [currentSessionToken] = await getCookies(["session_token"]);

    if (currentSessionToken?.value !== userIdToken) {
      await setCookies([{ name: "session_token", value: userIdToken }]);
    }
    dispatch(login({ idToken: userIdToken }));
    await setUserData(currentUser.uid, forceRefresh);
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    const { success, error } = await services.registerUser({
      data: { name, email, password },
    });

    if (!success)
      return { success: false, message: "Signup Failed", data: null, error };

    return await signInUser(email, password);
  };

  const signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return {
          success: true,
          message: "Login Success",
          data: {
            user: {
              displayName: userCredential.user.displayName,
              email: userCredential.user.email,
            },
          },
          error: null,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: "Login Failed",
          data: null,
          error: err,
        };
      });
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      await deleteCookie("session_token");
      authStateHandler();
      return { success: true, message: "Logout Success", error: null };
    } catch (err) {
      return {
        success: false,
        message: "Logout Failed",
        error: err,
      };
    }
  };

  return {
    auth,
    userState,
    getAuthState,
    authStateHandler,
    setUserData,
    registerUser,
    signInUser,
    logoutUser,
  };
}
