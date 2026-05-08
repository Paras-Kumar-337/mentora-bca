import API from "./api";


// ======================================
// GET NOTES
// ======================================

export const getNotes = async () => {

    const { data } = await API.get(
        "/notes"
    );

    return data;
};

// ======================================
// CREATE NOTE
// ======================================

export const createNote = async (
    noteData
) => {

    const { data } = await API.post(
        "/notes",
        noteData
    );

    return data;
};