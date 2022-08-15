import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { MetamaskButton, LoginError, Subtitle, Title, ImageWrapper } from "@components";
import { useMetamaskConnection } from "@hooks";

const Home: NextPage = () => {
  const router = useRouter();
  const isUnauthorized = router.query;

  const goToDashboard = (account: string) => {
    router.push({
      pathname: `/dashboard/${account}`,
    });
  };

  const { connect, connecting, error } = useMetamaskConnection(goToDashboard);

  useEffect(() => {
    if (Object.keys(isUnauthorized)?.length) {
      console.log(`isUnauthorized: ${JSON.stringify(isUnauthorized)}`);
    }
  }, []);

  return (
    <ImageWrapper>
      <div className="flex flex-col justify-center w-full h-full rounded-l-xl px-6 py-4">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start justify-start m-2 mb-6">
            <Title text="Log in" />
            <Subtitle text="Connect to your preferred wallet provider" />
          </div>
          <MetamaskButton loading={connecting} onClick={() => connect()} />
          {error?.length > 0 && <LoginError message={error} />}
        </div>
      </div>
      <div className="flex flex-col justify-center w-auto lg:w-full h-full bg-slate-100 bg-[url('/busy-project-manager.png')] bg-no-repeat bg-center rounded-r-xl"></div>
    </ImageWrapper>
  );
};

export default Home;
