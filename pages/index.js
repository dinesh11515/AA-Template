import Head from "next/head";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>AA Temp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center mt-3 md:mt-10 xl:mx-60 gap-2">
        <h1 className="text-xl font-semibold">Account Abstraction Template</h1>
        <p className="text-lg text-center px-4  xl:px-16 tracking-wide">
          This AA Wallet Template was created to help hackers or developers who
          wish to create an AA wallet, particularly for hackathons. This
          template includes fundamental features such as user operations,
          transaction bundling and master key management, allowing hackers to
          concentrate on developing the core functionalities of their AA wallet
          using this foundation.so they can more focus on their core
          functionalities rather wasting time on building this base stuff. This
          wallet master key management was Powered by LIT PKP's, Particle and
          Dataverse Wallet.This uses the Stackup's bundler and Userop.js to do
          the transaction bundling and user operations.
        </p>
        <p className="text-lg text-center px-2 xl:px-16 tracking-wide">
          You can clone this repo from
          <a
            href="https://github.com/dinesh11515/AA-Template"
            className="text-blue-500 hover:text-blue-700 underline mx-1"
          >
            here
          </a>
          and start building the crazy stuff as real bulidors.
        </p>
        <p className="text-lg text-center px-3 xl:px-16 tracking-wide">
          This was home page of your AA Wallet replace this code with a
          beautiful home page showing your AA Wallet features.
        </p>
        <button
          className="text-lg bg-blue-700 hover:bg-blue-500 text-white py-2 my-4 px-4 rounded-xl"
          onClick={() => {
            router.push("/onboard");
          }}
        >
          Create Wallet
        </button>
      </div>
    </>
  );
}
