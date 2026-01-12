export const MOOD_NFT_ADDRESS = "0x2a5CCBB0a4EaFB8eD62A2c00F0BCB97e73A175A5";

export function parseTokenURI(uri: string) {
  const base64 = uri.split(",")[1];
  return JSON.parse(atob(base64));
}
