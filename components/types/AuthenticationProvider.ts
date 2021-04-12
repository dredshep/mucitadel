export type LogIn = (newMethod?: "metamask") => Promise<void | boolean>;
export type LogOut = () => void;
export type AuthData = { address: string | undefined };
