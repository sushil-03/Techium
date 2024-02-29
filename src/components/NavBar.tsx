import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "./common/Button";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDebounce } from "@/hooks/query/useDebounce";
import { SearchInput } from "./common/SearchComponent";
import { useFilterStore } from "@/hooks/state/filter";
import { FilterStoreType } from "@/hooks/state/filter";
import { useUserStore } from "@/hooks/state/userState";
import { useTheme } from "next-themes";
import DarkMode from "./common/DarkMode";
export default function NavBar({
  isStarting = false,
}: {
  isStarting?: boolean;
}) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setPage = useFilterStore((state: FilterStoreType) => state.setPage);
  // Navbar should be visible in all pages
  const [searchText, setSearch] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const debouncedValue = useDebounce(searchText, 500);

  const setSearchText = useFilterStore(
    (state: FilterStoreType) => state.setSearchText
  );
  useEffect(() => {
    setSearchText(debouncedValue);
    setPage(1);
  }, [debouncedValue, setPage, setSearchText]);

  const menuLinks = [
    {
      name: "Case Studies",
      link: "/featured",
    },
  ];
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "unset";
  }, [showMenu]);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed dark:bg-black bg-white transition-all ease-in-out duration-300  z-50 w-full ${
        visible ? "top-0" : "-top-36"
      }`}
    >
      <div
        className={`container flex items-center ${
          isStarting ? "justify-start" : "justify-between"
        }  h-20 sm:gap-20 gap-10 sm:px-6 px-2 max-w-screen-2xl md:px-10 lg:px-16`}
      >
        {/* Hamburger */}
        <div className="flex items-center gap-4 ">
          <RxHamburgerMenu
            className="px-2 py-1 rounded-md md:hidden bg-secondary text-primary"
            size={40}
            onClick={() => setShowMenu(true)}
          />
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {showMenu && (
          <div className="absolute inset-0 z-50 w-screen h-screen text-white bg-primary">
            <div className="flex items-center justify-between m-10">
              <p className="text-xl font-gt-walsheim-regular">Menu</p>
              <div onClick={() => setShowMenu(false)}>
                <RxCross2 size={30} />
              </div>
            </div>{" "}
            <div className="mt-32">
              <div className="flex flex-col px-8 gap-7">
                {menuLinks.map((menu, index) => {
                  if (menu.name === "Account" && user.email === "") return;
                  return (
                    <Link
                      href={menu.link}
                      key={index}
                      className="pb-1 text-3xl border-b border-white font-gt-super-ds-trial-light"
                    >
                      {menu.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {router.pathname === "/featured" && (
          <div className="bg-neutral-950 w-full max-w-xs lg:max-w-lg hidden md:flex rounded-[10px] ">
            <SearchInput
              icon={<FiSearch className="w-6 h-6 text-[#AEB9BC]" size={15} />}
              iconPosition="left"
              type="text"
              placeholderText="Search anything"
              className="w-full h-12 bg-transparent  border border-slate-700 placeholder:text-[#AEB9BC] text-white "
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        {/* Case Studies */}
        <div
          className={`flex items-center justify-center gap-8 relative dark:text-textColor-dark text-textColor-light`}
        >
          <Link
            href="/featured"
            className="hidden sm:block border-b-2 border-b-transparent hover:border-b-primary "
          >
            <span className=" font-gt-walsheim-regular text-lg">Explore</span>
          </Link>
          <DarkMode />
          {/* <button
       Togglect name="" id=""></select> */}
        </div>
      </div>
    </div>
  );
}
