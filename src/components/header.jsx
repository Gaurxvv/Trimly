import React from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback } from './ui/avatar'
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'
const Header = () => {
    const navigate = useNavigate();
    const { user, fetchUser } = UrlState();
    const { loading, fn: fnLogut } = useFetch(logout);
    return (
        <>
            <div className=' py-2 px-4 flex justify-between items-center'>
                <Link>
                    <img src='/logo.png' className='md:h-12 h-10' alt='Trimly'></img>
                </Link>
                <div className='mr-2'>
                    {!user ?
                        <Button onClick={() => navigate("/auth")} className={"bg-[#41414b]"}>Login</Button>
                        : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden ">
                                    <Avatar>
                                        <AvatarFallback className={"text-lg w-10 h-10 bg-[#41414b] "}>GM</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="bg-[#41414b] rounded-xl shadow-xl border border-[#41414b] min-w-[180px] p-2"
                                    sideOffset={8}
                                >
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#41414b] mb-2">
                                        <Avatar>
                                            <AvatarFallback className="text-base w-8 h-8 bg-[#5d5e6c]">
                                                {user?.user_metadata?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-white truncate">
                                            {user?.user_metadata?.name ||
                                             user?.raw_user_meta_data?.name ||
                                             user?.name ||
                                             user?.email ||
                                             "User"}
                                        </span>
                                    </div>
                                    <DropdownMenuSeparator className="my-2 bg-[#39394a]" />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#23232b] transition"
                                        >
                                            <LinkIcon className="h-4 w-4" />
                                            <span>My Links</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-400 flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-900/30 transition"
                                        onClick={() => {
                                            fnLogut().then(() => {
                                                fetchUser();
                                                navigate("/");
                                            });
                                        }}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        )}
                </div>
            </div>
            {loading && <BarLoader className='mb-4' width={"100%"} color='#91939f' />}
        </>)
}

export default Header