import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from "wagmi";
import { MOOD_NFT_ADDRESS } from '@/lib/constants';
import abi from "@/abi/MoodNft.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

     const { address, isConnected } = useAccount();
     const { writeContract, isPending } = useWriteContract();
     const navigate = useNavigate();
     const { data: balance, refetch } = useReadContract({
          address: MOOD_NFT_ADDRESS,
          abi,
          functionName: "balanceOf",
          args: address ? [address] : undefined,
     });

     const hasNft = balance !== undefined && Number(balance) > 0;

     function mintHappyNft() {
          console.log("Minting...")

          writeContract({
               address: MOOD_NFT_ADDRESS,
               abi,
               functionName: "mintNft",
          });

          console.log("Done Minting...")
     }

     useWatchContractEvent({
          address: MOOD_NFT_ADDRESS,
          abi,
          eventName: "MintMood",
          onLogs: () => {
               refetch();
          },
     });


     console.log(hasNft);

     useEffect(() => {
          if (isConnected && hasNft) {
               navigate("/my-nft")
          }
     }, [isConnected, hasNft, navigate])

     return (<div className="flex flex-col justify-center gap-4 items-center mt-10">
          <div className="text-center">
               <p className="text-lg text-gray-600 px-20    ">Mood NFT is a simple on-chain NFT that reflects how you feel.
                    You mint it happy by default, and whenever your mood changes,
                    you can flip it directly on-chain.</p>

          </div>

          <section className="max-w-2xl mb-12">
               <h2 className="text-2xl font-semibold mb-4">
                    How it works
               </h2>
               <ol className="text-left space-y-3 text-gray-700">
                    <li>1. Connect your wallet</li>
                    <li>2. Mint your Mood NFT (starts happy)</li>
                    <li>3. View your NFT on the dashboard</li>
                    <li>4. Flip the mood anytime you want</li>
               </ol>
          </section>

          <section>
               {!isConnected && (
                    <p className="text-gray-500">
                         Connect your wallet to get started.
                    </p>
               )}

               {isConnected && !hasNft && (
                    <button
                         onClick={mintHappyNft}
                         disabled={isPending}
                         className="px-8 py-3 bg-black text-white rounded-lg hover:opacity-80 disabled:opacity-50"
                    >
                         {isPending ? "Minting..." : "Mint Happy Mood NFT"}
                    </button>
               )}

               {/* {isConnected && hasNft ? (
                    <p className="text-green-600 font-medium">
                         You already own a Mood NFT. Head to your dashboard to view it.
                    </p>
               ) : null} */}
          </section>


     </div>)
}

export default Home