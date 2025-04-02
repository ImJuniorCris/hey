import { Tooltip } from "@/components/Shared/UI";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import humanize from "@hey/helpers/humanize";
import nFormatter from "@hey/helpers/nFormatter";
import type { PostFragment } from "@hey/indexer";
import { useNavigate } from "react-router";

interface CommentProps {
  post: PostFragment;
  showCount: boolean;
}

const Comment = ({ post, showCount }: CommentProps) => {
  const navigate = useNavigate();
  const count = post.stats.comments;
  const iconClassName = showCount
    ? "w-[17px] sm:w-[20px]"
    : "w-[15px] sm:w-[18px]";

  return (
    <div className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-200">
      <button
        aria-label="Comment"
        className="rounded-full p-1.5 outline-offset-2 hover:bg-neutral-300/20"
        onClick={() => navigate(`/posts/${post.id}`)}
        type="button"
      >
        <Tooltip
          content={count > 0 ? `${humanize(count)} Comments` : "Comment"}
          placement="top"
          withDelay
        >
          <ChatBubbleLeftIcon className={iconClassName} />
        </Tooltip>
      </button>
      {count > 0 && !showCount ? (
        <span className="text-[11px] sm:text-xs">{nFormatter(count)}</span>
      ) : null}
    </div>
  );
};

export default Comment;
