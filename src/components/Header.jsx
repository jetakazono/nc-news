import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { useEffect, useState } from "react"
import { Logo, NavBar, Users } from "."
import { getTopics } from "../utils/api"
import { menu } from "../utils/menu"
import HamburgerOpen from "../assets/hamburguer-open.svg"
import Cross from "../assets/cross.svg"

export const Header = () => {
    const [topics, setTopics] = useState([
		{
			slug: "coding",
			description: "Code is love, code is life"
		},
		{
			slug: "football",
			description: "FOOTIE!"
		},
		{
			slug: "cooking",
			description: "Hey good looking, what you got cooking?"
		}
	])

	const { user } = useContext(UserContext)
	
     useEffect(() => {
        getTopics().then((result) => {
            setTopics(result)
        })
     }, [])

	 useEffect(() => {
		menu()
	 }, [])
	 
    return (
        <>
        <header className="bg-gray-100 fixed z-50 w-full top-0">
			<nav className="relative px-4 md:px-8 py-2 md:py-4 flex justify-between items-center">
				<Logo />
				{/* Menu (Desktop) */}
				<NavBar topics={topics} className="capitalize hidden md:flex gap-4 m-0"/>

				<div className="relative">
					<input className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56" id="search" type="search" placeholder="Search website..."/>
					<button type="button" className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					</button>
				</div>

				<div className="flex md:gap-4">
					{/* Hamburger menu (Mobile) */}
					<div className="md:hidden">
						<button className="navbar-burger flex items-center text-red-600 p-3">
							<img src={HamburgerOpen} className="h-5" alt="menu-hamburguer" />
						</button>
					</div>

					{/* User Dropdown */}
					<div className="flex flex-row items-center justify-between gap-8 sm:justify-end">
						<button type="button">
						 <Users className="group flex shrink-0 items-center rounded-lg transition" />
						 </button>
							<img alt={user.name} src={user.avatar_url} className="h-10 w-10 rounded-full object-cover"/>
							<p className="ms-2 hidden text-left text-xs sm:block">
								<strong className="block font-medium">{user.username}</strong>
								<span className="text-gray-500">{user.name}</span>
							</p>
					</div>
				</div>

			</nav>
        </header>

		{/* Sidebar mobile */}
		<div className="navbar-menu relative z-40 hidden">
			<div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
			<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-20 px-6 bg-white border-r overflow-y-auto">
				<NavBar topics={topics} className="flex flex-col capitalize gap-4"/>
				<button className="navbar-close">
					<img src={Cross} className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" alt="icon-cross" />
				</button>
				<div className="mt-auto">
					<div className="pt-6">
						<a className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl" href="#">Sign in</a>
						<a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="#">Sign Up</a>
					</div>
				</div>
			</nav>
		</div>
    </>
    )
}