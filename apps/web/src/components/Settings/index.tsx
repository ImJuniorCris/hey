import SingleAccount from "@/components/Shared/Account/SingleAccount";
import BackButton from "@/components/Shared/BackButton";
import { PageLayout } from "@/components/Shared/PageLayout";
import { Card, CardHeader } from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import {
  AdjustmentsVerticalIcon,
  ArrowRightIcon,
  AtSymbolIcon,
  CodeBracketIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  NoSymbolIcon,
  PaintBrushIcon
} from "@heroicons/react/24/outline";
import type { AccountFragment } from "@hey/indexer";
import { Link } from "react-router";

const AccountSettings = () => {
  const { currentAccount } = useAccountStore();

  const settingsPages = [
    {
      icon: <PaintBrushIcon className="size-5" />,
      title: "Personalize",
      url: "/settings/personalize"
    },
    {
      icon: <CurrencyDollarIcon className="size-5" />,
      title: "Monetize",
      url: "/settings/monetize"
    },
    {
      icon: <CreditCardIcon className="size-5" />,
      title: "Funds",
      url: "/settings/funds"
    },
    {
      icon: <AtSymbolIcon className="size-5" />,
      title: "Username",
      url: "/settings/username"
    },
    {
      icon: <AdjustmentsVerticalIcon className="size-5" />,
      title: "Preferences",
      url: "/settings/preferences"
    },
    {
      icon: <FingerPrintIcon className="size-5" />,
      title: "Manager",
      url: "/settings/manager"
    },
    {
      icon: <GlobeAltIcon className="size-5" />,
      title: "Sessions",
      url: "/settings/sessions"
    },
    {
      icon: <NoSymbolIcon className="size-5" />,
      title: "Blocked accounts",
      url: "/settings/blocked"
    },
    {
      icon: <CodeBracketIcon className="size-5" />,
      title: "Developer",
      url: "/settings/developer"
    },
    {
      icon: <ExclamationTriangleIcon className="size-5 text-red-500" />,
      title: <div className="text-red-500">Danger zone</div>,
      url: "/settings/danger"
    }
  ];

  return (
    <PageLayout title="Settings">
      <Card>
        <CardHeader icon={<BackButton path="/" />} title="Settings" />
        <div className="p-5">
          <SingleAccount
            account={currentAccount as AccountFragment}
            isBig
            showUserPreview={false}
          />
        </div>
        <div className="divider" />
        <div className="py-3">
          {settingsPages.map((page) => (
            <Link
              className="flex items-center justify-between px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              key={page.url}
              to={page.url}
            >
              <div className="flex items-center space-x-2">
                {page.icon}
                <div>{page.title}</div>
              </div>
              <div>
                <ArrowRightIcon className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </PageLayout>
  );
};

export default AccountSettings;
