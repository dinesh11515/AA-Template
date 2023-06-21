import { particleLogin } from "../components/onboard/particle";
import { connectWallet } from "../components/onboard/Dataverse-wallet/wallet";
import { useGoogleLogin } from "@react-oauth/google";
import { handleLoggedInToGoogle } from "@/components/onboard/LIT/LIT";

// import { handleLoggedInToGoogle } from "@/components/onboard/LIT/LIT";
export default function Onboard() {
  const login = useGoogleLogin({
    onSuccess: (res) => handleLoggedInToGoogle(res),
  });
  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="flex flex-col  items-center gap-4">
        <button
          onClick={particleLogin}
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
          onClick={connectWallet}
          className="py-2 bg-blue-800 rounded-lg text-lg tracking-wider text-white w-56"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
