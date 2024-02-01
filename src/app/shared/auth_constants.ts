
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const ADMIN_PROFILE={
  username: "admin",
  password: "admin",
  id: "",
  roles: [USER_ROLES.ADMIN]
}

export const TEACHER_PROFILE={
  username: "teacher",
  password: "teacher",
  id: "T010",
  roles: [USER_ROLES.TEACHER]
}

export const STUDENT_PROFILE={
  username: "student",
  password: "student",
  id: 8,
  roles: [USER_ROLES.STUDENT]
}

