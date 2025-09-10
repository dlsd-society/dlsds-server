-- CreateTable
CREATE TABLE "public"."FirstHack" (
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
    "hackathonVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FirstHack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FirstHack_id_key" ON "public"."FirstHack"("id");
