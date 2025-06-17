/**
 * Group Router
 */

import type { UUID } from "node:crypto";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { callGraphqlAPI } from "~/graphql/callGraphql";
import { CREATE_GROUP, GET_GROUPS } from "~/graphql/documents";
import { z } from "zod";

export interface Group {
    id: UUID
    name: string 
    description: string
    profilePic: {
        data: string
        mimeType: string
    }
    isVerified: boolean
    isOpen: boolean
    createdAt: number
    updatedAt: number
}

export interface GetGroupsResponse {
    groups: Group[]
}

export interface CreateGroupResponse {
    id: UUID
    name: string 
    description: string    
    isVerified: boolean
    isOpen: boolean
    createdAt: number
    updatedAt: number
}

export const groupRouter = createTRPCRouter({
    getGroups: publicProcedure
        .query(async () => {
            const grps = (await callGraphqlAPI<GetGroupsResponse>(GET_GROUPS)).data;
            return {
                groups: grps?.groups.map(grp => ({                    
                    ...grp,
                    createdAt: new Date(grp.createdAt),
                    updatedAt: new Date(grp.updatedAt)
                })) 
            }
        }),
    createGroup: publicProcedure
        .input(z.object({
            name: z.string(),
            description: z.string().optional(),
            profilePic: z.string().base64().optional(),
            isOpen: z.boolean()
        }))
        .mutation(async({ input }) => {
            const response = (await callGraphqlAPI <CreateGroupResponse>(
                CREATE_GROUP, 
                true, 
                {
                    input:  {
                        name: input.name,
                        description: input.description,
                        profilePic: {
                            data: input.profilePic,
                            mimeType: "jpeg"
                        },
                        isOpen: input.isOpen
                    }
                }

            ))
            const grpCreated = response.data;
            if(!grpCreated) return grpCreated;
            return {
                ...grpCreated,
                createdAt: new Date(grpCreated.createdAt),
                updatedAt: new Date(grpCreated.updatedAt),
            }

        })
    
})