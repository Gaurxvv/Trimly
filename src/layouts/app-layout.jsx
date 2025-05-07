import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/footer'

const AppLayout = () => {
    return (
        <div className='text-white bg-[#18181b]'>
            <main className='min-h-screen container'>
                <Header />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout