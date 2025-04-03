
import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import DisplayTable from "../components/DisplayTable";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";

import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";


const SubCategoryPage = () => {

  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);

  const [subCategoryData, setSubCategoryData] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);

  const [editData, setEditData] = useState({
    _id: "",
  });

  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const columnHelper = createColumnHelper()

  // state for view image using Image URL
  const [ImageURL, setImageURL] = useState("")

  // function for fetching the sub category data
  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      })

      // destructure the response because response is an object and we want to get the data
      const { data: responseData } = response

      // if response is success then set the data
      if (responseData.success) {
        setSubCategoryData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // why use useEffect because we want to fetch the data when the page is loaded
  useEffect(() => {
    fetchSubCategory()
  }, [])

  // column array for table
  const column = [
    // column for name
    columnHelper.accessor("name", {
      header: "Name",
    }),

    // column for image
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return <div className="flex items-center justify-center mt-1 cursor-pointer" onClick={() => setImageURL(row.original.image)}>
          <img
            className="lg:w-12 lg:h-10 w-8 h-8 object-scale-down"
            src={row.original.image}
            alt={row.original.name}
          />
        </div>
      }
    }),

    // column for category
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {
              !row.original.category && (
                <p>Category Not Found</p>
              )
            }


            {
              row.original.category.map((c) => {
                return (
                  <p
                    key={c._id + "table"}
                    className="bg-white shadow-md px-2 m-1 rounded lg:border-2 border border-green-500 text-gray-500 text-sm inline-block"

                  >
                    {c.name}
                  </p>
                )
              })
            }
          </>
        )
      }
    }),

    // column for action like edit and delete
    columnHelper.accessor("_id", {
      header: "Action",
      // destructure the row
      cell: ({ row }) => {
        return (
          <>
            {
              row.original._id && (
                <div className=" flex items-center justify-center flex-row gap-2 lg:mx-0 mx-2">

                  <button
                    className=" text-xs bg-transparent hover:bg-green-200 border border-green-500 text-green-500 p-1 rounded"
                    onClick={() => {
                      setOpenEdit(true),
                        setEditData(row.original)
                    }}>
                    <MdOutlineEdit size={20} />
                  </button>

                  <button
                    className="text-xs bg-transparent hover:bg-red-200 border border-red-500 text-red-500 p-1 rounded"
                    onClick={() => {
                      setOpenConfirmBoxDelete(true),
                        setDeleteSubCategory(row.original)
                    }}>
                    <MdOutlineDeleteOutline size={20} />
                  </button>
                </div>
              )
            }
          </>
        )
      }
    }),
  ]


  // handle delete sub category
  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })

      // destructure the response because response is an object and we want to get the data
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        setOpenConfirmBoxDelete(false)
        fetchSubCategory()
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <>
      <section className="p-3 kode_mono ">
        <div className="py-3 px-2 lg:px-6 font-semibold bg-yellow-100 shadow-md flex items-center justify-between rounded-md">
          <h2 className="text-sm lg:text-2xl kode_mono_bold">ALL SUB CATEGORIES</h2>
          <button onClick={() => setOpenAddSubCategory(true)} className="text-sm lg:text-xl p-1 lg:p-2 border-4 border-green-500 bg-green-400 text-white hover:bg-green-500 rounded-md shadow-md">Add Sub Category</button>
        </div>

        <div className="p-3 mt-2">

          <div className="overflow-auto">
            <DisplayTable
              data={subCategoryData}
              column={column}
            />
          </div>
          {
            !subCategoryData[0] && !loading && (
              <NoData />
            )
          }

          {
            loading && (
              <Loading />
            )
          }

          {
            openAddSubCategory && (
              <UploadSubCategoryModel
                close={() => setOpenAddSubCategory(false)}
                fetchSubCategory={fetchSubCategory}
              />
            )
          }

          {
            ImageURL &&
            <ViewImage url={ImageURL} close={() => setImageURL("")} />
          }

          {
            openEdit && (
              <EditSubCategory
                data={editData}
                close={() => setOpenEdit(false)}
                fetchSubCategory={fetchSubCategory}
              />
            )
          }

          {
            // if openDelete is true then show UploadCategoryModel component
            openConfirmBoxDelete && (
              <ConfirmBox
                close={() => setOpenConfirmBoxDelete(false)}
                cancel={() => setOpenConfirmBoxDelete(false)}
                confirm={handleDeleteSubCategory}
              />
            )
          }

        </div>
      </section>
    </>
  )
}

export default SubCategoryPage