import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getEmployeeById, updateEmployee } from "../../prisma/employee";
import invariant from "tiny-invariant";
import { Gender } from "../common/Employee";
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { z } from 'zod';
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";

const schema = z.object({
    firstName: z.string().trim().min(1, { message: "First Name is Required" }),
    lastName: z.string().trim().min(1, { message: "Last Name is Required" }),
    phone: z.string().trim()
        .min(1, { message: "Phone number must have at exactly 10 characters" })
        .max(10, { message: "Phone number must have at exactly 10 characters" })
        .regex(/^[0-9]+$/, "Phone number may only contain digits"),
    email: z.string().email(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
    employeeId: z.string().optional()
})

export const action = async ({ params, request }: ActionFunctionArgs) => {
    invariant(params.id, "/employee/:id/edit Missing id param")
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema });

    if (submission.status !== 'success') {
        console.log("submission failed")
        console.log(submission)
        return json(submission.reply());
    }

    const employee = await updateEmployee(+params.id, { ...submission.value })
    return redirect(`/employees/${employee.id}`)
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.id, "/employee/:id Missing id param")
    try {
        const employee = await getEmployeeById(+params.id)
        return json({ employee })
    } catch (e) {
        console.error("employees.$id_.edit::load()", e)
        throw new Response("Not Found", { status: 404 });
    }
}

export default function EditEmployee() {
    const { employee } = useLoaderData<typeof loader>();
    const lastResult = useActionData<typeof action>();
    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,
        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema });
        },
        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    });

    const navigate = useNavigate();

    return !employee ? (
        <h1>404 Employee Not Found</h1>
    ) : (
        <Form method="post" {...getFormProps(form)}>
            <label>
                <span>First Name </span>
                <input
                    className={!fields.firstName.valid ? 'error' : ''}
                    {...getInputProps(fields.firstName, { type: 'text' })}
                    defaultValue={employee.firstName}
                    placeholder="First Name"
                />
                <div>{fields.firstName.errors}</div>
            </label>
            <label>
                <span>Last Name </span>
                <input
                    className={!fields.lastName.valid ? 'error' : ''}
                    {...getInputProps(fields.lastName, { type: 'text' })}
                    defaultValue={employee.lastName}
                    placeholder="Last Name"
                />
                <div>{fields.lastName.errors}</div>
            </label>
            <label>
                <span>Employee ID </span>
                <input
                    className={!fields.employeeId.valid ? 'error' : ''}
                    {...getInputProps(fields.employeeId, { type: 'text' })}
                    defaultValue={employee.employeeId || ''}
                    placeholder=""
                />
                <div>{fields.employeeId.errors}</div>
            </label>
            <label>
                <span>Phone </span>
                <input
                    className={!fields.phone.valid ? 'error' : ''}
                    {...getInputProps(fields.phone, { type: 'text' })}
                    defaultValue={employee.phone || ''}
                    placeholder="123-456-7890"
                />
                <div>{fields.phone.errors}</div>
            </label>
            <label>
                <span>Email </span>
                <input
                    className={!fields.email.valid ? 'error' : ''}
                    {...getInputProps(fields.email, { type: 'email' })}
                    defaultValue={employee.email || ''}
                    placeholder="john@doe.com"
                />
                <div>{fields.email.errors}</div>
            </label>
            <label>
                <span>Gender </span>
                <select
                    className={!fields.gender.valid ? 'error' : ''}
                    {...getInputProps(fields.gender, { type: 'text' })}
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>
                <div>{fields.gender.errors}</div>
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