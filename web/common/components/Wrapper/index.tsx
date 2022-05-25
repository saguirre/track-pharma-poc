import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useRouter } from "next/router";

interface WrapperProps {
  account: string;
  balance: string;
  showBackButton?: boolean;
  title: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ account, title, balance, showBackButton, children }) => {
  const router = useRouter();

  const userNavigation = [
    {
      id: 1,
      name: "View Account on Etherscan",
      target: "__blank",
      href: `https://goerli.etherscan.io/address/${account}`,
    },
    { id: 2, name: "Sign out", target: "", href: "#" },
  ];

  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMVJREFUWEdjTDg/5T8DEihXiETmYrBLnQ7hle/eZ4dXvvPBchR5xlEHDHgIXH//FiUNoMcRoTSBN8IZGBgImcc46oBBHwLocUwoTaDHOSH9BNMAIQPQ5UcdQHIIoBdEhPI1pWkA3XyMumDUAYM+BAg5kFR5ktMAqRYQUj/qAIwQeJMkjRJqIvOeEgpFvPKEzBt1wMCHAHqDBD1C0fsBhNIEepwT6idgtAdGHUD3EEBvDxCKQ1L7hoTSEMFcgJ6IRh1A7RAAAK1BC7DtfO3fAAAAAElFTkSuQmCC",
  };

  const goToMintScreen = (account: string) => {
    router.push({
      pathname: `/mint/${account}`,
    });
  };

  const goToLogin = () => {
    router.push({
      pathname: `/`,
    });
  };

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };

  const disconnect = () => {
    goToLogin();
  };

  return (
    <div className="min-h-full">
      <div className="bg-violet-600 pb-32">
        <Disclosure as="nav" className="bg-violet-600 border-b border-violet-300 border-opacity-25 lg:border-none">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-violet-400 lg:border-opacity-25">
                  <div className="px-2 flex items-center lg:px-0">
                    <div className="flex-shrink-0"></div>
                    <div className="hidden lg:block lg:ml-10"></div>
                  </div>
                  <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-gray-400 focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white focus:border-white sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-violet-600 p-2 rounded-md inline-flex items-center justify-center text-violet-200 hover:text-white hover:bg-violet-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="bg-violet-600 flex-shrink-0 rounded-full p-1 text-violet-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative flex-shrink-0">
                        <div>
                          <Menu.Button className="bg-violet-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="rounded-full h-8 w-8" src={user.imageUrl} alt="" />
                          </Menu.Button>
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    target={item.target}
                                    onClick={() => item.id === 2 && disconnect()}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "flex flex-row py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                    {item.id === 1 && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 mt-1 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                      </svg>
                                    )}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1"></div>
                <div className="pt-4 pb-3 border-t border-violet-700">
                  <div className="px-5 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="rounded-full h-10 w-10" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.name}</div>
                      <div className="text-sm font-medium text-violet-300">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-violet-600 flex-shrink-0 rounded-full p-1 text-violet-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-violet-500 hover:bg-opacity-75"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="flex flex-row justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-start">
              {showBackButton && (
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex flex-row items-center gap-1 rounded-xl w-fill py-2 px-4 hover:bg-violet-400 bg-violet-500 text-white text-medium font-regular h-fill mr-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </button>
              )}
              <h1 className="text-3xl font-bold text-white">{title}</h1>
            </div>
            <button
              type="button"
              onClick={() => goToMintScreen(account)}
              className="flex flex-row items-center gap-1 rounded-xl w-fill py-2 px-4 hover:bg-violet-400 bg-violet-500 text-white text-medium font-regular h-fill"
            >
              Mint new Drug
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </header>
      </div>
      {children}
    </div>
  );
};
