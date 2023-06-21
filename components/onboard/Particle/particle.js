import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
const particle = new ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
  chainName: "polygon",
  chainId: 80001,
  wallet: {
    //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
    displayWalletEntry: false, //show wallet entry when connect particle.
    defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
    uiMode: "dark", //optional: light or dark, if not set, the default is the same as web auth.
    supportChains: [
      { id: 1, name: "Ethereum" },
      { id: 5, name: "Ethereum" },
    ], // optional: web wallet support chains.
    customStyle: {}, //optional: custom wallet style
  },
  securityAccount: {
    //optional: particle security account config
    //prompt set payment password. 0: None, 1: Once(default), 2: Always
    promptSettingWhenSign: 1,
    //prompt set master password. 0: None(default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1,
  },
});

export const particleLogin = async () => {
  try {
    const userInfo = await particle.auth.login({
      preferredAuthType: "email",
    });
    console.log(userInfo);
    const particleProvider = new ParticleProvider(particle.auth);
    const ethersProvider = new ethers.providers.Web3Provider(
      particleProvider,
      "any"
    );
    const ethersSigner = ethersProvider.getSigner();
    return ethersSigner;
  } catch (e) {
    console.log(e, "Particel Login Error");
  }
};

export default particle;
