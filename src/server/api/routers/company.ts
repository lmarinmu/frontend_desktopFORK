/**
 * Company Router
 */

import { createTRPCRouter, publicProcedure } from "../trpc";
import { callGraphqlAPI } from "~/graphql/callGraphql";
import { GENERATE_COMPANIES, GET_EXAMPLE_COMPANIES } from "~/graphql/documents";
import { z } from "zod";

export interface GenerateCompaniesResponse {
    message: {
        en: string;
        es: string;
    };
    task_id: string;
}

export const companyRouter = createTRPCRouter({
    generateCompanies: publicProcedure
        .mutation(async () => {
            const response = await callGraphqlAPI<{ generateCompanies: GenerateCompaniesResponse }>(
                GENERATE_COMPANIES,
                true
            );
            return response.data?.generateCompanies;
        }),
    getExampleCompanies: publicProcedure
        .input(z.object({
            taskId: z.string()
        }))
        .query(async ({ input }) => {
            try {
                const response = await callGraphqlAPI<{ 
                    exampleCompanies: {
                        result?: Array<{ id: string; name: string }>;
                        message: { es: string };
                    }
                }>(
                    GET_EXAMPLE_COMPANIES,
                    false,
                    {
                        exampleCompaniesId: input.taskId
                    }
                );

                const data = response.data?.exampleCompanies;
                
                if (!data) {
                    throw new Error('No se encontraron datos');
                }

                if (!data.result && data.message.es) {
                    return {
                        groups: [],
                        message: data.message.es
                    };
                }

                // Si hay resultados, convertirlos al formato de grupos
                const currentDate = new Date();
                return {
                    groups: data.result?.map((item, index) => ({
                        id: item.id,
                        name: item.name,
                        description: `Descripción del grupo ${index + 1}`,
                        isVerified: parseInt(item.id.split('-').at(0) ?? '0', 16) % 2 === 0,
                        isOpen: parseInt(item.id.split('-').at(1) ?? '0', 16) % 2 === 0,
                        createdAt: currentDate,
                        updatedAt: currentDate
                    })) || [],
                    message: data.message.es
                };
            } catch (error) {
                return {
                    groups: [],
                    message: error instanceof Error ? error.message : 'Error desconocido'
                };
            }
        }),
});
