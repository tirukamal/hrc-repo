import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEmployeeById } from "../../prisma/employee";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.id, "/employee/:id Missing id param");
    const employee = await getEmployeeById(+params.id)
    if (!employee) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ employee })
};


export default function EmployeeProfileData() {
    const { employee } = useLoaderData<typeof loader>();
    return !employee ? (
        <h1>404 Employee Not Found</h1>
    ) : (
        <div id="employee">
            <div>
                <h1>Employee Profile</h1>
            </div>
            <div>
                <h2>
                    {employee.firstName} {employee.lastName}
                </h2>
            </div>
            <div>
                <p>id: {employee.id}</p>
                <p>ph: {employee.phone}</p>
                <p>email: {employee.email}</p>
            </div>
        </div>
    )
}