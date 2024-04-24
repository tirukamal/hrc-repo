import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getEmployeeById, updateEmployee } from "../../prisma/employee";
import invariant from "tiny-invariant";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";



export const action = async ({ params, request }: ActionFunctionArgs) => {
    invariant(params.id, "/employee/:id Missing id param")
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateEmployee(+params.id, updates)
    return redirect(`/employees/${params.id}`)
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.id, "/employee/:id Missing id param")
    const employee = await getEmployeeById(+params.id);
    if (!employee) {
        throw new Response("Not Found", { status: 404 })
    }
    return json({ employee })
}

export default function EditEmployee() {
    const { employee } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (
        <Form id="employee-form" method="post">
            <p>
                <span>Name</span>
                <input
                    defaultValue={employee.firstName}
                    aria-label="First name"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                />
                <input
                    aria-label="Last name"
                    defaultValue={employee.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                />
            </p>
            <label>
                <span>Employee ID</span>
                <input
                    defaultValue={employee.employeeId || ''}
                    name="employeeId"
                    placeholder=""
                    type="text"
                />
            </label>
            <label>
                <span>Phone</span>
                <input
                    defaultValue={employee.phone || ''}
                    name="phone"
                    placeholder="123-456-7890"
                    type="text"
                />
            </label>
            <label>
                <span>Email</span>
                <input
                    defaultValue={employee.email || ''}
                    name="email"
                    placeholder="john@doe.com"
                    type="text"
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button onClick={() => navigate(-1)} type="button">
                    Cancel
                </button>
            </p>
        </Form>
    );
}