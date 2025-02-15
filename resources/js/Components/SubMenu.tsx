import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { iMenu } from "@/types";
import { ChevronRight } from "lucide-react";

interface iMenuDataProps {
  menuItem: iMenu;
}

const SubMenu = ({ menuItem }: iMenuDataProps) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const { url, component } = usePage();

  useEffect(() => {
    menuItem.menus?.map((menu) => {
      if (url.startsWith(menu.url)) {
        setSubMenuOpen(true);
      }
    });
  }, []);
  return (
    <>
      <li
        className={`link ${route().current() && "text-foreground"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {menuItem.icon}
        <p className="flex-1 capitalize">{menuItem.title}</p>
        <ChevronRight
          size={20}
          className={` ${subMenuOpen && "rotate-90"} duration-200 `}
        />
      </li>
      <ul
        className={`overflow-hidden transition-all duration-300  flex flex-col pl-6 text-[0.8rem] font-normal ${subMenuOpen ? "max-h-96" : "max-h-0"}`}
      >
        {menuItem.menus?.map((menu) => (
          <li
            key={menu.id}
            className={`flex pl-2 py-1 rounded gap-1 items-center ${url.startsWith(menu.url) ? "bg-background" : ""}`}
          >
            {menu.icon}
            <Link
              href={menu.url}
              className={`p-0.5 pl-2 text-base flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium capitalize`}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubMenu;
