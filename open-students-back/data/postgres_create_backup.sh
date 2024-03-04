FILE="OpenStudentsTest.sql"
BACKUP_DIR="./backups"

# Create the backup and compress it with gzip.
pg_dump -U postgres open-students > $BACKUP_DIR/$FILE
gzip $BACKUP_DIR/$FILE