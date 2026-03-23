// prisma.config.ts  ← root level, same as package.json
import path from 'path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});