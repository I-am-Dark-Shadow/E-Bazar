import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './redux/userSlice'
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './redux/productSlice'
import { useDispatch } from 'react-redux'
import AxiosToastError from './utils/AxiosToastError'
import SummaryApi from './common/SummaryApi'
import Axios from './utils/Axios'
import GlobalProvider from './provider/GlobalProvider'
//import { handleAddItemCart } from './redux/cartProduct'


import CartMobileLink from './components/CartMobileLink'

function App() {
  // we dont know user loggest in or not so we have to check it in every page

  const dispatch = useDispatch();

  const location = useLocation();



  // fetch user details
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Check if token exists
      if (!token) {
        // console.log("No token found, skipping user details fetch.");
        return; // Stop execution if no token
      }

      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData?.data));

    } catch (error) {
      console.log(error.message || error);
    }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      // setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
        // setCategoryData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }


  const fetchSubCategory = async () => {
    try {
      // setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
        // setCategoryData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      // setLoading(false)
    }
  }




  // here we use useEffect because we want to run this function only once when the app is loaded
  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    //fetchCartItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <GlobalProvider>
      {/* <div className='flex flex-col min-h-screen'> */}
      <Toaster />
      <Header />
      {/* <main className='flex-1 overflow-y-auto custom-scrollbar-green px-4 py-2'> */}
      <main className='min-h-[80vh]'>
        {/* here use Outlet because we want to render all pages it is a react Router DOM component */}
        <Outlet />
      </main>
      <Footer />
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink />
        )
      }
      {/* </div> */}

    </GlobalProvider>
  )
}

export default App
