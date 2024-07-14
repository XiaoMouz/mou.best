import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://appwrite.mou.best/v1")
  .setProject("667ee08800051c3c2085"); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
