import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "HRC App" },
  ];
};

export default function Index() {
  return (
    <div>
      <p>
        Home is working!
      </p>
      <br />
      <a href="/employees">Employees</a>
      <Outlet />
    </div>
  );
}
