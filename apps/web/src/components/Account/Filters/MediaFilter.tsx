import MenuTransition from "@/components/Shared/MenuTransition";
import { Checkbox, Tooltip } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import { useAccountFeedStore } from "@/store/non-persisted/useAccountFeedStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import type { ChangeEvent } from "react";

const MediaFilter = () => {
  const { mediaFeedFilters, setMediaFeedFilters } = useAccountFeedStore();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMediaFeedFilters({
      ...mediaFeedFilters,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="rounded-md hover:bg-neutral-300/20">
        <Tooltip content="Filter" placement="top">
          <AdjustmentsVerticalIcon className="size-5" />
        </Tooltip>
      </MenuButton>
      <MenuTransition>
        <MenuItems
          className="absolute right-0 z-[5] mt-1 rounded-xl border border-neutral-200 bg-white py-1 shadow-xs focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-900"
          static
        >
          <MenuItem
            as="label"
            className={({ focus }) =>
              cn(
                { "dropdown-active": focus },
                "menu-item flex cursor-pointer items-center gap-1 space-x-1 rounded-lg"
              )
            }
          >
            <Checkbox
              checked={mediaFeedFilters.images}
              label="Images"
              name="images"
              onChange={handleChange}
            />
          </MenuItem>
          <MenuItem
            as="label"
            className={({ focus }) =>
              cn(
                { "dropdown-active": focus },
                "menu-item flex cursor-pointer items-center gap-1 space-x-1 rounded-lg"
              )
            }
          >
            <Checkbox
              checked={mediaFeedFilters.video}
              label="Video"
              name="video"
              onChange={handleChange}
            />
          </MenuItem>
          <MenuItem
            as="label"
            className={({ focus }) =>
              cn(
                { "dropdown-active": focus },
                "menu-item flex cursor-pointer items-center gap-1 space-x-1 rounded-lg"
              )
            }
          >
            <Checkbox
              checked={mediaFeedFilters.audio}
              label="Audio"
              name="audio"
              onChange={handleChange}
            />
          </MenuItem>
        </MenuItems>
      </MenuTransition>
    </Menu>
  );
};

export default MediaFilter;
