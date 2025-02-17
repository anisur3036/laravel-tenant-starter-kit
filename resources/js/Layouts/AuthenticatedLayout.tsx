import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  User2,
  Database,
  Moon,
  Sun,
  Monitor,
  Search,
  Home,
  ChevronsRight,
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  CircleIcon,
  Users2,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubMenu from "@/components/SubMenu";
import { Input } from "@/components/ui/input";
import ApplicationLogo from "@/components/ApplicationLogo";

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system",
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  const closeSidebarMenu = () => {
    setIsSidebarActive(false);
  };

  const subMenusList = [
    {
      title: "Tenants",
      icon: <ChevronsRight />,
      menus: [
        {
          id: 1,
          name: "Tenants",
          url: "/tenants",
          // menuRoute: "users.index",
          icon: <Users2 size={14} className="text-foreground" />,
        },
      ],
    },
    {
      title: "Roles / Permissions",
      icon: <ChevronsRight />,
      menus: [
        {
          id: 1,
          name: "Permissions",
          url: "/permissions",
          // menuRoute: "users.index",
          icon: <Users2 size={14} className="text-foreground" />,
        },
        {
          id: 2,
          name: "Roles",
          url: "/roles",
          // menuRoute: "users.index",
          icon: <Users2 size={14} className="text-foreground" />,
        },
      ],
    },
  ];

  const user = usePage().props.auth.user;

  return (
    <>
      <div
        id="sidebar"
        className={isSidebarActive ? "sidebar active" : "sidebar"}
      >
        <div
          id="brand"
          className="fixed sm:left-0 h-14 top-0 w-64 py-4 pr-0 pl-4 text-foreground border-b border-slate-900/10 dark:border-slate-300/10"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center font-bold">
              <ApplicationLogo className="block h-8 w-auto text-foreground" />
              <h2 className="pl-2 text-2xl text-foreground">SKCL</h2>
            </Link>
            <button
              onClick={closeSidebarMenu}
              className="close-btn sm:hidden cursor-pointer mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav
          id="sidebar-menu"
          className="mt-14 py-2 mb-8 overflow-y-scroll h-screen pb-14"
        >
          <section className="px-4">
            <small className="pl-3 text-foreground inline-block mb-2">
              Menu
            </small>
          </section>
          <section className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text[0.9rem] py-5 flex flex-col gap-1 font-medium">
              <li>
                <Link href="/dashboard" className={"link text-foreground"}>
                  <Home className="size-6 text-foregorund min-w-max" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/" className={"link text-foreground"}>
                  <User2 className="size-6 text-foreground min-w-max" />
                  Authentication
                </Link>
              </li>

              <div className="">
                <small className="pl-3 text-foreground inline-block mb-2">
                  Admin
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.title} className="flex flex-col gap-1">
                    <SubMenu menuItem={menu} />
                  </div>
                ))}
              </div>
              <li>
                <Link href="/" className={"link text-foreground"}>
                  <Database className="size-6 text-foreground min-w-max" />
                  Storage
                </Link>
              </li>
            </ul>
          </section>
        </nav>
      </div>
      <div
        id="main-container"
        className={isSidebarActive ? "main-container active" : "main-container"}
      >
        <header
          className="flex items-center justify-between fixed left-0 h-14
            border-b border-border/40
            text-foreground sm:left-64 bg-sidebar-accent w-full
            sm:w-[calc(100%-256px)] top-0 z-50 p-2 shadow"
        >
          <div className="flex items-center">
            <button
              onClick={() =>
                setIsSidebarActive((previousState) => !previousState)
              }
              className="menu-btn flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <span className="pl-2.5">Welcome</span>
          </div>
          <div className="relative flex items-center sm:w-[400px]">
            <Search className="size-4 absolute left-[8px] text-gray-400 dark:text-slate-500" />
            <Input
              className="pl-8 w-full py-1 rounded-full border-slate-300 dark:border-sky-400/60 dark:text-foreground"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </div>
          <div className="ml-3 relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="flex items-center gap-2">
                  <span className="cursor-pointer">{user.name}</span>
                  <ChevronDown size={16} />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="px-4 py-4 flex items-center duration-100 gap-4">
                    <button onClick={() => setTheme("light")}>
                      <Sun
                        className={`size-4 ${theme === "light" ? "text-red-500" : "text-slate-400"}`}
                      />
                    </button>
                    <button onClick={() => setTheme("dark")}>
                      <Moon
                        className={`size-4 ${theme === "dark" ? "text-red-500" : "text-slate-400"}`}
                      />
                    </button>
                    <button onClick={() => setTheme("system")}>
                      <Monitor
                        className={`size-4 ${theme === "system" ? "text-red-500" : "text-slate-400"}`}
                      />
                    </button>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link className="flex items-center gap-1" href="/">
                      <User size={18} />
                      <span className="flex-1">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard />
                    <span>Keyboard shortcuts</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus />
                    <span>New Team</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cloud />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <Link href={route("logout")} method="post" as="button">
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {header && (
          <header className="pt-12 shadow bg-sidebar-accent">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}
        <main className="pb-4 px-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </>
  );
}
