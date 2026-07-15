import { api } from "@/lib/api";

interface AddCollaboratorPayload {
    documentId: string;
    email: string;
    role: "EDITOR" | "VIEWER";
}
interface Collaborator {
    id: string;
    role: "OWNER" | "EDITOR" | "VIEWER";
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface UpdateCollaboratorPayload {
    role: "EDITOR" | "VIEWER";
}

export function getCollaborators(documentId: string) {
    return api<{
        success: boolean;
        data: Collaborator[];
    }>(`/api/collaborators?documentId=${documentId}`);
}

export function addCollaborator(
    payload: AddCollaboratorPayload
) {
    return api<{
        success: boolean;
        data: Collaborator;
    }>("/api/collaborators", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateCollaborator(
    collaboratorId: string,
    payload: UpdateCollaboratorPayload
) {
    return api<{
        success: boolean;
        data: Collaborator;
    }>(`/api/collaborators/${collaboratorId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function removeCollaborator(
    collaboratorId: string
) {
    return api<{
        success: boolean;
        message: string;
    }>(`/api/collaborators/${collaboratorId}`, {
        method: "DELETE",
    });
}