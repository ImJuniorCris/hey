import defaultMetadata from "@/defaultMetadata";
import getAccount from "@hey/helpers/getAccount";
import getAvatar from "@hey/helpers/getAvatar";
import { AccountDocument } from "@hey/indexer";
import apolloClient from "@hey/indexer/apollo/client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const { username } = await params;

  const { data } = await apolloClient().query({
    query: AccountDocument,
    variables: { request: { username: { localName: username } } }
  });

  if (!data.account) {
    return defaultMetadata;
  }

  const account = data.account;
  const { name, link, usernameWithPrefix } = getAccount(account);
  const title = `${name} (${usernameWithPrefix}) • Hey`;
  const description = (account?.metadata?.bio || title).slice(0, 155);

  return {
    alternates: { canonical: `https://hey.xyz${link}` },
    applicationName: "Hey",
    creator: name,
    description: description,
    metadataBase: new URL(`https://hey.xyz${link}`),
    openGraph: {
      description: description,
      images: [getAvatar(account)],
      siteName: "Hey",
      type: "profile",
      url: `https://hey.xyz${link}`
    },
    other: {
      "lens:username": username,
      "lens:id": account.address
    },
    publisher: name,
    title: title,
    twitter: { card: "summary", site: "@heydotxyz" }
  };
};

const Page = async ({ params }: Props) => {
  const { username } = await params;
  const metadata = await generateMetadata({ params });

  if (!metadata) {
    return <h1>{username}</h1>;
  }

  return (
    <>
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </>
  );
};

export default Page;
