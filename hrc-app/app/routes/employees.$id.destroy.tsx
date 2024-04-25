import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteEmployee } from "../../prisma/employee";
import invariant from "tiny-invariant";

export const action = async ({ params }: ActionFunctionArgs) => {
    invariant(params.id, "/employee/:id/destroy Missing id param")
    await deleteEmployee(+params.id);
    return redirect("/employees")
}