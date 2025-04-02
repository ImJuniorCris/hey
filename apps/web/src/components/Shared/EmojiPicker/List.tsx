import { ErrorMessage, Input } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import useEmojis from "@/hooks/prosekit/useEmojis";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Errors } from "@hey/data/errors";
import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import type { Emoji } from "@hey/types/misc";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";

interface ListProps {
  setEmoji: (emoji: string) => void;
}

const List = ({ setEmoji }: ListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const { emojis, error, isLoading } = useEmojis({
    query: searchText,
    minQueryLength: 2,
    limit: 100 // Show more emojis in the picker
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    stopEventPropagation(e);
    setSearchText("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (error) {
    return (
      <ErrorMessage
        className="m-5"
        error={{
          message: "Error while loading emojis",
          name: Errors.SomethingWentWrong
        }}
        title={Errors.SomethingWentWrong}
      />
    );
  }

  if (isLoading) {
    return <Loader className="my-5" message="Loading emojis" />;
  }

  return (
    <div>
      <div className="w-full p-2 pt-4 pb-0">
        <Input
          autoFocus
          className="px-3 py-2 text-sm"
          iconLeft={<MagnifyingGlassIcon />}
          iconRight={
            <XMarkIcon
              className={cn(
                "cursor-pointer",
                searchText ? "visible" : "invisible"
              )}
              onClick={handleClearSearch}
            />
          }
          onChange={handleChange}
          onClick={(e) => {
            e.preventDefault();
            stopEventPropagation(e);
          }}
          placeholder="Search..."
          ref={inputRef}
          type="text"
          value={searchText}
        />
      </div>
      <div className="grid max-h-[10rem] grid-cols-8 overflow-y-auto p-2 pt-2">
        {emojis.map((emoji: Emoji) => (
          <button
            className="rounded-lg py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            key={emoji.emoji}
            onClick={() => setEmoji(emoji.emoji)}
            type="button"
          >
            {emoji.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
