-- CreateTable
CREATE TABLE "eggs_yield" (
    "id" SERIAL NOT NULL,
    "chickens" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "comment" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eggs_yield_pkey" PRIMARY KEY ("id")
);
