declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NFT_STORAGE_CLIENT_API_KEY: string;
      NEXT_PUBLIC_MINT_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_IPFS_URL: string;
      NEXT_PUBLIC_PRIVATE_KEY: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
