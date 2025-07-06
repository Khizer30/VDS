"use client";
import Image from "next/image";
import Link from "next/link";
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
import type { ReactNode } from "react";
//
import Loading from "@components/Loading";
import { useAuth } from "@components/AuthContext";
import type { LinkInterface } from "@models/types";
import icon from "@images/icon.webp";

// Props
interface Props {
  children: ReactNode;
}

// Layout
export default function Layout({ children }: Props): ReactNode {
  const { user, loading } = useAuth();

  // Loading Screen
  if (loading) {
    return <Loading wScreen={true} hScreen={true} />;
  }

  // Redirect
  if (!user) {
    redirect("/login", RedirectType.replace);
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

  return (
    <>
      <aside className="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between px-4 py-2 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%]">
        <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-gray-900 p-6">
          <div className="flex h-full w-full flex-col items-center justify-start">
            <Image src={icon} alt="VDH Logo" priority draggable={false} className="w-20" />
            <hr className="my-4 w-11/12 rounded-lg text-white" />
            {links.map(linkMapper)}
          </div>
          <div className="flex h-full w-full flex-col items-center justify-end">
            <hr className="my-4 w-11/12 rounded-lg text-white" />
            <button className="font-primary my-1 w-11/12 cursor-pointer rounded-lg px-4 py-3 text-left text-sm text-white transition-all hover:bg-gray-700 active:bg-white active:text-gray-900">
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
      <div className="ml-auto px-4 py-2 lg:w-[75%] xl:w-[80%]">
        <div className="sticky top-0 z-10 h-2/12 rounded-lg bg-gray-900 py-2">
          <div className="flex items-center justify-between space-x-4 px-4">
            <button className="cursor-pointer rounded-full px-3 py-2 text-white transition-all hover:bg-gray-700 active:bg-white active:text-gray-900">
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="font-primary px-3 text-sm text-white"> {user.name} </h1>
          </div>
        </div>
        <div> {children} </div>
      </div>
    </>
  );
}
