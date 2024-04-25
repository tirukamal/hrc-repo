import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { createEmployee } from "../../prisma/employee";
import { Gender } from "../common/Employee";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { z } from 'zod';
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";

//TODO: additional validation
const schema = z.object({
    firstName: z.string().trim().min(1, { message: "First Name is Required" }),
    lastName: z.string().trim().min(1, { message: "Last Name is Required" }),
    phone: z.string().trim()
        .min(1, { message: "Phone number must have at exactly 10 characters" })
        .max(10, { message: "Phone number must have at exactly 10 characters" })
        .regex(/^[0-9]+$/, "Phone number may only contain digits"),
    email: z.string().email(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER])
})



export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema });

    if (submission.status !== 'success') {
        console.log("submission failed")
        console.log(submission)
        return json(submission.reply());
    }

    const employee = await createEmployee({ ...submission.value })

    return redirect(`/employees/${employee.id}`)
};

export default function NewPost() {
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

    return (
        <Form method="post" {...getFormProps(form)}>
            <label>
                <span>First Name </span>
                <input
                    className={!fields.firstName.valid ? 'error' : ''}
                    placeholder="First Name"
                    {...getInputProps(fields.firstName, { type: 'text' })}
                />
                <div>{fields.firstName.errors}</div>
            </label>
            <label>
                <span>Last Name </span>
                <input
                    className={!fields.lastName.valid ? 'error' : ''}
                    placeholder="Last Name"
                    {...getInputProps(fields.lastName, { type: 'text' })}
                />
                <div>{fields.lastName.errors}</div>
            </label>
            <label>
                <span>Phone </span>
                <input
                    className={!fields.phone.valid ? 'error' : ''}
                    placeholder="xxx-xxx-xxxx"
                    {...getInputProps(fields.phone, { type: 'text' })}
                />
                <div>{fields.phone.errors}</div>
            </label>
            <label>
                <span>Email </span>
                <input
                    className={!fields.email.valid ? 'error' : ''}
                    placeholder="@"
                    {...getInputProps(fields.email, { type: 'email' })}
                />
                <div>{fields.email.errors}</div>
            </label>
            <label>
                <span>Gender </span>
                <select {...getInputProps(fields.gender, { type: 'text' })}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>

                </select>
            </label>
            <p>
                <button type="submit">Save</button>
                <button onClick={() => navigate(`/employees`)} type="button">
                    Cancel
                </button>
            </p>
        </Form>
    );
}