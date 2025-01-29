"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTodos } from '../../hooks/useTodos'; 
import { Pencil, Trash2 } from "lucide-react";
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Welcome, {session?.user?.name}!
                    </h1>
                    <p className="text-gray-600">Manage your tasks efficiently.</p>
                </div>

                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                        placeholder="Enter a new task"
                        className="flex-1 border outline-none border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                    >
                        Add Task
                    </button>
                </div>

                {loading ? 
                    <div className="flex items-center justify-center text-xl p-8">
                        <Loader/>
                    </div>
                :
                    <>
                        {tasks.length > 0 ? (
                            <div className="space-y-3">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Tasks:</h2>
                                <ul className="space-y-3">
                                    {tasks.map((task) => (
                                        <li
                                            key={task.id}
                                            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <p className="text-gray-700">{task.title}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => router.push(`/todos/${task.id}`)} 
                                                    className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                >
                                                    <Pencil className="h-5 w-5" /> 
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)} 
                                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                                                >
                                                    {deleteLoader ? 
                                                        <Loader/>
                                                    : 
                                                        <>
                                                            <Trash2 className="h-5 w-5" />
                                                        </> 
                                                    }
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No tasks yet. Add one above!</p>
                            </div>
                        )}
                    </>
                }

                <button
                    onClick={() => signOut()}
                    className="w-full mt-8 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
