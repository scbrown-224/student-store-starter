-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
