import { ConnectButton } from "@rainbow-me/rainbowkit"

function Header() {
     return (
          <header className="flex justify-between items-center">
               <p className="font-bold">Mood Nft</p>
               <ConnectButton />
          </header>
     )
}

export default Header