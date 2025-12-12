-- AlterTable
ALTER TABLE "public"."Credential" ADD COLUMN     "otherInternshipId" TEXT;

-- CreateTable
CREATE TABLE "public"."OtherInternship" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "areaOfInternship" TEXT NOT NULL,
    "otherAreaText" TEXT,
    "certificateOption" TEXT,
    "agreement" BOOLEAN NOT NULL,
    "internshipVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtherInternship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtherInternship_id_key" ON "public"."OtherInternship"("id");

-- AddForeignKey
ALTER TABLE "public"."Credential" ADD CONSTRAINT "Credential_otherInternshipId_fkey" FOREIGN KEY ("otherInternshipId") REFERENCES "public"."OtherInternship"("id") ON DELETE SET NULL ON UPDATE CASCADE;
