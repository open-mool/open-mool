'use client';

import { useUser as useClerkUser } from '@clerk/nextjs';

type SessionUser = {
    sub: string;
    email: string | null;
    name: string;
    picture: string | null;
};

export const useUser = () => {
    const { isLoaded, user } = useClerkUser();

    const sessionUser: SessionUser | null = user
        ? {
              sub: user.id,
              email: user.primaryEmailAddress?.emailAddress ?? null,
              name: user.fullName || user.username || user.firstName || 'Guardian',
              picture: user.imageUrl || null,
          }
        : null;

    return {
        user: sessionUser,
        isLoading: !isLoaded,
    };
};
