import { Link } from "react-router-dom"
import LogoDesktop from "../assets/logo-desktop.svg"
import LogoMobile from "../assets/logo-mobile.svg"

export const Logo = (props) => {
    return ( 
        <Link to="all" { ...props }>
            <h1 className="text-2xl font-bold sm:text-3xl mr-4">
                <img src={LogoDesktop} className="h-5 hidden lg:block" alt="northCoders logo"/>
                <img src={LogoMobile} className="w-6 lg:hidden" alt="northcoders logo, an upside-down red triangle"/>
            </h1>
        </Link>
    )
}