interface NftCardProp {
     nft: {
          image: string;
          name: string;
          mood: string;
     };
     flipMood: () => void;
     isLoading: boolean;
}


function NftCard({ nft, flipMood, isLoading }: NftCardProp) {
     return (
          <div className="min-h-screen flex flex-col items-center justify-center">

               <div className="flex flex-col w-56 border border-gray-400 p-1 gap-2 rounded-md">
                    <div className="w-full">
                         <img src={nft.image} />
                    </div>
                    <div className="flex justify-between">
                         <p className="font-semibold">{nft.name}</p>
                         <p><span>Mood:</span><span className="font-semibold">{nft.mood}</span></p>
                    </div>


                    <button
                         onClick={flipMood}
                         disabled={isLoading}
                         className="px-8 py-3 bg-black text-white rounded-lg hover:opacity-80 disabled:opacity-50"
                    >
                         {isLoading ? "Flipping..." : "Flip Mood NFT"}
                    </button>
               </div>
          </div>
     )
}

export default NftCard