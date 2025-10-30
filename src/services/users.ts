import { apiClient } from "@/lib/api-client";

export async function getUsers(){
    return apiClient("/users");
}