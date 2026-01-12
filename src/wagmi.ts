import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Raffly",
  projectId: "8bfcca1bec588ee49eb9a9d3bec0366f",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/aaxrGa8VEh52TN1VecghguZmgvAOV78Q"),
  },
});
