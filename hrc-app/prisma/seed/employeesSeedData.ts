/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Employee } from '@prisma/client'


export const seedEmployees: Employee[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@org.com',
        phone: '123-456-7890',
        gender: "MALE"
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@org.com',
        phone: '123-456-7890',
        gender: "FEMALE",
    },
    {
        firstName: 'Funny',
        lastName: 'Valentine',
        email: 'valentine@org.com',
        phone: '123-456-7890',
        gender: "MALE",
    },
    {
        firstName: 'Enrico',
        lastName: 'Pucci',
        email: 'priestrico@org.com',
        phone: '123-456-7890',
        gender: "MALE",
    },
    {
        firstName: 'Curly',
        lastName: 'Dadan',
        email: 'mountaindadan@org.com',
        phone: '123-456-7890',
        gender: "FEMALE",
    }
]