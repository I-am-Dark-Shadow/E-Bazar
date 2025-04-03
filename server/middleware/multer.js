// Imports the Multer library, which handles file uploads.
import multer from "multer"; 

// Creates a storage object that stores uploaded files in memory (RAM) instead of on disk.
const storage = multer.memoryStorage()

// Creates a Multer instance with the storage object, which will handle file uploads.
const upload = multer({ storage : storage });

export default upload