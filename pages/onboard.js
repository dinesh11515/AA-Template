import { particleLogin } from "../components/onboard/Particle/particle";
import { connectWallet } from "../components/onboard/Dataverse-wallet/wallet";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoggedInToGoogle } from "@/components/onboard/LIT/LIT";
import getAddress from "@/components/helpers/address";
import { useContext, useEffect } from "react";
import { AppContext } from "@/components/context/stateContext";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { Polybase } from "@polybase/client";
import { Client, Presets } from "userop";

export default function Onboard() {
  const { signer, setSigner, setAddress, address, setSimpleAccount } =
    useContext(AppContext);
  const router = useRouter();

  const handleParticleLogin = async () => {
    try {
      const signer = await particleLogin();
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
      setSigner(signer);
      const simpleAccount = await Presets.Builder.SimpleAccount.init(
        signer,
        rpcUrl
      );
      const account = simpleAccount.defaultOp.sender;
      setSimpleAccount(simpleAccount);
      setAddress(account);
      const walletAddress = await signer.getAddress();
      await createRecord(account, walletAddress, "Particle");
      router.replace("/wallet/" + account);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      console.log(signer);
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
      setSigner(signer);
      const simpleAccount = await Presets.Builder.SimpleAccount.init(
        signer,
        rpcUrl
      );
      console.log(simpleAccount);
      const account = simpleAccount.defaultOp.sender;
      setSimpleAccount(simpleAccount);
      setAddress(account);
      console.log(account);
      const walletAddress = await signer.getAddress();
      await createRecord(account, walletAddress, "Dataverse");
      router.replace("/wallet/" + account);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (res) => {
    try {
      const signer = await handleLoggedInToGoogle(res);
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
      setSigner(signer);
      const simpleAccount = await Presets.Builder.SimpleAccount.init(
        signer,
        rpcUrl
      );
      const account = simpleAccount.defaultOp.sender;
      setSimpleAccount(simpleAccount);
      setAddress(account);
      const walletAddress = signer.address;
      await createRecord(account, walletAddress, "LIT PKP");
      router.replace("/wallet/" + account);
    } catch (error) {
      console.log(error);
    }
  };

  const db = new Polybase({
    defaultNamespace:
      "pk/0xb5aa6ea50c67df66fc493ab2aef0d9fe423741fa7a4d1eee340e4bb806c2c1be2ae0ce9d519c07da481ad39fa22a96a0811c798db6fae6aa762889c208fee378/AA-Template",
  });
  const collectionReference = db.collection("SmartWallet");

  async function createRecord(account, walletAddress, ownerDetails) {
    try {
      const record = await collectionReference.create([
        account,
        walletAddress,
        ownerDetails,
      ]);
      console.log(record);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="flex flex-col  items-center gap-4">
        <button
          onClick={handleParticleLogin}
          className="py-2  bg-blue-800 rounded-lg text-lg tracking-wider text-white w-56  "
        >
          Continue with Particle
        </button>
        <p className="text-lg">OR</p>
        <div className="flex items-center flex-col">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
            clientId="260356816232-qm10ch3k345h9jh2uhh7ma71f3m00pvo.apps.googleusercontent.com"
          />
          <p className="text-sm mt-2">Powered by LIT PKP's</p>
        </div>
        <p className="text-lg">OR</p>
        <button
          onClick={handleWalletConnect}
          className="py-2 bg-blue-800 rounded-lg text-lg tracking-wider text-white w-56"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
