import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export const auth = betterAuth({
	plugins: [expo()],
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: ["mobile://"],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	advanced: {
		useSecureCookies: true,
	},
});
