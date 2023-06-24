import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import { BigNumber } from "ethers";
import {
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Client, Presets } from "userop";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  UserIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { AppContext } from "@/components/context/stateContext";

import { useRouter } from "next/router";
import { Polybase } from "@polybase/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Dropdown from "../../components/Dropdown";
export default function index() {
  const { signer, simpleAccount } = useContext(AppContext);

  const router = useRouter();
  const address = router.query.address;

  const db = new Polybase({
    defaultNamespace:
      "pk/0xb5aa6ea50c67df66fc493ab2aef0d9fe423741fa7a4d1eee340e4bb806c2c1be2ae0ce9d519c07da481ad39fa22a96a0811c798db6fae6aa762889c208fee378/AA-Template",
  });
  const collectionReference = db.collection("SmartWallet");
  const [data, setData] = useState({
    id: "",
    address: "",
    ownerType: "",
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState([]);
  const getRecord = async () => {
    try {
      const record = await collectionReference.record(address).get();
      if (record.data) {
        setData(record.data);
      }

      const balance = await getBalance(
        process.env.NEXT_PUBLIC_RPC_URL,
        address
      );
      setBalance(balance);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (address) {
      getRecord();
    }
  }, [address]);

  const getBalance = async (rpcUrl, wallet) => {
    try {
      let provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const balance = await provider.getBalance(wallet);
      const network = await provider.getNetwork();
      const apiKey = process.env.NEXT_PUBLIC_EXPLORER_API_KEY;
      provider = new ethers.providers.EtherscanProvider(network, apiKey);
      const History = await provider.getHistory(wallet);
      console.log(History);
      setTransactions(History);

      return balance;
    } catch (err) {
      console.log(err);
    }
  };

  console.log(signer);

  const send = async () => {
    try {
      const receiver = document.getElementById("receiver").value;
      const amount = document.getElementById("amount").value;
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
      const client = await Client.init(rpcUrl);
      const target = ethers.utils.getAddress(receiver);
      const value = ethers.utils.parseEther(amount);
      const res = await client.sendUserOperation(
        simpleAccount.execute(target, value, "0x")
      );
      console.log(`UserOpHash: ${res.userOpHash}`);

      console.log("Waiting for transaction...");
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
      toast.success("Transaction sent");
    } catch (err) {
      console.log(err);
    }
  };

  const contractCall = async () => {
    try {
      const contractAddress = document.getElementById("contractAddress").value;
      const encodedData = document.getElementById("encodedData").value;
      const value = document.getElementById("value").value;
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

      const simpleAccount = await Presets.Builder.SimpleAccount.init(
        signer,
        rpcUrl
      );
      const client = await Client.init(rpcUrl);

      const res = await client.sendUserOperation(
        simpleAccount.execute(contractAddress, value, encodedData)
      );
      console.log(`UserOpHash: ${res.userOpHash}`);

      console.log("Waiting for transaction...");
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
    } catch (err) {
      console.log(err);
    }
  };

  function copyAddress() {
    navigator.clipboard.writeText(address);
    toast.success("Address copied");
  }

  function openExplorer() {
    window.open(process.env.NEXT_PUBLIC_EXPLORER_URL + "/address/" + address);
  }

  useState(() => {
    setMounted(true);
  }, []);

  let found = false;

  if (!mounted) {
    return null;
  }

  return (
    <div className="font-['DM_Sans']">
      {loading ? (
        <div className="flex  justify-center mt-[22%]">
          <img src="/loading.gif" className="h-8 rounded-full"></img>
        </div>
      ) : (
        <div className="font-['DM_Sans']  mx-3 xl:mx-32 xl:mt-5 text-white">
          <div className="">
            <div className="xl:flex xl:w-full xl:gap-8">
              <div className="w-full xl:w-1/2">
                <h1 className="text-lg tracking-wider font-bold text-black m-2 xl:m-0">
                  Overview
                </h1>
                <div className=" mt-2 bg-gray-900 py-5 px-7 rounded-xl">
                  <div className="flex items-center justify-between">
                    <img src="/profile.png" className="h-12 rounded-full"></img>
                    <div className="flex gap-2">
                      <div className="ml-2 bg-blue-800 rounded-md p-2 px-4">
                        <p className="text-sm font-semibold">Polygon Mumbai </p>

                        {balance && (
                          <div className="flex gap-1 text-sm items-center justify-center">
                            <p>{ethers.utils.formatEther(balance)}</p>
                            <p>MATIC</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="flex items-center gap-2 justify-between">
                      <p className="hidden xl:flex tracking-wider">{address}</p>
                      <p className="tracking-widest xl:hidden">
                        {address.slice(0, 8) + "......." + address.slice(-8)}{" "}
                      </p>
                      <div className="flex gap-2 items-center  hover:cursor-pointer">
                        <DocumentDuplicateIcon
                          className="h-5 mb-1"
                          onClick={copyAddress}
                        />
                        <ArrowTopRightOnSquareIcon
                          className="h-5 mb-1 hover:cursor-pointer"
                          onClick={openExplorer}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mt-2 text-lg">Owner</p>

                    <div className="flex mb-2 gap-2 items-center justify-between">
                      <p className="hidden xl:flex tracking-wider ">
                        {data.address}
                      </p>
                      <p className="tracking-widest xl:hidden">
                        {data.address.slice(0, 8) +
                          "......." +
                          data.address.slice(-8)}
                      </p>
                      <p className="bg-[#232323] border border-gray-600 rounded-md px-2 py-1 text-sm text-gray-300 w-fit tracking-wide capitalize">
                        {data.ownerType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-3 xl:w-1/2 xl:mt-0 ">
                <h1 className="text-lg tracking-wider font-bold text-black m-2 xl:m-0">
                  Transaction
                </h1>
                <div className=" mt-2 bg-gray-900  py-5 px-7 rounded-xl">
                  <p>Receiver address</p>
                  <input
                    className="w-full bg-white p-2 text-gray-800 rounded-md mt-2 focus:outline-none"
                    placeholder="address"
                    id="receiver"
                  ></input>
                  <p className="mt-2">Amount</p>
                  <input
                    className="w-full bg-white text-gray-800 p-2 rounded-md mt-2 focus:outline-none"
                    placeholder="0"
                    id="amount"
                  ></input>
                  <div className="mt-2 flex flex-col items-center">
                    <button
                      className="bg-blue-800 rounded-md p-2 mt-2 px-6"
                      onClick={send}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="xl:flex xl:w-full xl:gap-8">
              <div className="w-full xl:w-1/2">
                <h1 className="text-lg tracking-wider font-bold text-black m-2 xl:m-0">
                  History
                </h1>
                <div className="flex flex-col gap-2 bg-gray-900 p-2 mt-2 rounded-xl ">
                  <div className="flex flex-col gap-2 ">
                    <div>
                      {transactions.length > 0 ? (
                        transactions.map((tx, index) => {
                          return (
                            <div className="px-2 py-2 xl:flex xl:items-center xl:gap-10  xl:justify-between ">
                              {tx.to === address ? (
                                <div className="flex items-center justify-between xl:gap-3 xl:w-full">
                                  <p>{index}</p>

                                  <p className="flex gap-1">
                                    <ArrowDownRightIcon className="h-6" />
                                    <p className="">Receive</p>
                                  </p>
                                  <p className="hidden xl:flex">{tx.from}</p>
                                  <p className="xl:hidden">
                                    {tx.from.slice(0, 9)}....
                                    {tx.from.slice(-11)}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between xl:gap-3 xl:w-full">
                                  <p>{index}</p>

                                  <p className="flex gap-1">
                                    <ArrowUpRightIcon className="h-6" />
                                    <p className="">Send</p>
                                  </p>
                                  <p className="hidden xl:flex">{tx.to}</p>
                                  <p className="xl:hidden">
                                    {tx.to.slice(0, 11)}....{tx.to.slice(-11)}
                                  </p>
                                </div>
                              )}

                              <div className="flex justify-between items-center mt-2 xl:mt-0 xl:gap-3 xl:w-full">
                                <div className="flex items-center gap-1 ">
                                  <p>{ethers.utils.formatEther(tx.value)}</p>
                                  <p>MATIC</p>
                                </div>

                                <p className="h-6 text-green-500">success</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex justify-center p-2">
                          {(found = true)}
                          <p>No Transactions in History</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-1/2">
                <h1 className="text-lg tracking-wider font-bold text-black m-2 xl:m-0">
                  Contract Call
                </h1>

                <div className=" mt-2 bg-gray-900  py-5 px-7 rounded-xl">
                  <p>Contract address</p>
                  <input
                    className="w-full bg-white p-2 text-gray-800 rounded-md mt-2 focus:outline-none"
                    placeholder="address"
                    id="contractAddress"
                  ></input>
                  <p className="mt-2">Encoded Data</p>
                  <input
                    className="w-full bg-white text-gray-800 p-2 rounded-md mt-2 focus:outline-none"
                    placeholder="0x..."
                    id="encodedData"
                  ></input>
                  <p className="mt-2">value</p>
                  <input
                    className="w-full bg-white text-gray-800 p-2 rounded-md mt-2 focus:outline-none"
                    placeholder="0"
                    id="value"
                  ></input>
                  <div className="mt-2 flex flex-col items-center">
                    <button
                      className="bg-blue-800 rounded-md p-2 mt-2 px-6"
                      onClick={contractCall}
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:mt-4">
            <div className="xl:flex xl:w-full xl:gap-8">
              <div className="w-full mt-3 xl:w-1/2 xl:mt-0 "></div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
