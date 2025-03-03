export type task = {
    id: number;
    supervisor_id: number;
    name: string;
    priority: number;
    createdAt: string;
    isAssigned: boolean;
    isCompleted: boolean;
}