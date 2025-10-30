import { deleteKPI } from "@/services/tasks";


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await deleteKPI(id);
    return new Response(JSON.stringify(data), { status: 200 });
}