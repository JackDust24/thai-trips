/*
  Warnings:

  - You are about to drop the `_LocationToTrip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_LocationToTrip_B_index";

-- DropIndex
DROP INDEX "_LocationToTrip_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LocationToTrip";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceInBaht" INTEGER NOT NULL,
    "numberOfPlaces" INTEGER NOT NULL,
    "tripDescPath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Trip" ("createdAt", "description", "id", "imagePath", "isAvailableForPurchase", "name", "numberOfPlaces", "priceInBaht", "tripDescPath", "updatedAt") SELECT "createdAt", "description", "id", "imagePath", "isAvailableForPurchase", "name", "numberOfPlaces", "priceInBaht", "tripDescPath", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
