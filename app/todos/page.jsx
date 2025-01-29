"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTodos } from '../../hooks/useTodos'; 
import { Pencil } from "lucide-react";
import { Loader } from "../../components/ui/Loader";

  
export default function Todos() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading,setLoading] =useState(true)
    const [deleteLoader,setDeleteLoader] = useState(false)
    const { isLoading, error, createTodo, updateTodo, deleteTodo, toggleTodoStatus } = useTodos();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.replace("/auth/signin");
        } else {
            fetchTasks(); 
        }
    }, [session, status, router]);

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/todos"); 
            if (!response.ok) throw new Error("Failed to fetch tasks.");
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
        finally{
            setLoading(false)
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim() !== "") {
            await createTodo(newTask); 
            setNewTask("");
            fetchTasks();
        }
    };

    const handleDeleteTask = async (id) => {
        setDeleteLoader(true)
        await deleteTodo(id); 
        setDeleteLoader(false)
        fetchTasks();
    };


    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-xl text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className=" rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {session?.user?.name}!</h1>
                <p className="text-gray-600 mb-6 text-center">Manage your tasks efficiently.</p>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                        placeholder="Enter a new task"
                        className="flex-1 border border-gray-300 rounded-lg p-2"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        Add Task
                    </button>
                </div>
                {
                loading ? 
                <div className="flex items-center justify-center text-xl">
                <Loader/>
            </div>
            :

                <>

                {tasks.length > 0 ? (
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold mb-4">Your Tasks:</h2>
                        <ul className="space-y-2">
                            {tasks.map((task) => (
                                <li
                                    key={task.id}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <p>

                                    {task.title}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => router.push(`/todos/${task.id}`)} 
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil className="h-5 w-5" /> 
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)} 
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            {
                                                deleteLoader ? 
                                                <>

                                                <Loader/>
                                                </>:
                                             <>
                                               Delete
                                             </> 
                                            }
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
                )}
                </>
}

                <button
                    onClick={() => signOut()}
                    className="bg-red-500 mt-10 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
