import { PrismaClient } from '@prisma/client';

// Singleton instance to ensure there is only one PrismaClient instance

/**
 * Create and configure the PrismaClient instance.
 * - If in production, create a new instance.
 * - In development, reuse the global instance if available.
 * @returns {PrismaClient} - PrismaClient instance
 */
function initializePrisma () {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  } else {
    if (!global.prisma) {
      // Create a global instance if not available
      global.prisma = new PrismaClient();
    }
    // Reuse the global instance
    return global.prisma;
  }
}

// Initialize the PrismaClient instance
const prismaClient = initializePrisma();

// Ensure graceful shutdown by closing PrismaClient on process exit
process.on('beforeExit', () => {
  prismaClient.$disconnect();
});

export default prismaClient;
