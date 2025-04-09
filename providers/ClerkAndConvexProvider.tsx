import React from 'react'
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

export default function ClerkAndConvexProvider({children}: {children: React.ReactNode}) {
    const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
        unsavedChangesWarning: false,
    })
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

    if (!publishableKey) {
        throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env");
    }

    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}