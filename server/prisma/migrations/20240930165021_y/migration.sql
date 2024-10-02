-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "role" TEXT NOT NULL DEFAULT 'User',
    "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "emailConfirmationToken" TEXT,
    "emailConfirmationExpiresAt" DATETIME,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailConfirmationExpiresAt", "emailConfirmationToken", "emailConfirmed", "firstName", "id", "lastName", "password", "profileImage", "resetPasswordExpiresAt", "resetPasswordToken", "role", "updatedAt", "userName") SELECT "createdAt", "email", "emailConfirmationExpiresAt", "emailConfirmationToken", "emailConfirmed", "firstName", "id", "lastName", "password", "profileImage", "resetPasswordExpiresAt", "resetPasswordToken", "role", "updatedAt", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
