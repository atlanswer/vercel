import { getContext } from '../get-context';

/**
 * Returns the OIDC token from the request context or the environment variable.
 *
 * This function first checks if the OIDC token is available in the environment variable
 * `VERCEL_OIDC_TOKEN`. If it is not found there, it retrieves the token from the request
 * context headers.
 *
 * @async
 * @function
 * @returns {Promise<string>} A promise that resolves to the OIDC token.
 * @throws {Error} If the `x-vercel-oidc-token` header is missing from the request context and the environment variable `VERCEL_OIDC_TOKEN` is not set.
 *
 * @example
 * // Using the OIDC token
 * getVercelOidcToken().then((token) => {
 *   console.log('OIDC Token:', token);
 * }).catch((error) => {
 *   console.error('Error:', error.message);
 * });
 */
export async function getVercelOidcToken(): Promise<string> {
  if (process.env.VERCEL_OIDC_TOKEN) return process.env.VERCEL_OIDC_TOKEN;

  const token = getContext().headers?.['x-vercel-oidc-token'];

  if (!token) {
    throw new Error(
      `The 'x-vercel-oidc-token' header is missing from the request. Do you have the OIDC option enabled in the Vercel project settings?`
    );
  }

  return token;
}
