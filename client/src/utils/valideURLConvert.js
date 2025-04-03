export const valideURLConvert = (name) => {
    if (!name) return ""; // Handle null/undefined cases

    const url = name?.toString().trim().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-");
    // .toString() For Ensure it's a string
    // .trim()  For Remove unnecessary spaces

    return url;
};