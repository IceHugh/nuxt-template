import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create({
  /**
   * @link https://trpc.io/docs/v10/context
   */
  context: () => ({}),
});

/**
 * Export type router type signature,
 * this is used by the client.
 */
export type AppRouter = typeof appRouter;

/**
 * Create your application's root router
 */
export const appRouter = t.router({
  greeting: t.procedure
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name ?? "World"}!`,
        timestamp: new Date().toISOString(),
      };
    }),

  health: t.procedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }),

  userInfo: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        id: input.id,
        name: `User ${input.id}`,
        email: `user${input.id}@example.com`,
        createdAt: new Date().toISOString(),
      };
    }),
});
