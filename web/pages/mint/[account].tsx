import { useContext, useState } from "react";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { Contract } from "ethers";
import { NFTStorage, File } from "nft.storage";
import { Token, TokenInput } from "nft.storage/dist/src/token";

import { FormValues, ImageWrapper, MintingForm, NotificationAlert } from "@components";
import { ContractServiceContext } from "@contexts";
import { useNotification } from "@hooks";
import { Metadata } from "@models";

const nftStorageClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_CLIENT_API_KEY,
});

const View: NextPage = () => {
  const router: NextRouter = useRouter();
  const account = router.query?.account as string;
  const { getContract } = useContext(ContractServiceContext);
  const [processText, setProcessText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const { createNotification, closeNotification, notification, showNotification } = useNotification();

  const goToDashboard = (account: string) => {
    router.push({
      pathname: `/dashboard/${account}`,
    });
  };

  const uploadMetadata = async (metadata: Metadata) => {
    setProcessText("Uploading Drug metadata...");
    const storageResult: Token<TokenInput> = await nftStorageClient.store(metadata);
    return storageResult.url;
  };

  const listenForCompletion = (contract: Contract, drugName: string) => {
    contract.once("DrugCreated", () => {
      setLoading(false);
      setCompleted(true);
      createNotification({
        title: "Success!",
        message: `Drug ${drugName} created successfully. Redirecting you to the Dashboard...`,
      });
      setTimeout(() => {
        goToDashboard(account);
      }, 3000);
    });
  };

  const mintDrug = (contract: Contract, values: FormValues, metadataURI: string) => {
    setProcessText("Minting Drug...");
    contract
      .mintProduct(
        account,
        values.name,
        values.activeIngredients,
        values.dosageForm,
        values.route,
        values.strength,
        metadataURI
      )
      .catch((error: any) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleSubmit = async (values: FormValues, activeIngredients: string[], image?: File) => {
    try {
      setLoading(true);
      setCompleted(false);
      setProcessText("Creating Drug metadata...");

      const metadata = {
        name: values.name,
        description: "",
        image: image || new File([], values.name),
      };

      const metadataURI = await uploadMetadata(metadata);
      const drugMinterContract = getContract();
      listenForCompletion(drugMinterContract, values.name);
      mintDrug(drugMinterContract, { ...values, activeIngredients }, metadataURI);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <ImageWrapper>
        <div className="flex flex-col justify-center w-full h-full rounded-l-xl px-6 py-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col w-full items-center justify-start my-2">
              <div className="w-full">
                <MintingForm
                  completed={completed}
                  processText={processText}
                  loading={loading}
                  onSubmit={(values, activeIngredients, image) => handleSubmit(values, activeIngredients, image)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-auto lg:w-full h-full bg-slate-100 bg-[url('/person-studying-at-a-desk.png')] bg-no-repeat bg-center rounded-r-xl"></div>
      </ImageWrapper>
      <NotificationAlert
        notification={notification}
        show={showNotification}
        onClose={() => closeNotification()}
      ></NotificationAlert>
    </>
  );
};

export default View;
