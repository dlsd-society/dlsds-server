-- CreateTable
CREATE TABLE "public"."Credential" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "code" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileUrl" TEXT,
    "userId" INTEGER NOT NULL,
    "internshipId" TEXT,
    "hackathonId" TEXT,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_code_key" ON "public"."Credential"("code");

-- AddForeignKey
ALTER TABLE "public"."Credential" ADD CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Credential" ADD CONSTRAINT "Credential_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "public"."Internship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Credential" ADD CONSTRAINT "Credential_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "public"."FirstHack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
