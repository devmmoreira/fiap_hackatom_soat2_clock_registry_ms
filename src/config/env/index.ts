import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development ', 'production ', 'test', 'production', 'development'])
    .default('development ')
    .transform((item) => item.trim()),
  PORT: z.coerce.number(),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false && process.env.NODE_ENV?.trim() !== 'test') {
  console.log('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.success ? _env.data : ({} as any);
