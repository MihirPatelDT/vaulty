import { ConvexError, v } from "convex/values"
import { internalMutation, MutationCtx, QueryCtx } from "./_generated/server"

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first()
  // console.log(user)

  if (!user) {
    throw new ConvexError("expected user to be defined.")
  }

  return user
}

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgsIds: [],
    })
  },
})

export const addOrgIdToUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string() },
  async handler(ctx, args) {
    // console.log(args.tokenIdentifier)

    const user = await getUser(ctx, args.tokenIdentifier)

    await ctx.db.patch(user._id, {
      orgsIds: [...user.orgsIds, args.orgId],
    })
  },
})
