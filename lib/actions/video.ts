"use server"
import { withErrorHandling } from "../utils"
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

//Helper functions
const getSessionUserId = async (): Promise<string> => {
    const session = await auth.api.getSession({headers: await headers() });
    if(!session) throw new Error('Unauthenticated');
    return session.user.id;
}

//server actions

export const getVideoUploadUrl = withErrorHandling( async() => {

});