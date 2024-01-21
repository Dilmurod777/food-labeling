'use server';

import {signIn, signOut} from '@/auth';
import {AuthError} from 'next-auth';
import type {User} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {z} from "zod";
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
import {random} from "nanoid";

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function insertUser({email, name, password}: User): Promise<User | undefined> {
    try {
        const user = await sql<User>`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to insert user:', error);
        throw new Error('Failed to insert user.');
    }
}

export async function login(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signup(prevState: string | undefined, formData: FormData) {
    try {
        const data: { [key: string]: string } = {};
        for (const entry of formData.entries()) {
            data[entry[0]] = entry[1].toString();
        }

        const parsedCredentials = z
            .object({
                email: z
                    .string({invalid_type_error: "Invalid format.", required_error: "Email is required."})
                    .email({message: "Invalid email format!"}),
                name: z
                    .string({invalid_type_error: "Invalid format.", required_error: "Name is required."})
                    .min(6, {message: "Name must be at least 6 symbols."}),
                password: z
                    .string({invalid_type_error: "Invalid format.", required_error: "Password is required."})
                    .min(6, {message: "Password must be at least 6 symbols."})
            })
            .safeParse(data);


        if (parsedCredentials.success) {
            const {email, password, name} = parsedCredentials.data;

            const user = await getUser(email);
            if (!user) {
                await insertUser({
                    id: randomUUID(),
                    email,
                    name: name,
                    password: await bcrypt.hash(password, 10)
                });

                await signIn("credentials", formData);

                return;
            }

            return 'User with such email already exists.';
        }

        // console.log(formData, parsedCredentials.error.issues)

        return parsedCredentials.error.issues.map(issue => issue.message).join("\n");
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'EmailSignInError':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logout(prevState: string | undefined, formData: FormData) {
    try {
        await signOut();
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
