'use server';

import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

const EXPIRES_IN_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead.',
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    });
  } catch (error: unknown) {
    console.error('Error creating a user', error);

    if (isAuthError(error) && error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use.',
      };
    }

    return {
      success: false,
      message: 'Failed to create an account',
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: EXPIRES_IN_WEEK * 1000,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: EXPIRES_IN_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

function isAuthError(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 'auth/email-already-exists'
  );
}
