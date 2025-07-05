import type { ReactNode } from "react";

// Props
interface Props {
  children: ReactNode;
}

// Layout
export default function Layout({ children }: Props): ReactNode {
  return <> {children} </>;
}
