import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav>User Navbar</nav>
      <section>{children}</section>
    </div>
  );
}