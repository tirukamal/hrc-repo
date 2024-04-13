import { Form, Links, LiveReload, Meta, NavLink, Outlet, Scripts, ScrollRestoration, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getEmployees } from "../../prisma/employee";
import appStylesHref from "../app.css";
import { useEffect } from "react";

export const action = async () => {
    return redirect(`/employees.new`);
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const queryString = url.searchParams.get("queryString");
    const employeeList = await getEmployees(queryString);
    return json({ employeeList, queryString });
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: appStylesHref },
];

export default function EmployeesList() {
    const { employeeList, queryString } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("queryString");

    useEffect(() => {
        const searchField = document.getElementById("queryString");
        if (searchField instanceof HTMLInputElement) {
            searchField.value = queryString || "";
        }
    }, [queryString]);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <div id="sidebar">
                    <h1>Employees</h1>
                    <div>
                        <Form
                            id="search-form"
                            onChange={(event) => {
                                const isFirstSearch = queryString === null;
                                submit(event.currentTarget, { replace: !isFirstSearch });
                            }}
                            role="search"
                        >
                            <input
                                aria-label="Search contacts"
                                className={searching ? "loading" : ""}
                                defaultValue={queryString || ""}
                                id="queryString"
                                name="queryString"
                                placeholder="Search"
                                type="search"
                            />
                            <div aria-hidden hidden={!searching} id="search-spinner" />
                        </Form>
                        <Form method="post">
                            <button type="submit">New</button>
                        </Form>
                    </div>
                    <nav>
                        {employeeList.length ? (
                            <ul>
                                {employeeList.map((employee) => (
                                    <li key={employee.id}>
                                        <NavLink
                                            className={({ isActive, isPending }) =>
                                                isActive ? "active" : isPending ? "pending" : ""
                                            }
                                            to={`/employees/${employee.id}`}
                                        >
                                            {employee.firstName} {employee.lastName}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No Employees</i>
                            </p>
                        )}
                    </nav>
                </div>
                <div
                    className={
                        navigation.state === "loading" && !searching ? "loading" : ""
                    }
                    id="detail"
                >
                    <Outlet />
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}