DROP VIEW IF EXISTS professor_information;

CREATE VIEW professor_information AS
SELECT
    p.id AS id,
    p.name AS name,
    u.name AS university,
    d.name AS dependency,
    AVG(r.general_rating) AS "averageRating",
    AVG(r.difficulty_level) AS "averageDifficultyLevel",
    AVG(r.course_grade) AS "averageCourseGrade"
FROM professor p
JOIN professor_dependency pd ON p.id = pd.fk_professor
JOIN dependency d ON pd.fk_dependency = d.id
JOIN university u ON d.fk_university = u.id
LEFT JOIN review r ON p.id = r.fk_professor
GROUP BY p.id, u.id, d.id;

SELECT * FROM professor_information;

DROP VIEW IF EXISTS professor_reviews;

CREATE VIEW professor_reviews AS
SELECT
    r.id AS id,
    c.name AS course,
    c.course_code AS code,
    ap.name AS period,
    r.created_at AS "createdAt",
    r.review,
    r.general_rating AS "generalRating",
    r.difficulty_level AS "difficultyLevel",
    r.course_grade AS "courseGrade",
    r.would_enroll_again AS "wouldEnrollAgain",
    r.fk_professor AS "professorId"
FROM review r
JOIN course c ON r.fk_course = c.id
JOIN academic_period ap ON r.fk_academic_period = ap.id;

SELECT * FROM professor_reviews;