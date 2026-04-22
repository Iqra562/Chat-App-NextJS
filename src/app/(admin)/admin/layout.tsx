import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav>Admin Navbar</nav>
      <section>{children}</section>
    </div>
  );
}