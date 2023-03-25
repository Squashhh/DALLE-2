-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 25
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
