// server.ts

import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

/**
 * Netlify-compatible request handler.
 * This function is used during build and by Netlify Edge Functions.
 */
export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  // Optional: Example custom API route
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  return await render(commonEngine);
}
