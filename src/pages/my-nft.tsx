import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from "wagmi";
import { MOOD_NFT_ADDRESS, parseTokenURI } from '@/lib/constants';
import abi from "@/abi/MoodNft.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NftCard from "@/components/card/nft-card";



function MyNft() {
     const { address, isConnected } = useAccount();
     const navigate = useNavigate();
     const { writeContract, isPending } = useWriteContract();
     const { data: balance } = useReadContract({
          address: MOOD_NFT_ADDRESS,
          abi,
          functionName: "balanceOf",
          args: address ? [address] : undefined,
     });

     const hasNft = balance !== undefined && Number(balance) > 0;

     const { data: tokenId } = useReadContract({
          address: MOOD_NFT_ADDRESS,
          abi,
          functionName: "getTokenIdByOwner",
          args: [address]
     })



     const { data: tokenURI, refetch } = useReadContract({
          address: MOOD_NFT_ADDRESS,
          abi,
          functionName: "tokenURI",
          args: tokenId !== undefined ? [tokenId] : undefined,
     })

     useWatchContractEvent({
          address: MOOD_NFT_ADDRESS,
          abi,
          eventName: "NftFlipped",
          onLogs: () => {
               refetch();
          },
     });


     console.log(tokenURI, "Token Uri")
     console.log(tokenId, "Token ID")

     useEffect(() => {
          if ((isConnected && !hasNft) || !isConnected) {
               navigate("/");
          }
     }, [isConnected, hasNft, navigate]);


     if (!tokenURI) return <p>Loading NFT....</p>

     const metadata = parseTokenURI(String(tokenURI))

     console.log(metadata)

     function _flipMood() {
          writeContract({
               address: MOOD_NFT_ADDRESS,
               abi,
               functionName: "flipMoodNft",
               args: tokenId !== undefined ? [tokenId] : undefined
          })



     }

     return (
          <div>
               <NftCard nft={metadata} flipMood={_flipMood} isLoading={isPending} />
          </div>
     )
}

export default MyNft