import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function AuthLayout({children}) {
    return (
        <>
            <div className='antialiased bg-gray-light layout-default'>
                <div className='mdk-header-layout js-mdk-header-layout'>
                    <Header />
                    <div class="mdk-header-layout__content">

                        <div class="mdk-drawer-layout js-mdk-drawer-layout" data-push data-responsive-width="992px">
                            <div class="mdk-drawer-layout__content page mt-10 pt-5">
                                {children}
                            </div>

                            <Sidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
