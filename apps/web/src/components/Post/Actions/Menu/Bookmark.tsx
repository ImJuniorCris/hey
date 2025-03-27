import cn from "@/helpers/cn";
import errorToast from "@/helpers/errorToast";
import type { ApolloCache } from "@apollo/client";
import { MenuItem } from "@headlessui/react";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import {
  type LoggedInPostOperationsFragment,
  type PostFragment,
  useBookmarkPostMutation,
  useUndoBookmarkPostMutation
} from "@hey/indexer";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router";

interface BookmarkProps {
  post: PostFragment;
}

const Bookmark = ({ post }: BookmarkProps) => {
  const { pathname } = useLocation();
  const hasBookmarked = post.operations?.hasBookmarked;

  const updateCache = (cache: ApolloCache<any>, hasBookmarked: boolean) => {
    cache.modify({
      fields: { hasBookmarked: () => hasBookmarked },
      id: cache.identify(post.operations as LoggedInPostOperationsFragment)
    });

    cache.modify({
      fields: {
        stats: (existingData) => ({
          ...existingData,
          bookmarks: hasBookmarked
            ? existingData.bookmarks + 1
            : existingData.bookmarks - 1
        })
      },
      id: cache.identify(post)
    });

    // Remove bookmarked post from bookmarks feed
    if (pathname === "/bookmarks") {
      cache.evict({ id: cache.identify(post) });
    }
  };

  const onError = (error: any) => {
    errorToast(error);
  };

  const [bookmarkPost] = useBookmarkPostMutation({
    onCompleted: () => {
      toast.success("Publication bookmarked!");
    },
    onError,
    update: (cache) => updateCache(cache, true),
    variables: { request: { post: post.id } }
  });

  const [undoBookmarkPost] = useUndoBookmarkPostMutation({
    onCompleted: () => {
      toast.success("Removed publication bookmark!");
    },
    onError,
    update: (cache) => updateCache(cache, false),
    variables: { request: { post: post.id } }
  });

  const handleTogglePublicationProfileBookmark = async () => {
    if (hasBookmarked) {
      return await undoBookmarkPost();
    }

    return await bookmarkPost();
  };

  return (
    <MenuItem
      as="div"
      className={({ focus }) =>
        cn(
          { "dropdown-active": focus },
          "m-2 block cursor-pointer rounded-lg px-2 py-1.5 text-sm"
        )
      }
      onClick={(event) => {
        stopEventPropagation(event);
        handleTogglePublicationProfileBookmark();
      }}
    >
      <div className="flex items-center space-x-2">
        {hasBookmarked ? (
          <>
            <BookmarkIconSolid className="size-4" />
            <div>Remove Bookmark</div>
          </>
        ) : (
          <>
            <BookmarkIconOutline className="size-4" />
            <div>Bookmark</div>
          </>
        )}
      </div>
    </MenuItem>
  );
};

export default Bookmark;
