-- CreateTable
CREATE TABLE "public"."BookSession" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "topics" TEXT[],
    "agreement" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookSession_pkey" PRIMARY KEY ("id")
);
