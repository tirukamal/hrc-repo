import { Employee, PrismaClient } from '@prisma/client'
import { seedEmployees } from './employeesSeedData';





async function seed() {
    const prisma = new PrismaClient;

    const insertEmployees = seedEmployees.map(async (employee: Employee) => {
        return prisma.employee.create({
            data: { ...employee }
        });
    })

    try {
        await Promise.all(insertEmployees)
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        prisma.$disconnect();
    }
}

seed();