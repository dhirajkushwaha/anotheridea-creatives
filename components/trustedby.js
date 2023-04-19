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
                // let n_logos = 9;
                let n_logos = 5;
                if (document.body.clientWidth <= 1023) { n_logos = 3 }

                let t_logos = [];

                let no_of_logos = 41;

                for (let layer_n = 1; layer_n <= Math.round( 45/n_logos ); layer_n++) {

                    let oneLayer_logos = [];
                    for (let num = 1; num <= n_logos; num++) {

                        if ( ((layer_n-1)*n_logos + num) > no_of_logos ){
                            continue;
                        }
                        let trustedSliderItem = (<div className="trusterSliderItem">
                                                    <img
                                                        loading="lazy"
                                                        src={`/assets/truster/logo (${(layer_n-1)*n_logos + num}).png`}
                                                        alt=""
                                                        key={(layer_n-1)*n_logos + num}
                                                    />
                                                </div>)

                        oneLayer_logos.push( trustedSliderItem );
                    }

                    t_logos.push([<div className="trusterSlider" key={layer_n}> {oneLayer_logos} </div> ]);

                }

                setTrusters(t_logos);
			}



		}
	}, []);

    useEffect(() => {
        if (true) {

            let no_column_per_slide = trusters.length/3;

            let slides_copy = [];
            for (let i = 0; i <3; i++) {
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
