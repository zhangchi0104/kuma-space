/** @format */

'use server';
import * as Auth from '~/auth';

export async function signIn(...args: any) {
  return Auth.signIn(...args);
}

export async function signOut() {
  return Auth.signOut();
}
