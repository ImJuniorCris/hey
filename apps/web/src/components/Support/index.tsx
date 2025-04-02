import MetaTags from "@/components/Common/MetaTags";
import { Card, GridItemTwelve, GridLayout, H3 } from "@/components/Shared/UI";
import { APP_NAME } from "@hey/data/constants";
import { Link } from "react-router";

const Support = () => {
  return (
    <GridLayout>
      <MetaTags title={`Support • ${APP_NAME}`} />
      <GridItemTwelve>
        <Card className="flex flex-col items-center p-8">
          <div className="linkify max-w-xl text-center">
            <H3>Support</H3>
            <p className="mt-3">
              For assistance, please email us at{" "}
              <Link to="mailto:support@hey.xyz">support@hey.xyz</Link> with a
              detailed description of your issue and how we can assist you.
            </p>
            <ul className="my-5 space-y-2">
              <li>
                <Link to="/guidelines">Community Guidelines</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Hey Privacy Policy</Link>
              </li>
              <li>
                <Link
                  to="https://www.lens.xyz/legal/lens.xyz-privacy-policy.pdf"
                  target="_blank"
                >
                  Lens Protocol Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/copyright">Copyright Policy</Link>
              </li>
            </ul>
            <p className="text-neutral-500 text-sm">
              Send any legal requests to{" "}
              <Link to="mailto:legal@hey.xyz">legal@hey.xyz</Link>
            </p>
          </div>
        </Card>
      </GridItemTwelve>
    </GridLayout>
  );
};

export default Support;
