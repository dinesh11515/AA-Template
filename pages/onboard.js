import { particleLogin } from "../components/onboard/Particle/particle";
import { connectWallet } from "../components/onboard/Dataverse-wallet/wallet";
import { useGoogleLogin } from "@react-oauth/google";
import { handleLoggedInToGoogle } from "@/components/onboard/LIT/LIT";
import getAddress from "@/components/helpers/address";
import { useContext, useEffect } from "react";
import { AppContext } from "@/components/context/stateContext";
import { useRouter } from "next/router";
export default function Onboard() {
  const { setSigner, setAddress, address } = useContext(AppContext);
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (res) => handleLoggedInToGoogle(res),
  });

  const handleParticleLogin = async () => {
    try {
      const signer = await particleLogin();
      setSigner(signer);
      const account = await getAddress(signer);
      setAddress(account);
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWalletConnect = async () => {
    try {
      const signer = await connectWallet();
      setSigner(signer);
      const account = await getAddress(signer);
      setAddress(account);

      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

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
        <button
          onClick={() => login()}
          className="py-2  bg-blue-800 rounded-lg text-lg tracking-wider text-white w-56"
        >
          Continue with LIT PKP
        </button>
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
