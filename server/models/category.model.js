import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },

}, { timestamps: true // add created_at and updated_at fields

});

const CategoryModel = mongoose.model("category", categorySchema);
export default CategoryModel