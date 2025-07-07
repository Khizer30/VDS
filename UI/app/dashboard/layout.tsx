"use client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState, type ReactNode } from "react";
import { redirect, RedirectType } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faTachometerAlt,
  faRightFromBracket,
  faTable,
  faTrash,
  faBars
} from "@fortawesome/free-solid-svg-icons";
//
import Loading from "@components/Loading";
import Loader from "@components/Loader";
import { useAuth } from "@components/AuthContext";
import type { ResponseInterface, LinkInterface } from "@models/types";
import icon from "@images/icon.webp";

// Props
interface Props {
  children: ReactNode;
}

// Links
const links: LinkInterface[] = [
  {
    name: "Dashboard",
    icon: faTachometerAlt,
    url: "/dashboard"
  },
  {
    name: "View Detections",
    icon: faTable,
    url: "/dashboard/view"
  },
  {
    name: "Register Vehicle",
    icon: faCar,
    url: "/dashboard/register"
  },
  {
    name: "Remove Vehicle",
    icon: faTrash,
    url: "/dashboard/remove"
  }
];

// Layout
export default function Layout({ children }: Props): ReactNode {
  // Constructors
  const { user, loading, logout } = useAuth();

  // States
  const [loader, setLoader] = useState<boolean>(false);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Loading Screen
  if (loading) {
    return <Loading wScreen={true} hScreen={true} />;
  }

  // Redirect
  if (!user) {
    redirect("/login", RedirectType.replace);
  }

  // Link Mapper
  function linkMapper(x: LinkInterface): ReactNode {
    return (
      <Link
        href={x.url}
        className="font-primary my-1 w-11/12 cursor-pointer rounded-lg px-4 py-3 text-left text-sm text-white transition-all hover:bg-gray-700 active:bg-white active:text-gray-900"
        key={x.name}
      >
        <FontAwesomeIcon icon={x.icon} className="mr-4" />
        {x.name}
      </Link>
    );
  }

  // Toggle Sidebar
  function toggleSidebar(): void {
    setSidebarOpen(!isSidebarOpen);
  }

  // Logout User
  async function logoutUser(): Promise<void> {
    setLoader(true);

    let res: ResponseInterface = await logout();

    if (res.success) {
      toast.success(res.message);
      redirect("/login", RedirectType.replace);
    }

    setLoader(false);
  }

  return (
    <>
      {loader && <Loader />}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 z-10 flex h-full flex-col justify-between px-4 pt-[17.5%] pb-2 transition-all duration-300 ease-in-out md:pt-2 ${isSidebarOpen ? "w-full translate-x-0 md:w-4/12 md:pt-2 lg:w-[25%] xl:w-[20%]" : "-translate-x-full"}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-gray-900 p-6">
          <div className="flex h-full w-full flex-col items-center justify-start">
            <Image src={icon} alt="VDH Logo" priority draggable={false} className="w-20" />
            <hr className="my-4 w-11/12 rounded-lg text-white" />
            {links.map(linkMapper)}
          </div>
          <div className="flex h-full w-full flex-col items-center justify-end">
            <hr className="my-4 w-11/12 rounded-lg text-white" />
            <button
              onClick={logoutUser}
              className="font-primary my-1 w-11/12 cursor-pointer rounded-lg px-4 py-3 text-left text-sm text-white transition-all hover:bg-gray-700 active:bg-white active:text-gray-900"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div
        className={`ml-auto h-screen px-4 py-2 transition-all duration-300 ease-in-out ${isSidebarOpen ? "md:w-2/3 lg:w-[75%] xl:w-[80%]" : "w-full"}`}
      >
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex h-[6%] items-center justify-center rounded-lg bg-gray-900 px-4 py-2 md:h-[5%]">
          <div className="flex h-full w-full items-center justify-between">
            <h1 className="font-primary px-3 text-sm text-white"> Salam, {user.name} </h1>
            <button
              onClick={toggleSidebar}
              className="cursor-pointer rounded-full px-3 py-2 text-white transition-all hover:bg-gray-700 active:bg-white active:text-gray-900"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex h-[94%] flex-col items-center justify-center px-4 py-2 md:h-[95%]"> {children} </div>
      </div>
    </>
  );
}
