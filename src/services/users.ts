import { apiClient } from "@/lib/api-client";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "@erp/shared-schema";

/* -------------------------------
   USER FRONTEND SERVICE
--------------------------------*/

export async function createUser(data: CreateUserDTO) {
  return apiClient("/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function getUsers() {
  return apiClient("/user", {
    method: "GET",
  });
}

export async function getUserById(id: string) {
  return apiClient(`/user/${id}`, {
    method: "GET",
  });
}

export async function updateUser(id: string, data: UpdateUserDTO) {
  return apiClient(`/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: string) {
  return apiClient(`/user/${id}`, {
    method: "DELETE",
  });
}
