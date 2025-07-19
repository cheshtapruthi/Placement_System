/*
  Warnings:

  - You are about to drop the column `branch` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Company` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openings` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "branch",
DROP COLUMN "description",
ADD COLUMN     "deadline" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "openings" INTEGER NOT NULL,
ADD COLUMN     "package" TEXT NOT NULL,
ADD COLUMN     "roles" TEXT[],
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
