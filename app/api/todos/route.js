import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(req) {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  
    try {
        console.log("sessionL ",session)
      const userId = session.user?.id || session.id
      console.log("user: ",userId)
  
      const todos = await prisma.todo.findMany({
        where:{userId:userId}
      })
      console.log("s: ",todos)
      return new Response(JSON.stringify(todos), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.log('Error fetching todos:',error)
      return new Response(JSON.stringify({ error: 'Failed to fetch todos' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
  

export async function POST(req) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { title } = await req.json()

  const todo = await prisma.todo.create({
    data: {
      title,
      userId: session.user.id,
    },
  })
  console.log("todo:",todo)

  return new Response(JSON.stringify(todo), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}