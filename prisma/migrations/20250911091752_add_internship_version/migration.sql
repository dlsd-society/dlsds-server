/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Internship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `internshipVersion` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Internship" ADD COLUMN     "internshipVersion" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Internship_id_key" ON "public"."Internship"("id");
