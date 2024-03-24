import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const jwtData = (await request.jwtVerify()) as any;
    //@ts-expect-error - Added jwt for req object
    request.userId = jwtData.sub;
  } catch (err) {
    return reply.status(401).send({
      message: 'Unauthorized',
    });
  }
}
