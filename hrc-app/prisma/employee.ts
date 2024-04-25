import { Employee, Gender, Prisma, PrismaClient } from '@prisma/client'
import { matchSorter } from 'match-sorter';


const db = new PrismaClient()

type EmployeeMutation = {
    id?: number;
    employeeId?: string | null;
    firstName?: string;
    lastName?: string;
    gender?: Gender | null;
    email?: string;
    phone?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export const EmptyEmployee = (): EmployeeMutation => {
    return {
        firstName: "",
        lastName: "",
        employeeId: "",
        email: "",
        phone: ""
    }
}

export const getEmployees = async (query?: string | null): Promise<Employee[]> => {
    try {
        let employeesList = await db.employee.findMany();
        if (query) {
            console.log(query)
            employeesList = matchSorter(employeesList, query, {
                keys: ["firstName", "lastName"],
            });
        }
        return employeesList.sort((employee1, employee2) => employee1.lastName.localeCompare(employee2.lastName));
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    try {
        const ret = await db.employee.findUnique({
            where: {
                id: id,
            },
        });
        console.log(ret)
        return ret

    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createEmployee = async (employee: Prisma.EmployeeCreateInput): Promise<Employee> => {
    try {
        return await db.employee.create({ data: employee })
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateEmployee = async (id: number, employee: EmployeeMutation): Promise<Employee> => {
    try {
        return await db.employee.update({
            where: {
                id,
            },
            data: employee,
        });
    } catch (error) {
        console.error(error)
        throw error
    }
};

export const deleteEmployee = async (id: number): Promise<null> => {
    try {
        await db.employee.delete({
            where: {
                id,
            },
        });
        return null;
    } catch (error) {
        console.error(error)
        throw error
    }
};

