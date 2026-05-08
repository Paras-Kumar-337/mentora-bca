import API from "./api";


// ======================================
// GET ATTENDANCE
// ======================================

export const getAttendance =
  async () => {

    const { data } =
      await API.get(
        "/attendance"
      );

    return data;
};


// ======================================
// MARK ATTENDANCE
// ======================================

export const markAttendance =
  async (attendanceData) => {

    const { data } =
      await API.post(
        "/attendance/mark",
        attendanceData
      );

    return data;
};