import PostWrapper from "@/components/Shared/PostWrapper";
import type { PostFragment } from "@hey/indexer";
import HiddenPost from "./HiddenPost";
import PostAvatar from "./PostAvatar";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

interface QuotedPostProps {
  isNew?: boolean;
  post: PostFragment;
}

const QuotedPost = ({ isNew = false, post }: QuotedPostProps) => {
  return (
    <PostWrapper
      className="cursor-pointer p-4 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-neutral-100 dark:hover:bg-neutral-900"
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
