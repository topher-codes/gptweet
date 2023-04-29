import { z } from "zod";

import { getUserIdByUsername } from "~/lib/twitterfuncs";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  lookupTwitterID: publicProcedure({
    input: z.object({
      username: z.string(),
    }),
    async resolve({ input }) {
      const { username } = input;
      const id = await getUserIdByUsername(username);
      return id;
    },
  }),
});
