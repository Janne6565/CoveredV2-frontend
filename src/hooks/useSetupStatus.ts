import { useAppSelector } from "@/store/store.ts";

type SetupStatus = "complete" | "incomplete";

const useSetupStatus = (): SetupStatus => {
  const userState = useAppSelector((state) => state.user);
  return userState.steamId && (userState.includeFamily === false || (userState.includeFamily && userState.accessToken)) ? "complete" : "incomplete";
};

export default useSetupStatus;