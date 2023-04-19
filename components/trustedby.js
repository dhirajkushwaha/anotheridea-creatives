// React component
import { React, useEffect, useRef, useState } from "react";

// swiper slider
import { useSwiper } from 'swiper/react';

import { Swiper, SwiperSlide } from "swiper/react";

// Next component
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper";
import { Pagination } from "swiper";

function Right_click(){
    const swiper = useSwiper();
    return <button id="trust_Right" onClick={() => swiper.slideNext(1000, false)}>next</button>
}

function Left_click(){
    const swiper = useSwiper();
    return <button id="trust_Left" onClick={() => swiper.slidePrev(1000, false)}>prev</button>
}

export default function Trustedby(props) {

    const executed = useRef(false);
    const [trusters, setTrusters] = useState([]);
    const [slides, setSlides] = useState([]);


	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (!executed.current) {
			executed.current = true;

			//  Trusters Logo sourcing
			if (true) {

                let n_logos_row = 5;
                if (document.body.clientWidth <= 1023) { n_logos_row = 3 }

                let logo_rows = [];

                let no_of_logos = 69;

                for (let row_n = 1; row_n <= Math.ceil( no_of_logos/n_logos_row ); row_n++) {

                    let oneRow_logos = [];
                    for (let num = 1; num <= n_logos_row; num++) {

                        if ( ((row_n-1)*n_logos_row + num) > no_of_logos ){
                            continue;
                        }
                        let trustedSliderItem = (<div className="trusterSliderItem">
                                                    <img
                                                        loading="lazy"
                                                        src={`/assets/truster/logo (${(row_n-1)*n_logos_row + num}).png`}
                                                        alt=""
                                                        key={(row_n-1)*n_logos_row + num}
                                                    />
                                                </div>)

                        oneRow_logos.push( trustedSliderItem );
                    }

                    logo_rows.push([<div className="trusterSlider" key={row_n}> {oneRow_logos} </div> ]);

                }

                setTrusters(logo_rows);
			}



		}
	}, []);

    useEffect(() => {
        if (true) {

            let no_column_per_slide = (trusters.length/(14/3));

            let slides_copy = [];
            for (let i = 0; i < Math.ceil((trusters.length)/3); i++) {
                slides_copy.push( <SwiperSlide> <div className="trusterSlideWrapper">{trusters.slice(i*no_column_per_slide, (i+1)*no_column_per_slide)}</div></SwiperSlide>)
            }

            setSlides(slides_copy);
        }

    }, [trusters])



    return (
        <>
            <div className="footerTrustedBy">
                {/* <h2>TRUSTED BY</h2> */}
                <h2>Trusted by</h2>
                <div className="trustersLoop">
                        <Swiper
                            pagination={true}
                            modules={[Pagination]}
                            className="trustedBy-slider"
                        >
                            { slides }
                            <Left_click/>
                            <Right_click/>
                        </Swiper>
                </div>
            </div>
        </>
    );
}
