/*
  Warnings:

  - A unique constraint covering the columns `[studentId,companyId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_studentId_companyId_key" ON "Application"("studentId", "companyId");
