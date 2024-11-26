import { Fragment } from "react";
import {
  Transition,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { IconCheckmarkCircle, IconChevronDown } from "../Icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategorySelector({
  setSelectedCategory,
  selectedCategory,
  categories,
}) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      {({ open }) => (
        <>
          <div className="relative mt-3">
            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <span className="block truncate">
                {selectedCategory ? selectedCategory.name : "Select Category:"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <IconChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {categories?.map((category) => (
                  <ListboxOption
                    key={category._id}
                    className={({ focus }) =>
                      classNames(
                        focus ? "bg-primary-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={category}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {category.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? "text-white" : "text-primary-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <IconCheckmarkCircle
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
