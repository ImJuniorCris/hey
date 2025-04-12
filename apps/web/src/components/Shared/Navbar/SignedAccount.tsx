import { Image } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import hasAccess from "@/helpers/hasAccess";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Features } from "@hey/data/features";
import getAccount from "@hey/helpers/getAccount";
import getAvatar from "@hey/helpers/getAvatar";
import { Link } from "react-router";
import MenuTransition from "../MenuTransition";
import Logout from "./NavItems/Logout";
import Settings from "./NavItems/Settings";
import StaffTools from "./NavItems/StaffTools";
import SwitchAccount from "./NavItems/SwitchAccount";
import ThemeSwitch from "./NavItems/ThemeSwitch";
import YourAccount from "./NavItems/YourAccount";

const SignedAccount = () => {
  const { currentAccount } = useAccountStore();
  const isStaff = hasAccess(Features.Staff);

  const Avatar = () => (
    <Image
      alt={currentAccount?.address}
      className="size-8 cursor-pointer rounded-full border border-gray-200 dark:border-gray-700"
      src={getAvatar(currentAccount)}
    />
  );

  return (
    <Menu as="div">
      <MenuButton>
        <Avatar />
      </MenuButton>
      <MenuTransition>
        <MenuItems
          className="z-[5] mt-2 w-48 origin-top-left rounded-xl border border-gray-200 bg-white shadow-xs focus:outline-hidden dark:border-gray-700 dark:bg-black"
          static
          anchor="bottom start"
        >
          <MenuItem
            as={Link}
            className={({ focus }: { focus: boolean }) =>
              cn({ "dropdown-active": focus }, "menu-item")
            }
            to={getAccount(currentAccount).link}
          >
            <YourAccount />
          </MenuItem>
          <MenuItem
            as={Link}
            className={({ focus }: { focus: boolean }) =>
              cn({ "dropdown-active": focus }, "menu-item")
            }
            to="/settings"
          >
            <Settings />
          </MenuItem>
          {isStaff ? (
            <MenuItem
              as={Link}
              className={({ focus }: { focus: boolean }) =>
                cn({ "dropdown-active": focus }, "menu-item")
              }
              to="/staff"
            >
              <StaffTools />
            </MenuItem>
          ) : null}
          <div className="divider" />
          <MenuItem
            as="div"
            className={({ focus }) =>
              cn({ "dropdown-active": focus }, "m-2 rounded-lg")
            }
          >
            <SwitchAccount />
          </MenuItem>
          <MenuItem
            as="div"
            className={({ focus }) =>
              cn({ "dropdown-active": focus }, "m-2 rounded-lg")
            }
          >
            <ThemeSwitch />
          </MenuItem>
          <div className="divider" />
          <MenuItem
            as="div"
            className={({ focus }) =>
              cn({ "dropdown-active": focus }, "m-2 rounded-lg")
            }
          >
            <Logout />
          </MenuItem>
        </MenuItems>
      </MenuTransition>
    </Menu>
  );
};

export default SignedAccount;
