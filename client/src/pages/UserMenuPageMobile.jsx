import UserMenu from "../components/UserMenu"

// icons import section
import { IoClose } from "react-icons/io5";

const UserMenuPageMobile = () => {
    return (
        <>
            <button className="right-10 p-3 absolute font-semibold text-red-600 hover:text-red-800"
                    onClick={() => window.history.back()}>
                <IoClose size={30} />
            </button>
            <div className="">
                <UserMenu />
            </div>

        </>
    )
}

export default UserMenuPageMobile