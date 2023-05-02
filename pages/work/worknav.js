
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Router from 'next/router'

import { colorIndex, pageIndex, pageIndexInv } from '.'

function WorknavItem(props) {
  return (
    <a href={props.link} className={"WorkNav-item " + (props.activeIndex === props.index ? "Active-item" : "")}>
        <div className="WorkNav-itemInner">
            <div className="WorkNav-itemLabel">{props.label}</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="WorkNav-itemArrow icon sprite-icons">
                <path xmlns="http://www.w3.org/2000/svg" d="M8.3 2.2L15 8.9H0V12h15l-6.7 6.7 2.2 2.2L21 10.4 10.5 0 8.3 2.2z"/>
            </svg>
            <div className="WorkNav-itemColorWrap">
                <div className="WorkNav-itemColor" style={{backgroundColor: props.color}}></div>
            </div>
        </div>
    </a>
  )
}


export default function Worknav(props) {

    const [navItem, setNavItem] = useState([]);



    useEffect(() => {
        let navItemCpy = [];
        let currentPage = Router.asPath.split("/").at(-1);

        if ( document.body.clientWidth <= 1023 ){
            navItemCpy.push(<WorknavItem index={pageIndex[currentPage]} activeIndex={pageIndex[currentPage]} link={`/work/${currentPage}`} label={currentPage} color={colorIndex[pageIndex[currentPage]]}/>)

            for (let i = 0; i < 5; i++) {
                if ( i != pageIndex[currentPage] ){
                    navItemCpy.push(<WorknavItem index={i} activeIndex={pageIndex[currentPage]} link={`/work/${pageIndexInv[i]}`} label={pageIndexInv[i]} color={colorIndex[i]}/>)
                }
            }
        } else {
            for (let i = 0; i < 5; i++) {
                navItemCpy.push(<WorknavItem index={i} activeIndex={pageIndex[currentPage]} link={`/work/${pageIndexInv[i]}`} label={pageIndexInv[i]} color={colorIndex[i]}/>)

            }
        }

        setNavItem(navItemCpy);
    }, [Router])

    return (
        <>
            <div className="WorkNav">
                <div className="WorkNav-inner">
                    <div className="WorkNav-wrapper">
                        {navItem}
                    </div>
                </div>
            </div>
        </>
    )
}