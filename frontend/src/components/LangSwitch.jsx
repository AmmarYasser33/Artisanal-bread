import { Fragment } from "react";
import i18n from "i18next";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IconGlobalLine } from "../Icons";

export default function LangSwitch() {
  const applyLanguage = (language) => {
    i18n.changeLanguage(language);
    if (language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
      localStorage.setItem("i18nextLng", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
      localStorage.setItem("i18nextLng", "en");
    }
  };

  return (
    <Menu as="div" className="relative z-[999] inline-block text-left">
      <div>
        <MenuButton className="flex items-center rounded-full text-white hover:scale-110 hover:text-[var(--color-primary-500)] focus:outline-none">
          <span className="sr-only">Open options</span>
          <IconGlobalLine className="h-6 w-6" aria-hidden="true" />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-[var(--color-primary-100)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              <button
                className="block w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-primary-300)] rtl:text-right"
                onClick={() => applyLanguage("en")}
              >
                English
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="block w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-primary-300)] rtl:text-right"
                onClick={() => applyLanguage("ar")}
              >
                العربية
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
