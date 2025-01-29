import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
    const { id } = await params;  

    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        if (!id) {
            return new Response(JSON.stringify({ error: 'Invalid todo ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log("Fetching todo with ID:", id);

        const existingTodo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });

        console.log("Todo found:", existingTodo);

        if (!existingTodo || existingTodo.userId !== session.user.id) {
            return new Response(JSON.stringify({ error: 'Todo not found or unauthorized' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(existingTodo), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        if (error && typeof error === 'object' && error.message) {
            console.error('Error fetching todo:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }

        return new Response(JSON.stringify({ error: 'Failed to fetch todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}



export async function PUT(req, { params }) {
    const session = await getServerSession(authOptions)
    const {id} = await params
    
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {
        const { title } = await req.json()

        const existingTodo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        })

        if (!existingTodo || existingTodo.userId !== session.user.id) {
            return new Response(JSON.stringify({ error: 'Todo not found or unauthorized' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { title }
        })

        return new Response(JSON.stringify(updatedTodo), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error updating todo:', error)
        return new Response(JSON.stringify({ error: 'Failed to update todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions)
    const {id} = await params
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {

        const existingTodo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        })

        if (!existingTodo || existingTodo.userId !== session.user.id) {
            return new Response(JSON.stringify({ error: 'Todo not found or unauthorized' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        await prisma.todo.delete({
            where: { id: parseInt(id) }
        })

        return new Response(null, { status: 204 })
    } catch (error) {
        console.error('Error deleting todo:', error)
        return new Response(JSON.stringify({ error: 'Failed to delete todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}