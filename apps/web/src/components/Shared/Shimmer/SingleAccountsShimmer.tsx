import { Card } from "@hey/ui";
import SingleAccountShimmer from "./SingleAccountShimmer";

interface SingleAccountsShimmerProps {
  isBig?: boolean;
  showFollowUnfollowButton?: boolean;
}

const SingleAccountsShimmer = ({
  isBig = false,
  showFollowUnfollowButton = false
}: SingleAccountsShimmerProps) => {
  return (
    <div className="space-y-3">
      <Card className="p-5">
        <SingleAccountShimmer
          isBig={isBig}
          showFollowUnfollowButton={showFollowUnfollowButton}
        />
      </Card>
      <Card className="p-5">
        <SingleAccountShimmer
          isBig={isBig}
          showFollowUnfollowButton={showFollowUnfollowButton}
        />
      </Card>
      <Card className="p-5">
        <SingleAccountShimmer
          isBig={isBig}
          showFollowUnfollowButton={showFollowUnfollowButton}
        />
      </Card>
    </div>
  );
};

export default SingleAccountsShimmer;
