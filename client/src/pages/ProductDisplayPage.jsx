import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError';
import { useEffect, useRef, useState } from 'react';
import ViewImage from '../components/ViewImage';
import gsap from 'gsap';

import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { DisplayPriceIndianRuppe } from '../utils/DisplayPriceIndianRuppe';
import Divider from '../components/Divider';

// import images
import bagImage from '../assets/bag.png'
import bestPriceImage from '../assets/best price.png'
import fastDeliveryImage from '../assets/fast_delivery.png'
import AddToCartButton from '../components/AddToCartButton.jsx';


const ProductDisplayPage = () => {

  const params = useParams()
  //console.log(params);

  const [productData, setProductData] = useState({
    name: '',
    image: [],
    // description: '',
    // category: '',
    // subCategory: '',
    // unit: '',
    // stock: '',
    // price: '',
    // discount: '',
    // more_details: ''
  })
  const [image, setImage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const imageContainer = useRef();


  const productId = params?.product?.split('-').slice(-1)[0];
  //console.log(productId);


  // create a api for get product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          // here ptoductId: is check same as your backend controller
          productId: productId
        }
      })

      // destructure data from response
      const { data: responseData } = response

      if (responseData.success) {
        setProductData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }

  }

  // call the api function help of useEffect
  useEffect(() => {
    fetchProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  //console.log(productData);

  const handleImageClick = (url) => {
    setImageUrl(url);
    setViewImage(true);
  };

  // Scroll Function left and right
  const handleScrollRight = () => {
    gsap.to(imageContainer.current, {
      scrollLeft: imageContainer.current.scrollLeft + 100,
      duration: 0.8, // Adjust for smoothness
      ease: "power2.out", // Makes the motion smooth
    });
  };

  const handleScrollLeft = () => {
    gsap.to(imageContainer.current, {
      scrollLeft: imageContainer.current.scrollLeft - 100,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const originalPrice = DisplayPriceIndianRuppe(productData?.price)

  return (
    <>
      <section className="container mx-auto p-4 grid lg:grid-cols-2 bg-white">

        <div className="lg:min-h-[75vh] lg:max-h-[75vh] lg:overflow-y-scroll scrollbar-design lg:mr-4">
          {/* display product image */}
          <div className=" lg:border lg:border-gray-200 lg:shadow-lg rounded-lg lg:mx-4 lg:p-4 lg:ml-4 lg:bg-slate-50">

            {/* display main image of product */}
            <div className="bg-white shadow-md border border-gray-200 lg:min-h-[51vh] lg:max-h-[51vh] h-full w-full rounded-lg min-h-56 max-h-56 flex items-center justify-center">
              <img
                src={productData.image[image]}
                alt={productData.name}
                className="rounded-lg  w-[55%] h-[55%] object-scale-down lg:p-6 p-4 cursor-pointer "
                onClick={() => handleImageClick(productData.image[image])}
              />
              {viewImage && <ViewImage url={imageUrl} close={() => setViewImage(false)} />}
            </div>

            {/* dislay which image is selected */}
            <div className="flex items-center justify-center gap-3 mt-3">
              {
                productData.image.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className={`bg-lime-200  w-4 h-4 rounded-full
                      ${index === image && 'bg-lime-300'}`}
                    >
                    </div>
                  );
                })
              }
            </div>

            {/* display sub images of product */}
            <div className="grid relative">
              <div ref={imageContainer} className="flex gap-5 relative z-10 items-center mt-3 w-[90%] mx-auto overflow-x-auto scrollbar-none p-1">
                {
                  productData.image.map((img, index) => {
                    return (
                      <div className="h-20 w-20 min-h-20 min-w-20 mb-2 lg:shadow-md shadow bg-white rounded p-1 border-2 border-gray-100 hover:border-gray-200 hover:shadow-md lg:hover:scale-105 transition-all cursor-pointer" key={index}>
                        <img
                          src={img}
                          alt={productData.name}
                          onClick={() => setImage(index)}
                          className="h-full w-full object-scale-down "
                        />
                      </div>
                    );
                  })
                }
              </div>


              {/* display next and previous button */}
              {productData.image.length > 6 &&
                <div className="hidden lg:flex justify-between mt-9  absolute w-full">
                  <button
                    onClick={handleScrollLeft}
                    className="z-10 bg-yellow-200 text-gray-500 ml-2 p-2 rounded-xl shadow-lg border-[3px] border-amber-300 hover:bg-amber-200 hover:border-amber-300 transition-all"
                  >
                    <FaAngleDoubleLeft size={20} />
                  </button>

                  <button
                    onClick={handleScrollRight}
                    className="z-10 bg-yellow-200 text-gray-500 mr-4 p-2 rounded-xl shadow-lg border-[3px] border-amber-300 hover:bg-amber-200 hover:border-amber-300 transition-all"
                  >
                    <FaAngleDoubleRight size={20} />
                  </button>
                </div>
              }

            </div>

          </div>

          {/* display product rating and more details for large screen */}
          <div className="hidden lg:block lg:p-6">
            {/* rating section */}
            <div className="">

            </div>

            {/* more details section */}
            <div className="font-mono">
              <div className="flex gap-2 items-center">
                <p className="font-semibold uppercase lg:text-xl">Stock :</p>
                <p className="text-gray-700 text-xl font-semibold">
                  {
                    productData.stock > 0 ? (
                      <span className="text-blue-600 text-xl">{productData.stock}
                        <span className="text-green-600 text-lg"> In Stock</span>
                      </span>
                    ) : (
                      <span className="text-red-600 text-xl animate-pulse"> Out of Stock</span>
                    )
                  }
                </p>
              </div>

              <div className="">
                <p className="font-semibold uppercase lg:text-xl mt-3">Description :
                  <span className="text-gray-600 text-base font-medium normal-case"> {productData.description}</span>
                </p>
              </div>

              <div className="flex gap-2 items-center mt-3">
                <p className="font-semibold uppercase lg:text-xl">Unit : </p>
                <p className="text-gray-700 text-lg font-medium">{productData.unit}</p>
              </div>

              {/* more details /// here more details is a object so here i handle a object */}
              {/* here ? this sign it's mean if more_details is available then show */}
              {
                productData?.more_details && Object.keys(productData?.more_details).map((element, index) => {
                  return (
                    <div className="" key={index}>
                      <p className="font-semibold uppercase lg:text-xl mt-3">{element}:
                        <span className="text-gray-600 text-base font-medium normal-case"> {productData.more_details[element]}</span>
                      </p>
                    </div>

                  )
                })
              }
            </div>
          </div>
        </div>




        {/* display product price and description  */}
        <div className="py-4 lg:min-h-[75vh] lg:max-h-[75vh] lg:overflow-y-scroll scrollbar-design">
          {/* <p className="">10 Min</p> */}
          <h2 className="text-2xl font-mono lg:text-3xl font-semibold mb-4 text-ellipsis line-clamp-2 uppercase">
            {productData.name}
          </h2>
          <p className="text-gray-600 mb-2 text-xl font-mono font-semibold bg-yellow-200 py-1 px-2 rounded-md w-fit">
            {productData.unit}
          </p>

          {/* description */}
          <div className="">
            <p className="uppercase mt-6 text-xl font-mono font-semibold">Details:-</p>
            <p className="text-gray-600 font-mono font-semibold text-ellipsis line-clamp-2">
              {productData.description}
            </p>
          </div>
          <Divider />

          {/* price */}
          <div className="">
            <p className="uppercase mt-8 text-xl underline press_start_2p_regular mb-3">Price Section</p>

            <div className="flex gap-2 font-mono items-center">
              <p className="font-semibold text-xl kode_mono_bold">
                Actual Price :
              </p>
              <p className="line-through font-medium text-red-500 text-2xl">
                {originalPrice}
              </p>
            </div>

            <div className="flex gap-2 font-mono items-center">
              <p className="font-semibold text-xl kode_mono_bold">
                Discount :
              </p>
              <p className="font-medium text-green-500 text-2xl">
                {productData.discount}%
              </p>
            </div>

            <div className="flex gap-2 font-mono items-center">
              <p className="font-semibold text-xl kode_mono_bold">
                Discount Price :
              </p>
              <p className="font-medium text-blue-500 text-2xl bg-blue-50 py-1 px-2 rounded-lg border-2 border-blue-500">
                {DisplayPriceIndianRuppe(productData?.price * (1 - productData?.discount / 100))}
              </p>
            </div>

          </div>

          {/* add to cart */}
          <div className="mt-5">
            {
              productData.stock === 0 ? (
                <div className="flex gap-3 items-center">
                  <button
                    disabled
                    className="bg-gray-300 transition-all text-white font-semibold py-3 px-4 rounded-md cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                  <p className="text-lg text-red-500 font-medium animate-pulse">Out of Stock</p>
                </div>
              ) : (
                // <button
                //   className="bg-green-500 hover:bg-green-600 transition-all text-white font-semibold py-3 px-4 rounded-md"
                // >
                //   Add to Cart
                // </button>
                <AddToCartButton data={productData} />
              )
            }
          </div>


          <Divider />

          {/* why you should shop from us  */}
          <div className="mt-2">
            <h2 className="text-lg font-mono font-semibold mb-4 text-black">
              Why shop from E-Bazar ?
            </h2>

            {/* some images */}
            <div className="-mt-3 items-center">
              <div className="flex items-center">
                <img
                  src={fastDeliveryImage}
                  alt='Fast Delivery'
                  height={120}
                  width={120}
                />
                <div className="">
                  <div className="font-semibold font-mono">Superfast Delivery..</div>
                  <p className='font-mono text-gray-600 text-ellipsis line-clamp-3 lg:text-base text-sm'>Get your order delivered to your doorstep at the earliest from nearest E-Bazar store.</p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={bestPriceImage}
                  alt='Best Price'
                  height={120}
                  width={120}
                />
                <div className="">
                  <div className="font-semibold font-mono">Best Price..</div>
                  <p className='font-mono text-gray-600 text-ellipsis line-clamp-3 lg:text-base text-sm'>
                    Best price destination with offers directly from E-Bazar Stores and manufacturers.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={bagImage}
                  alt='bag image'
                  height={120}
                  width={120}
                />
                <div className="">
                  <div className="font-semibold font-mono">Wide Assortment..</div>
                  <p className='font-mono text-gray-600 text-ellipsis line-clamp-3 lg:text-base text-sm'>
                    Choose from 5000+ products across food, home, baby care, electronics and more categories.
                  </p>
                </div>
              </div>

            </div>
          </div>



        </div>

        {/* display product rating and more details for mobile*/}
        <div className="block lg:hidden lg:p-6 font-base">
          <Divider />
          {/* rating section */}
          <div className="">

          </div>

          {/* more details section */}
          <div className="font-mono">
            <div className="flex gap-2 items-center mt-3">
              <p className="font-semibold uppercase lg:text-2xl">Stock :</p>
              <p className="text-gray-700 text-xl font-semibold">
                {
                  productData.stock > 0 ? (
                    <span className="text-blue-600 text-xl">{productData.stock}
                      <span className="text-green-600 text-xl"> In Stock</span>
                    </span>
                  ) : (
                    <span className="text-red-600 text-xl animate-pulse"> Out of Stock</span>
                  )
                }
              </p>
            </div>

            <div className="">
              <p className="font-semibold uppercase lg:text-2xl mt-3">Description :
                <span className="text-gray-600 text-sm mt-1 font-medium normal-case"> {productData.description}</span>
              </p>
            </div>

            <div className="flex gap-2 items-center mt-3">
              <p className="font-semibold uppercase lg:text-2xl">Unit : </p>
              <p className="text-gray-700 text-lg font-medium ">{productData.unit}</p>
            </div>

            {/* more details /// here more details is a object so here i handle a object */}
            {/* here ? this sign it's mean if more_details is available then show */}
            {
              productData?.more_details && Object.keys(productData?.more_details).map((element, index) => {
                return (
                  <div className="" key={index}>
                    <p className="font-semibold uppercase lg:text-2xl mt-3">{element}:
                      <span className="text-gray-600 text-sm mt-1 font-medium normal-case"> {productData.more_details[element]}</span>
                    </p>
                  </div>

                )
              })
            }
          </div>
        </div>
      </section >
    </>
  )
}

export default ProductDisplayPage
