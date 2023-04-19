
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import Worknav from './worknav'
import Footer from '../../components/footer/footer';

export default function Work({ children }) {

    const {push} = useRouter();

    useEffect(() => {
        push("/work/branding")
    }, [])


    return (
    <>
        <main className='work-main-container'>
            <Worknav />
            {children}
            <Footer></Footer>
        </main>
    </>
    )
}