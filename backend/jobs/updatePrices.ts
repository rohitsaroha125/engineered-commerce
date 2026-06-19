import cron from 'node-cron';
import { prisma } from '../lib/prisma.js';

console.log('updatePrices job module loaded at', new Date().toISOString());


cron.schedule('0 8 * * 1-5', async () => {
  try {
    const count = await prisma.$executeRaw`
      UPDATE "Product"
      SET price = price + 10
    `;

    console.log(`Updated ${count} products`);
  } catch (err) {
    console.error(err);
  }
});