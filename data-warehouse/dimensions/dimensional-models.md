# Dimensional Models

## 1. Conformed Dimensions

### 1.1 Dim_Time
* **Surrogate Key**: `time_key` (INT, e.g., 20260714)
* **Attributes**: `date`, `day_of_week`, `month`, `quarter`, `year`, `is_holiday`, `academic_semester`.
* **SCD Type**: Type 0 (Static).

### 1.2 Dim_Student
* **Surrogate Key**: `student_key`
* **Natural Key**: `student_id`
* **Attributes**: `first_name`, `last_name`, `enrollment_year`, `current_status`.
* **SCD Type**: Type 2 (Tracks changes to enrollment status over time).

### 1.3 Dim_Faculty
* **Surrogate Key**: `faculty_key`
* **Natural Key**: `faculty_id`
* **Attributes**: `department`, `designation`, `hire_date`.
* **SCD Type**: Type 2.

### 1.4 Dim_Department & Dim_Program
* **Attributes**: `department_name`, `program_name`, `accreditation_status`.
* **SCD Type**: Type 1 (Overwrite).

### 1.5 Dim_Course & Dim_Subject
* **Attributes**: `course_code`, `course_name`, `subject_category`, `credits`.
* **SCD Type**: Type 1.

### 1.6 Dim_Academic_Session
* **Attributes**: `session_name`, `start_date`, `end_date`.
* **SCD Type**: Type 0.

### 1.7 Dim_Question_Paper
* **Surrogate Key**: `paper_key`
* **Natural Key**: `paper_id`
* **Attributes**: `title`, `difficulty_level`, `file_format`, `status`.
* **SCD Type**: Type 2.

### 1.8 Dim_Repository
* **Attributes**: `repository_name`, `access_level`.
* **SCD Type**: Type 1.
