# Restore a backup of the postgres database in the ./backups/OpenStudentsTest.sql.gz file.
# Delete the database if it exists.
psql -U postgres -c "DROP DATABASE IF EXISTS \"open-students\";"
psql -U postgres -c "CREATE DATABASE \"open-students\";"
gunzip -c ./backups/OpenStudentsTest.sql.gz | psql -U postgres -d "open-students"
