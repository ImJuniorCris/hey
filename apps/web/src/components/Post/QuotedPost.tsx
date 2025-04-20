import PostWrapper from "@/components/Shared/Post/PostWrapper";
import { getBlockedByMeMessage } from "@/helpers/getBlockedMessage";
import type { PostFragment } from "@hey/indexer";
import PostWarning from "../Shared/Post/PostWarning";
import HiddenPost from "./HiddenPost";
import PostAvatar from "./PostAvatar";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

interface QuotedPostProps {
  isNew?: boolean;
  post: PostFragment;
}

const QuotedPost = ({ isNew = false, post }: QuotedPostProps) => {
  const isBlockededByMe = post.author.operations?.isBlockedByMe;

  if (isBlockededByMe) {
    return <PostWarning message={getBlockedByMeMessage(post.author)} />;
  }

  return (
    <PostWrapper
      className="cursor-pointer p-4 first:rounded-t-xl last:rounded-b-xl"
      post={post}
    >
      <div className="flex items-center gap-x-2">
        <PostAvatar post={post} quoted />
        <PostHeader isNew={isNew} post={post} quoted />
      </div>
      {post.isDeleted ? (
        <HiddenPost type={post.__typename} />
      ) : (
        <PostBody post={post} quoted showMore />
      )}
    </PostWrapper>
  );
};

export default QuotedPost;
