import { serve } from "https://deno.land/std/http/server.ts";
import cors from "https://deno.land/x/edge_cors/src/cors.ts";
import { getIPLocation } from "https://deno.land/x/ip_location/mod.ts";

await serve(async (req: any, conn: {}) => {
  const typedConn = { ...conn } as { remoteAddr: { hostname: string } };
  const { hostname: ip } = typedConn.remoteAddr;
  const ipLocation = await getIPLocation(ip);
  return cors(
    req,
    new Response(ipLocation.country_name, {
      status: 200,
    })
  );
});
