import { TypeAnimation } from 'react-type-animation';

// icons
import { IoSearch } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";


import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMobile from '../hooks/useMobile';


const Search = () => {

    // react router navigate hook
    const navigate = useNavigate();
    // react router location hook
    const location = useLocation();
    // check search page useState hook
    const [isSearchPage, setIsSearchPage] = useState(false);

    // custom hook call for mobile 
    const [isMobile] = useMobile();

    // params from url
    const params = useLocation()
    //console.log(params.search.slice(3));
    const searchText = params?.search?.slice(3);

    // check search page
    useEffect(() => {
        const isSearch = location.pathname === '/search';
        setIsSearchPage(isSearch);
    }, [location])

    // console.log(isSearchPage);



    // redirect to search page
    const redirectToSearchPage = () => {
        navigate('/search');
    }

    const handleOnChange = (e) => {
        const value = e.target.value;

        const url = `/search?q=${value}`;
        navigate(url);
    }



    return (
        <>
            <div className="flex items-center w-full min-w-[300px] lg:min-w-[480px] h-10 lg:h-12 rounded-lg border overflow-hidden text-neutral-500 bg-slate-50 group focus-within:border-primary-100">
                <div className="">

                    {
                        (isMobile && isSearchPage) ? (

                            <Link to={'/'} className="flex justify-center items-center h-full p-2.5 group-focus-within:text-white bg-primary-200 rounded-l shadow-inner">
                                <IoArrowBackOutline size={20} />
                            </Link>
                        ) : (
                            <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
                                <IoSearch size={22} />
                            </button>
                        )
                    }

                </div>

                <div className="w-full">
                    {
                        !isSearchPage ? (
                            // if not in search page
                            <div className="cursor-pointer" onClick={redirectToSearchPage}>
                                <TypeAnimation
                                    sequence={[
                                        // Same substring at the start will only be typed out once, initially
                                        'Search: "Milk" ',
                                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                                        'Search: "Bread" ',
                                        1000,
                                        'Search: "Sugar" ',
                                        1000,
                                        'Search: "Fruits" ',
                                        1000,
                                        'Search: "Cookies" ',
                                        1000,
                                        'Search: "Eggs" ',
                                        1000,
                                        'Search: "Chocolate" ',
                                        1000,
                                        'Search: "Chips" ',
                                        1000,
                                        'Search: "Cake" ',
                                        1000,
                                        'Search: "Cold Drinks" ',
                                        1000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </div>

                        ) : (
                            // if in search page
                            <div className="w-full h-full">
                                <input
                                    className="bg-transparent w-full h-full outline-none px-3"
                                    type="text"
                                    autoFocus={true}
                                    defaultValue={searchText}
                                    placeholder='Search: Fruits Eggs and more.. '
                                    onChange={handleOnChange}
                                />
                            </div>
                        )
                    }

                </div>

            </div >
        </>
    )
}

export default Search