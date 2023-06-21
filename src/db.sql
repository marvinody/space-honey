CREATE TABLE IF NOT EXISTS "images" (
	"id"	INTEGER NOT NULL,
	"filename"	TEXT NOT NULL,
	"user_id"	TEXT NOT NULL,
	"enabled"	INTEGER NOT NULL DEFAULT 1,
	"times_posted"	INTEGER NOT NULL DEFAULT 0,
	"created_at"	INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "image_history" (
	"image_id"	INTEGER NOT NULL,
	"time"	INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY("image_id") REFERENCES "images"("id")
);

CREATE TABLE IF NOT EXISTS "settings" (
	"property"	TEXT UNIQUE,
	"json_value"	TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS "timestamped_desc" ON "image_history" (
	"time"	DESC
);