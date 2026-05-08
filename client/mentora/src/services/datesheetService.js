import API from "./api";


// ======================================
// GET DATESHEET
// ======================================

export const getDatesheet = async () => {

    const { data } = await API.get(
        "/datesheet"
    );

    return data;
};


// ======================================
// CREATE DATESHEET ENTRY
// ======================================

export const createDatesheet = async (
    datesheetData
) => {

    const { data } = await API.post(
        "/datesheet",
        datesheetData
    );

    return data;
};