import { H4 } from "@/components/Shared/UI";
import { STATIC_IMAGES_URL } from "@hey/data/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCreateGroupStore } from "./CreateGroup";

const Success = () => {
  const { push } = useRouter();
  const { groupAddress, setScreen } = useCreateGroupStore();

  useEffect(() => {
    setTimeout(() => {
      if (groupAddress) {
        push(`/g/${groupAddress}`).then(() => {
          setScreen("details");
        });
      }
    }, 3000);
  }, [groupAddress]);

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <H4>Waaa-hey! You got your group!</H4>
      <div className="ld-text-gray-500 mt-3 text-center font-semibold">
        Welcome to decentralised social where everything is sooooooooooooo much
        better! 🎉
      </div>
      <Image
        alt="Dizzy emoji"
        className="mx-auto mt-8 size-14"
        src={`${STATIC_IMAGES_URL}/emojis/dizzy.png`}
        height={56}
        width={56}
      />
      <i className="ld-text-gray-500 mt-8">
        We are taking you to your group...
      </i>
    </div>
  );
};

export default Success;
