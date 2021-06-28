export type LogIn = (newMethod?: "metamask") => Promise<void | boolean>;
export type LogOut = () => void;
export type AuthData = {
  address: string | undefined;
  role?: "admin" | "user" | "guest";
  authenticationMethod?: "metamask";
};

export interface AuthProps {
  authData: AuthData;
  logIn: LogIn;
  logOut: LogOut;
  hasMetamask: boolean;
}
