import { Presets } from "userop";

export default async function getAddress(signer) {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    signer,
    rpcUrl
  );
  const address = simpleAccount.getSender();

  console.log(`SimpleAccount address: ${address}`);
  return address;
}
