import { Link, useLocation, useNavigate } from "react-router-dom"
import { useRef } from "react";

// icons
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";


import logo from "../assets/logo.png"
import Search from "./Search"
import useMobile from "../hooks/useMobile";

import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { DisplayPriceIndianRuppe } from "../utils/DisplayPriceIndianRuppe";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";




const Header = () => {
    const [isMobile] = useMobile();

    // here when mobile weight size less than 780 px then show search bar only
    // not show uper portion of search bar
    // it only after clcking on search icon or use in the search page
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    // react router navigate hook
    const navigate = useNavigate();

    // redux
    // useSelector is used to get the value of the state
    const user = useSelector((state) => state?.user);
    // console.log('user from redux store', user);


    // state for open user menu
    const [openUserMenu, setOpenUserMenu] = useState(false);

    // get cart item
    // const cartItem = useSelector((state) => state?.cartItem.cart);
    //console.log('cartItem', cartItem);

    // // total price
    // const [totalPrice, setTotalPrice] = useState(0);
    // // total cart items
    // const [totalQTy, setTotalQTy] = useState(0);

    const { totalPrice, totalQty, cartItem } = useGlobalContext();

    const [openCartSection, setOpenCartSection] = useState(false);


    const userMenuRef = useRef(null);

    //const token = localStorage.getItem("accessToken");


    // redirect to login page 
    const redirectToLoginPage = () => {
        navigate("/login");
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    }

    // it handle mobile version
    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login");
            return
        }
        navigate("/user");
    }

    // // total cart items and total price
    // useEffect(() => {
    //     const qty = cartItem.reduce((preve, curr) => {
    //         return preve + curr.quantity;
    //     }, 0);
    //     //console.log(qty);
    //     setTotalQTy(qty);

    //     const tprice = cartItem.reduce((preve, curr) => {
    //         return preve + (curr.productId.price * curr.quantity);
    //     }, 0);
    //     //console.log(tprice);
    //     setTotalPrice(tprice);

    // }, [cartItem]);

    // handle outside click and close user menu //
    const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setOpenUserMenu(false);  // Close the menu if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);  // Add event listener for clicks
        return () => {
            document.removeEventListener("click", handleClickOutside);  // Clean up the listener on unmount
        };
    }, []);

    return (
        <header className="bg-white h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 z-50">
            {
                !(isSearchPage && isMobile) && (
                    <div className="container mx-auto flex items-center px-4 lg:px-6 justify-between">
                        {/* logo */}
                        <div className="h-full">
                            <Link to={"/"} className="h-full flex justify-center items-center">
                                <img
                                    src={logo}
                                    width={170}
                                    height={60}
                                    alt="logo"
                                    className="hidden lg:block"
                                />
                                <img
                                    src={logo}
                                    width={150}
                                    height={60}
                                    alt="logo"
                                    className="lg:hidden"

                                />
                            </Link>
                        </div>


                        {/* search */}
                        <div className="hidden lg:block lg:w-1/2 lg:ml-[100px]">
                            <Search />
                        </div>


                        {/* login and my cart */}
                        <div className="">
                            {/* User icons display only mobile version */}
                            <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
                                <FaRegCircleUser size={28} />
                            </button>

                            {/* Desktop version */}
                            <div className="hidden lg:flex items-center gap-10 z-50">
                                {/* when user is logged in then show account */}
                                {
                                    user?._id ? (
                                        <div ref={userMenuRef} className="relative">
                                            <div onClick={() => setOpenUserMenu((prev) => !prev)} className="flex select-none items-center gap-2 cursor-pointer hover:bg-green-100 bg-cyan-100 rounded-md p-3">
                                                {
                                                    openUserMenu ? (
                                                        <>
                                                            <FaAngleDoubleUp className="text-orange-500 animate-bounce mr-[-4px] text-xl" />
                                                            <p className="font-semibold text-lg text-cyan-500 ">
                                                                ACCOUNT
                                                            </p>
                                                            <FaAngleDoubleUp className="text-orange-500 animate-bounce ml-[-4px] text-xl" />
                                                        </>

                                                    ) : (
                                                        <>
                                                            <FaAngleDoubleDown className="text-orange-500 animate-bounce mr-[-4px] text-xl" />
                                                            <p className="font-semibold text-lg text-cyan-500 ">
                                                                ACCOUNT
                                                            </p>
                                                            <FaAngleDoubleDown className="text-orange-500 animate-bounce ml-[-4px] text-xl" />
                                                        </>
                                                    )
                                                }

                                            </div>
                                            {/* when click on account then show user menu */}
                                            {
                                                openUserMenu && (
                                                    <div className="absolute top-10 ml-[-130px] ">
                                                        <div className=" min-w-[400px]">
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ) : (
                                        // when user is not logged in or user id not available then show login button
                                        <button className="text-lg font-semibold px-2" onClick={redirectToLoginPage} >
                                            Login
                                        </button>
                                    )
                                }

                                <button onClick={() => setOpenCartSection(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 rounded-md text-white">
                                    {/* add to cart icon */}
                                    <div className="font-semibold">
                                        {
                                            cartItem[0] ? (
                                                <div className="px-10 py-1">
                                                    <p className="font-mono">
                                                        {totalQty} Items
                                                    </p>
                                                    <p className="font-mono">
                                                        {DisplayPriceIndianRuppe(totalPrice)}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 px-5 py-3">

                                                    <div className="animate-pulse ">
                                                        <FaCartArrowDown size={26} />
                                                    </div>
                                                    <div className="">
                                                        <p> My Cart </p>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>

                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


            {/* mobile search bar */}
            <div className="container mx-auto px-4 lg:hidden">
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </header>
    )
}

export default Header