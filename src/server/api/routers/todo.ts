/**
 * This router has some todo tRPC code, that is really just a template
 */

import { z } from "zod";
import { callGraphqlAPI } from "~/graphql/callGraphql";
import { CREATE_TODO, GET_TODOS } from "~/graphql/documents";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export interface Todo {
    id: string,
    text: string,
    user: {
        id: string
        name: string
    }
}

export interface TodoResponse {
    todos: Todo[]
}

export const todoRouter = createTRPCRouter({
    getTodo: publicProcedure
        .query(async () => {
            return {                
                todos: (await callGraphqlAPI<TodoResponse>(GET_TODOS)).data   
            };
        }),
    createTodo: publicProcedure
        .input(z.object({
            text: z.string(),
            userName: z.string()
        }))
        .mutation(async({ input }) => {
            const response = await callGraphqlAPI(
                CREATE_TODO,
                true,
                { 
                    text: input.text,
                    name: input.userName
                }
            );
            return response;
        })
})