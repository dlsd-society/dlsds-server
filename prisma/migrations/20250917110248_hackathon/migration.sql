/*
  Warnings:

  - You are about to drop the column `hackathonId` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the `FirstHack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Credential" DROP CONSTRAINT "Credential_hackathonId_fkey";

-- AlterTable
ALTER TABLE "public"."Credential" DROP COLUMN "hackathonId",
ADD COLUMN     "participantId" TEXT;

-- DropTable
DROP TABLE "public"."FirstHack";

-- CreateTable
CREATE TABLE "public"."Hackathon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HackathonParticipant" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,
    "soloPreference" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "agreement" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hackathonId" INTEGER NOT NULL,

    CONSTRAINT "HackathonParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackathonParticipant_id_key" ON "public"."HackathonParticipant"("id");

-- AddForeignKey
ALTER TABLE "public"."HackathonParticipant" ADD CONSTRAINT "HackathonParticipant_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "public"."Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Credential" ADD CONSTRAINT "Credential_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."HackathonParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
