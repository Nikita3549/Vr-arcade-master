-- CreateTable
CREATE TABLE "clients" (
    "full_name" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("full_name")
);

-- CreateTable
CREATE TABLE "devices" (
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("serial_number")
);

-- CreateTable
CREATE TABLE "games" (
    "name" TEXT NOT NULL,
    "pathToImage" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "fromTo" TEXT NOT NULL,
    "userFullName" TEXT NOT NULL,
    "deviceSerial" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("fromTo")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_pathToImage_key" ON "games"("pathToImage");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_gameName_fkey" FOREIGN KEY ("gameName") REFERENCES "games"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_deviceSerial_fkey" FOREIGN KEY ("deviceSerial") REFERENCES "devices"("serial_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userFullName_fkey" FOREIGN KEY ("userFullName") REFERENCES "clients"("full_name") ON DELETE RESTRICT ON UPDATE CASCADE;
