/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `eggs_yield` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "eggs_yield_date_key" ON "eggs_yield"("date");
