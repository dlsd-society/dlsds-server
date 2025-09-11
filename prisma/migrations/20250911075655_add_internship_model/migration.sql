-- CreateTable
CREATE TABLE "public"."Internship" (
    "id" TEXT NOT NULL,
    "joinPreference" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "projectPreference" TEXT NOT NULL,
    "groupDetails" TEXT,
    "domains" TEXT[],
    "tools" TEXT,
    "previousProjects" TEXT,
    "certificateOption" TEXT NOT NULL,
    "agreement" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);
