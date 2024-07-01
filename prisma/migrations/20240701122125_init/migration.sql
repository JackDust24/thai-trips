/*
  Warnings:

  - Added the required column `district` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "latCoords" TEXT NOT NULL,
    "lonCoords" TEXT NOT NULL
);
INSERT INTO "new_Location" ("createdAt", "id", "latCoords", "lonCoords", "name", "updatedAt") SELECT "createdAt", "id", "latCoords", "lonCoords", "name", "updatedAt" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");
CREATE UNIQUE INDEX "Location_province_key" ON "Location"("province");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
