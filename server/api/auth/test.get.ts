import { account, ID } from "@/utils/appwrite.js";

export default eventHandler(async (event) => {
  let loggedInUser;
  let email = "";
  let password = "";
  let name = "";

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    loggedInUser = await account.get();
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  const logout = async () => {
    await account.deleteSession("current");
    loggedInUser = null;
  };
});
