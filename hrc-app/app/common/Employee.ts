export type Employee = {
    id: number;
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: Gender;
}


export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export const GenderLabel: { [key in Gender]: string } = {
    [Gender.MALE]: "Male",
    [Gender.FEMALE]: "Female",
    [Gender.OTHER]: "Other"
}