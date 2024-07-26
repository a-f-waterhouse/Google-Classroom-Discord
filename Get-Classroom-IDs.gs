function listCourses() {
  
  const response = Classroom.Courses.list();
  const courses = response.courses;
  if (!courses || courses.length === 0) {
    console.log('No courses found.');
    return;
  }
  // Print the course names and IDs of the courses
  for (const course of courses) {
    console.log('%s (%s)', course.name, course.id);
  }
  
}
