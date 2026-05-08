import API from "./api";


// ======================================
// GET PERFORMANCE
// ======================================

export const getPerformance = async () => {

    const { data } = await API.get(
        "/performance"
    );

    return data;
};