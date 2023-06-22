import {
  RuntimeConnector,
  Extension,
  WALLET,
} from "@dataverse/runtime-connector";
export const connectWallet = async () => {
  try {
    console.log("connectWallet");
    const runtimeConnector = new RuntimeConnector(Extension);
    const res = await runtimeConnector.connectWallet();
    console.log(res);
    console.log(await runtimeConnector.wallet());
  } catch (error) {
    console.log(error);
  }
};
