// React
import { React, useEffect, useRef, useState } from "react";

// Next Components
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// External Libraries
import "swiper/css";
import "swiper/css/pagination";

import { gsap } from "gsap/dist/gsap"; // GSAP animation took

// custom Components
import Footer from "../components/footer/footer";
import Appbutton from "../components/button/appbutton";
import Trustedby from "../components/trustedby.js";

// vimeo
import Player from '@vimeo/player';



function _getClosest(item, array, getDiff) {
	var closest,
		diff;

	if (!Array.isArray(array)) {
		throw new Error("Get closest expects an array as second argument");
	}

	array.forEach(function (comparedItem, comparedItemIndex) {
		var thisDiff = getDiff(comparedItem, item);

		if (thisDiff >= 0 && (typeof diff == "undefined" || thisDiff < diff)) {
			diff = thisDiff;
			closest = comparedItemIndex;
		}
	});

	return closest;
}

function number(item, array) {
	return _getClosest(item, array, function (comparedItem, item) {
		return Math.abs(comparedItem - item);
	});
}

function lerp(a, b, n) {
	return (1 - n) * a + n * b
}

function mapVal(x1, x2, y1, y2, x){
	return ((y2-y1)/(x2-x1)) * ( x + x1 ) + y1
}

class Slider {
	constructor(options = {m_cursor_states}) {
		this.bind()

		this.opts = {
			el: options.el || '.js-slider',
			ease: options.ease || (window.innerWidth >= 1024) ? 0.1 : 0.08,
			speed: options.speed || 1.5,
			velocity: 25,
			scroll: options.scroll || false
		}

		this.m_cursor_states = options.m_cursor_states;

		this.slider = document.querySelector('.Works-slider > div')
		this.sliderInner = this.slider.querySelector('.Works-wrapper')
		this.slides = [...this.slider.querySelectorAll('.Works-slide')]
		this.slidesNumb = this.slides.length

		this.rAF = undefined

		this.sliderWidth = 0
		this.slideWidth = 0

		this.prevIndex = undefined

		this.onX = 0
		this.offX = 0

		this.currentX = 0
		this.lastX = 0
		this.deltaX = 0

		this.initTranslates = []

		this.min = 0
		this.max = 0

		this.startX = 0

		this.snappingState = 0
	}

	bind() {
		['setPos', 'run', 'on', 'off', 'resize', 'mathVals'].forEach((fn) => this[fn] = this[fn].bind(this))
	}

	setBounds() {
		const bounds = this.slides[0].getBoundingClientRect()
		this.slideWidth = bounds.width

		this.sliderWidth = this.slidesNumb * this.slideWidth
		this.min = -this.slideWidth;
		this.max = this.sliderWidth - this.slideWidth;

		this.sliderInner.style.setProperty("transform", `translate3d(${-this.slideWidth}px, 0px, 0px)`);
		this.slides.forEach((slide, index) => {

			let initTranlate = (index + 1) * this.slideWidth

			slide.style.setProperty("transform", `translate3d(${initTranlate}px, 0px, 0px)`);
			this.initTranslates.push(initTranlate);

		})

		// console.log("hello")
	}

	setPos(e) {
		if (!this.isDragging) return;
		this.currentX = this.offX + ((window.innerWidth >= 1024 ? e.clientX : e.touches[0].clientX ) - this.onX) * (window.innerWidth >= 1024 ? 1 : 3);
	}

	mathVals(translationVal,slide, index){
		let transformOrigin, scale, textDisp, opacity1st, mobTranslation;
		let ranges, itemCount;

		if ( window.innerWidth > 1024 ){
			ranges = [[340, 127.5], [1, 0.25], [0, (20/3)*6], [0, 1]];
			itemCount = 6;
		}
		else{
			itemCount = 3
			ranges = [[195, 169 - (195 - 169)/2 ], [1, 0.8 - (1 - 0.8)/2], [0 * 2.667, 10 * 2.667], [0, 1], []];
		}

		if ( translationVal < this.slideWidth*itemCount ){
			transformOrigin = mapVal(0, this.slideWidth*itemCount, ranges[0][0], ranges[0][1], translationVal)
			scale = mapVal(0, this.slideWidth*(itemCount + 1), ranges[1][0], ranges[1][1], translationVal)
			textDisp = mapVal(0, this.slideWidth*(itemCount + 1), ranges[2][0], ranges[2][1], translationVal)

			opacity1st = mapVal(0, this.slideWidth*1, ranges[3][0], ranges[3][1], translationVal)
			mobTranslation = mapVal(this.slideWidth, this.slideWidth*(2), (1.667 * 2.667),(5.833 * 2.667))



			const bounds = slide.getBoundingClientRect()
			const diff = this.currentX - this.lastX
			const start = (bounds.x + diff) + (0)
			const fromStart = this.startX - start
			// numbers.push(fromStart)

			// textDisp *= 0.69 * 1.8 //*((window.innerWidth*1.1 - fromStart))/window.innerWidth;
			textDisp *= 1.2 //*(2 - ((window.innerWidth*2 - fromStart))/window.innerWidth);
		} else {
			transformOrigin = 0;
			scale = 0.25;
			textDisp = 40 * 0.69;
			mobTranslation = 0;
		}

		if ( translationVal < this.slideWidth )
			mobTranslation = 0;

		if ( translationVal > this.slideWidth*1)
			opacity1st = 1

		return [transformOrigin, scale, textDisp, opacity1st, mobTranslation]
	}

	run() {
		this.lastX = lerp(this.lastX, this.currentX, this.opts.ease);
		this.lastX = Math.floor(this.lastX * 10) / 10;

		this.slides.forEach((slide, index) => {

			let translationVal = gsap.utils.wrap(this.min, this.max, this.initTranslates[index] + this.lastX);
			let sliderImg = slide.querySelector(".Works-slideImageInner");
			let sliderContent = slide.querySelector(".Works-slideContent");
			let sliderImageInner = slide.querySelector(".Works-slideImageInnerImg");

			if ( Math.round(translationVal/this.slideWidth) == 1 ){
				if ( index != this.prevIndex ) {

					document.querySelectorAll(".SliderBullets-item").forEach((slideBulletItem, slideBulletItemIndex) => {
						if ( index == slideBulletItemIndex ){
							console.log()
							slideBulletItem.classList.add("is-active")
						} else {
							slideBulletItem.classList.remove("is-active")
						}
					});


					this.prevIndex = index
				}
			}

			if ( 0 <= (translationVal/this.slideWidth) && (translationVal/this.slideWidth) <= 5 )
				slide.style.setProperty("visibility", "visible")
			else slide.style.setProperty("visibility", "hidden")


			let transformScaleDispOpacVal = this.mathVals(translationVal,slide, index);


			slide.style.setProperty("transform",
				`translate3d(${translationVal}px, 0px, 0px)`);

			slide.querySelector(".Works-slideContent").style.setProperty("opacity",
				`${transformScaleDispOpacVal[3]}`);

			sliderImg.style.setProperty("transform-origin", `${transformScaleDispOpacVal[0]}% 50%`);
			sliderImg.style.setProperty("transform", `scale(${transformScaleDispOpacVal[1]})`);
			sliderContent.style.setProperty("transform", `translate3d(${transformScaleDispOpacVal[2]}vw, 0px, 0px)`);
			sliderImageInner.style.setProperty("transform", `translate3d(${transformScaleDispOpacVal[3]}vw, 0px, 0px)`);

		})

		this.requestAnimationFrame()
	}

	on(e) {
		this.isDragging = true;
		try {
			this.onX = (window.innerWidth >= 1024 ? e.clientX : e.touches[0].clientX );
		} catch (error) {}
		this.slider.style.setProperty('cursor', "grabbing");

		this.m_cursor_states("move-slide-click");
	}

	off(e) {
		this.snap()
		this.isDragging = false
		this.offX = this.currentX
		this.slider.style.setProperty('cursor', "grab");

		this.m_cursor_states("move-slide-click-end");
	}

	closest() {
		const numbers = []
		this.slides.forEach((slide, index) => {
			const bounds = slide.getBoundingClientRect()
			const diff = this.currentX - this.lastX
			const start = (bounds.x + diff) + (0)
			const fromStart = this.startX - start
			numbers.push(fromStart)
		})

		let closest = number(0, numbers)
		closest = numbers[closest]

		return {
			closest
		}
	}

	snap() {

		if ( !this.snappingState ) return;

		const { closest } = this.closest()
		this.currentX = this.currentX + closest
	}

	requestAnimationFrame() {
		this.rAF = requestAnimationFrame(this.run)
	}

	cancelAnimationFrame() {
		cancelAnimationFrame(this.rAF)
	}

	addEvents() {
		this.run()

		this.slider.addEventListener('mousemove', this.setPos, { passive: true })
		this.slider.addEventListener('mousedown', this.on, false)
		this.slider.addEventListener('mouseup', this.off, false)

		window.addEventListener("mouseup", this.off, false)

		this.slider.addEventListener('touchmove', this.setPos, { passive: true })
		this.slider.addEventListener('touchstart', this.on, false)
		this.slider.addEventListener('touchend', this.off, false)
	}

	removeEvents() {
		this.cancelAnimationFrame(this.rAF)

		this.slider.removeEventListener('mousemove', this.setPos, { passive: true })
		this.slider.removeEventListener('mousedown', this.on, false)
		this.slider.removeEventListener('mouseup', this.off, false)

		window.removeEventListener("mouseup", this.off, false)

		this.slider.removeEventListener('touchmove', this.setPos, { passive: true })
		this.slider.removeEventListener('touchstart', this.on, false)
		this.slider.removeEventListener('touchend', this.off, false)
	}

	resize() {
		this.setBounds()
	}

	destroy() {
		this.removeEvents()

		this.opts = {}
	}

	init() {
		this.setBounds()
		this.addEvents()


	}
}


function WorksSliderItem(props) {

    const executed = useRef(0);

	const cl_name = `.Slide-Popup-${props.index}`;

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

			props.addPopup(

				(<div className={"Slide-popup popup-hidden Slide-Popup-"+props.index}>
					<div className="Popup-frame">
						<div className="Popup-cross">close <img alt="cross button" src="/assets/delete-sign--v2.png"/> </div>
						<div className="Popup-video">
							{/* <iframe src={props.videoSrc} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe> */}
						</div>
					</div>
            	</div>),

				()=>{

					// console.log(cl_name);

					// let iframe = document.querySelector(cl_name+' iframe');
					// let player = new Player(iframe);
					let iframe;
					let player;


					// adding the popup
					document.querySelector(".Works-SlideItem-"+props.index+" .Works-slideContent").addEventListener("click", (e)=>{

						document.querySelector(cl_name+" .Popup-video").innerHTML = `<iframe src=${props.videoSrc} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>`

						iframe = document.querySelector(cl_name+' iframe');
						player = new Player(iframe);

						document.querySelector(cl_name).classList.remove("popup-hidden");
						document.querySelector(".Header").classList.add("Header-under-element");
						e.preventDefault();
					})

					// popup remove fn
					let popup_r_fn = (e)=>{
						document.querySelector(cl_name).classList.add("popup-hidden");
						document.querySelector(".Header").classList.remove("Header-under-element");
						e.cancelBubble = true;

						if(player != undefined) player.pause();
					}

					// removing the popup
					document.querySelector(cl_name+" .Popup-cross").addEventListener("click", popup_r_fn);
					document.querySelector(cl_name).addEventListener("click", popup_r_fn);

				}
			);

            executed.current += 1;
        }
    }, [])

	return (
		<div className={"Works-slide Works-SlideItem-"+props.index}
			data-index={props.index}
			style={{
				"--index": props.index,
				transform: "translate3d(533px, 0px, 0px)",
				position: "absolute",
				touchAction: "pan-y",
				visibility: "visible",
			}}
		>
			<div className="Works-slideInner"
				style={{
					transform: "translate3d(0rem, 0px, 0px)",
					touchAction: "pan-y",
					opacity: 1
				}}
			>
				<div className="Works-slideImage"
					style={{ touchAction: "pan-y", opacity: 1 }}
				>
					<div
						className="Works-slideImageInner"
						style={{
							touchAction: "pan-y",
							opacity: 1,
							transformStyle: "preserve-3d",
							transformOrigin: "297.5% 50%",
							transform:
								"translate3d(0px, 0px, 0px) scale(0.875, 0.875)",
						}}
					>
						<div className="AppImage Works-slideImageInnerImg loaded lazyload fit-cover"
							style={{
								"--ratio": "0%",
								touchAction: "pan-y",
								transform: "translate3d(0rem, 0px, 0px)",
							}}
						>
							<div className="AppImage-overlay"
								style={{ touchAction: "pan-y" }}
							></div>
							<div className="AppImage-placeholder"
								style={{
									touchAction: "pan-y",
									backgroundColor: (props.overlayColor !== undefined ? props.overlayColor : "rgb(70, 70, 70"),
								}}
							></div>
							<picture
								style={{ touchAction: "pan-y" }}
							>

								<Image
									fill
									draggable="false"
									data-src={ props.srcSet }
									alt={ props.label }
									className="AppImage-image"
									style={{ "objectFit": "cover", "objectPosition": "center center", "touchAction": "pan-y" }}
									src={ props.src }
								/>
							</picture>
						</div>
					</div>
				</div>
				{/* <Link href={"/works/"+props.label} > */}
					{/* <a href={"/works/"+props.label} className="Works-slideContent" style={{touchAction: "pan-y", transformStyle: "preserve-3d"}}> */}
					<div className="Works-slideContent" style={{touchAction: "pan-y", transformStyle: "preserve-3d"}}>
						<div className="Works-slideWrapTitle" style={{touchAction: "pan-y"}}>
							<span data-label={ props.label } style={{touchAction: "pan-y"}} className="Works-slideTitle colorFill">{ props.label }</span>
							<div className="Works-slideHover" style={{touchAction:"pan-y"}}>
								<div className="Works-slideSubtitle" style={{touchAction:"pan-y", opacity: 0}}>
									{/* <span style={{touchAction:"pan-y"}}>
										Director : { props.dirName }
									</span> */}
								</div>
								<div className="Works-slideOffice" style={{touchAction:"pan-y", opacity: 0}}> Director : { props.dirName } </div>
							</div>
						</div>
					</div>
					{/* </a> */}
				{/* </Link> */}
			</div>
		</div>
	)
}

function Ideasbehindtextitem(props) {
	var label_left, label_right, skill, color;

	if (props.label_left === undefined) label_left = props.label;
	else label_left = props.label_left

	if (props.label_left === undefined) label_right = props.label;
	else label_right = props.label_right;

	if (props.skill === undefined) skill = "Lorem Ipsum";
	else skill = props.skill;

	if (props.color === undefined) color = "#fff";
	else color = props.color;

	var executed = false;
	let rootElementRef = useRef(null);

	useEffect(() => {
		if (!executed) {
			executed = true;
			if (true && window.innerWidth > 1023) {
				let toggleFunction = (e) => {
					rootElementRef.current.classList.toggle("hover");
				};
				rootElementRef.current
					.querySelector(".ideasBehind-itemLabel")
					.addEventListener("mouseenter", toggleFunction);
				rootElementRef.current
					.querySelector(".ideasBehind-itemLabel")
					.addEventListener("mouseleave", toggleFunction);
			}
		}
	}, []);

	return (
		<div
			className="ideasBehind-item"
			style={{
				"--ideasBehindColor": color,
				"--slide_mag": props.slidemag
			}}
			ref={rootElementRef}
		>
			<div
				data-label={
					label_left+" "+label_left
				}
				data-label-secondary={
					label_right+" "+label_left
				}
				className="ideasBehind-labelWrapper"
			>
				<Link href={props.href}>
					<span
						data-label={props.label}
						className="ideasBehind-itemLabel colorFill"
						style={{ "--x": "0px", "--y": "0px", "--r": "0px" }}
					>
						{props.label}
					</span>
				</Link>
			</div>
			<div className="ideasBehind-skills">
				<div className="ideasBehind-skillsCarousel">
					<div className="ideasBehind-skillsSlide">
						<div className="ideasBehind-skillsItem">
							<span>{skill}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function VisionbgItem(props) {
	return (
		<div className="Vision-bgItem" style={{"transform": "scale(0.6, 0.6)", "z-index": 0, "opacity": 0}}>
			<div className="Vision-bgItemWrapImage" >
				<div className="AppImage Vision-bgItemImage loaded lazyload fit-cover" style={{"--ratio": "0%"}}>
					<div className="AppImage-overlay" ></div>
					<div className="AppImage-placeholder"  style={{"background-color": "rgb(68, 68, 151)"}}>
					</div>
					<picture >
						<Image
						 	fill
							draggable="false"
							data-src={props.imgSrc}
							alt={props.alt} className="AppImage-image" style={{"object-fit": "cover", "object-position": "center center"}}
							src={props.imgSrc}
						/>
					</picture>
				</div>
			</div>
		</div>
	)
}

export default function Home(props) {
	const executed = useRef(false);
	const [popupList, setPopupList] = useState([]);

	const cur_callback = useRef([()=>{}]);
	const popup_instances = useRef([]);

	const num_slides = 6; // count of slides
	const slides_slided = useRef(0); // slides that are added to html

	const addPopup = (popup, cb_fn)=>{
		slides_slided.current += 1

		cur_callback.current.push(cb_fn);

		popup_instances.current = [...popup_instances.current, popup];

		if ( slides_slided.current == num_slides ){
			setPopupList(popup_instances.current);
		}
	}

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (!executed.current) {
			executed.current = true;

			// onresize actions
			if (true) {
				// Required Elements
				let videoContainerRef = document.querySelector(
					".vimeo-fullscreenVideo"
				);
				// Const and variable
				let ratio = parseFloat(
					window
						.getComputedStyle(videoContainerRef.parentElement)
						.getPropertyValue("--ratio")
						.replace("%", "") / 100
				);
				let videoWidth = 0,
					videoHeight = 0;

				const resizeListener = () => {
					// setting up the full screen video
					if (true) {
						if ( window.innerWidth > 1023 ) {
							videoWidth = window.innerWidth;
							videoHeight = window.innerWidth * ratio;
						}
						if ( window.innerWidth <= 1023 ) {
							videoHeight = window.screen.availHeight;
							videoWidth = videoHeight / ratio;

							console.log(videoHeight)
						}

						videoContainerRef.style.setProperty(
							"width",
							videoWidth.toString() + "px"
						);
						videoContainerRef.style.setProperty(
							"height",
							videoHeight.toString() + "px"
						);
					}
					// setting up slider width elements
				};

				if ( window.innerWidth > 1023 ){
					window.addEventListener("resize", resizeListener);
					props.windowListeners.listeners.push(resizeListener);
				} else {
					resizeListener();
				}
			}

			// Works slider
			if (true) {
				const worksSlider = new Slider({ m_cursor_states : props.m_cursor_states });
				worksSlider.init();

				let workResizeListener = worksSlider.resize
				window.addEventListener("resize", workResizeListener);

				// putting listener to be destroyed when leaving the page
				props.windowListeners.listeners.push(workResizeListener);

				// adding slider to ref
				props.s_ref.current = worksSlider;

				// Border
				if ( window.innerWidth >= 1024 ){

					// let m_h_border_cl = [".Works-slideContent", ".Works-slideImageInnerImg"]
					let m_h_border_cl = [".Works-slideContent"]

					gsap.set(document.querySelectorAll(`${m_h_border_cl[0]} .Works-slideSubtitle, ${m_h_border_cl[0]} .Works-slideOffice`), {opacity:0, y:`${2*0.69}vw`});

					// Border
					m_h_border_cl.forEach(cl => {
						document.querySelectorAll(cl).forEach(slideText => {


							let work_slideimg_arr = ([... document.querySelectorAll(".Works-slideImage")]);

							let lower_txt_tl = gsap.timeline({
								defaults:{

								}
							});

							slideText.addEventListener("mouseenter", ()=>{
								// slideText.parentElement.querySelector(".AppImage ").style.setProperty("border", "2px solid #5541f8");

								lower_txt_tl
									.to(slideText.querySelectorAll(`.Works-slideSubtitle, .Works-slideOffice`), {duration:0.3, opacity:1, stagger:0.1, y:`${0}vw`});

								// ([... work_slideimg_arr]).splice(work_slideimg_arr.indexOf(slideText.parentElement.querySelector(".Works-slideImage")), 1);

								let t_work_s_arr = ([... work_slideimg_arr]);
								t_work_s_arr.splice(work_slideimg_arr.indexOf(slideText.parentElement.querySelector(".Works-slideImage")), 1);

								gsap
									.to(t_work_s_arr, {duration:0.5, opacity:0.3});


							})
							slideText.addEventListener("mouseleave", ()=>{
								// slideText.parentElement.querySelector(".AppImage ").style.removeProperty("border");

								lower_txt_tl
									.to(slideText.querySelectorAll(`.Works-slideSubtitle, .Works-slideOffice`), {delay: 1, duration:0.2, opacity:0, y:`${2*0.69}vw`,
									onComplete:()=>{
										lower_txt_tl.clear();
										lower_txt_tl.eventCallback("onComplete", null);
									}});

								gsap
									.to(work_slideimg_arr, {duration:0.5, opacity:1});

							})
						});
					});
				}
			}

		}
	}, []);

	useEffect(() => {

		if ( slides_slided.current == num_slides && popupList.length == num_slides ){
			setTimeout(() => {
				cur_callback.current.forEach(cb_fn => {
					cb_fn();
				});
			}, 1000);
		}
	}, [popupList])


	return (
		<div data-scroll-container>
			<Head>
				<title>Another Idea</title>
			</Head>

			<section className="homeHeadSection">
				<div className="vimeo-fullscreen">
					<div
						className="vimeo-fullscreenVideo"
						style={{ width: "1920px", height: "1080px" }}
					>
						{/* this space is for insertion code */}
					</div>
				</div>
			</section>

			<section className="ideasInMotion">
				<div className="ideasTitle">
					{/* <h1>IDEAS IN MOTION </h1> */}
					<h1>Ideas in <span> Motion </span> </h1>
				</div>

				<div className="Works-slider">
					<div
						style={{ touchAction: "pan-y", cursor:"grab" , userSelect: "none" }}
					>
						<div className="Works-wrapper"
							style={{
								transform: "translate3d(0px, 0px, 0px)",
								// height: "calc(60vw * 0.69)",
								touchAction: "pan-y",
							}}
						>
							<WorksSliderItem
								src="/assets/work_slider_thumbnail/image-(1).jpg"
								label="SCRAM 411"
								dirName="Lloyd Baptista"
								overlayColor="#777799"
								videoSrc="https://player.vimeo.com/video/703566550?h=9420574f64&amp;quality=240p"
								addPopup={addPopup}
								index="0"
							/>
							<WorksSliderItem
								src="/assets/work_slider_thumbnail/image-(2).jpg"
								label="YODHA 2.0"
								dirName="Lloyd Baptista"
								videoSrc="https://player.vimeo.com/video/757567353?h=48603657bf&amp;quality=240p"
								addPopup={addPopup}
								index="1"
							/>
							<WorksSliderItem
								src="/assets/work_slider_thumbnail/image-(3).jpg"
								label="MINNAL MURALI"
								dirName="Vasan Bala"
								videoSrc="https://player.vimeo.com/video/674292817?h=8b0a629b30&amp;quality=240p"
								addPopup={addPopup}
								index="2"
							/>
							<WorksSliderItem
								src="/assets/work_slider_thumbnail/image-(4).jpg"
								label="AMAZON KHEER"
								dirName="Prosit Roy"
								videoSrc="https://player.vimeo.com/video/674290692?h=6042c3a705&amp;quality=240p"
								addPopup={addPopup}
								index="3"
							/>
							<WorksSliderItem
								src="/assets/work_slider_thumbnail/image-(5).jpg"
								label="OLA PROXIMITY UNLOCK"
								dirName="Ken Rolston"
								videoSrc="https://player.vimeo.com/video/765214457?h=b5716ad29c&amp;quality=240p"
								addPopup={addPopup}
								index="4"
							/>
							<WorksSliderItem
								src="/assets/work_slider_thumbnail/image-(6).jpg"
								label="Mi TV"
								dirName="Adam Johnson"
								videoSrc="https://player.vimeo.com/video/674301398?h=515f40e64f&amp;quality=240p"
								addPopup={addPopup}
								index="5"
							/>
						</div>
						<div className="SliderBullets HomeWorks-sliderBullets SliderBullets--light onlyMob">
							<ul className="SliderBullets-list">
								<li className="SliderBullets-item u-alignVerticalCenter is-active"></li>
								<li className="SliderBullets-item u-alignVerticalCenter"></li>
								<li className="SliderBullets-item u-alignVerticalCenter"></li>
								<li className="SliderBullets-item u-alignVerticalCenter"></li>
								<li className="SliderBullets-item u-alignVerticalCenter"></li>
								<li className="SliderBullets-item u-alignVerticalCenter"></li>
							</ul>
						</div>
					</div>
					{/* pop up */}
					<div className="slide-popup-list">
						{popupList}
					</div>
				</div>

				{/* { window.innerWidth >= 1024 && */}
					<div className="Vision">

					<div className="Vision-bgCross">
						<div className="BackgroundCross in-view">
							<div className="BackgroundCross-wrapper">
								<div className="BackgroundCross-inner" style={{"opacity": 0}}></div>
							</div>
						</div>
					</div>

					<div className="Vision-bg" style={{"opacity": 1}}>
						<div className="Vision-bgAnimatedLogo">
							{/* <video loop={true} muted={true} preload={"auto"} playsInline={true} autoPlay
								className="Video Vision-bgAnimatedLogoVideo gifLike in-view"
								style={{"transform": "translate3d(0px, 0px, 0px)"}}>
								<source src="https://www.mediakeys-experience.com/_nuxt/videos/black-balls.4cc7be5.mp4"
										data-src="https://www.mediakeys-experience.com/_nuxt/videos/black-balls.4cc7be5.mp4"
										type="video/mp4" />
							</video> */}
						</div>
						<div className="Vision-bgCircle" style={{
						"opacity": 0,
						"transform": "translate3d(0px, 0px, 0px) scale(2, 2)"
						}}></div>
						<div className="Vision-bgItems" >
							<VisionbgItem alt="Visual" imgSrc = "/assets/text_slides_thumbnail/Amazon Rakhi.png" />
							<VisionbgItem alt="Art" imgSrc = "/assets/text_slides_thumbnail/Scram 411 - Royal Enfield.png" />
							<VisionbgItem alt="Dynamism" imgSrc = "/assets/text_slides_thumbnail/OLA Electric MoveSO3 -3.png" />
							<VisionbgItem alt="Excellence" imgSrc = "/assets/text_slides_thumbnail/TATA YODHA 2.0 -04.png" />
						</div>
					</div>

					{/* <h2 className="SplitText-component HomeTitle Vision-title">
						<span className="HomeTitle-surtitle app-title--small">Nous associons</span>
						<span className="HomeTitle-title HomeTitle-title--l1 app-title--regular">stratégie &amp;</span>
						<span className="HomeTitle-title HomeTitle-title--l2 app-title--regular">exécution</span>
					</h2> */}

					<div className="Vision-wrapper">
						<div className="Vision-item">
							<div className="Vision-itemInner">
								<div className="Vision-itemHead">
									<h2 data-label="Think" className="Vision-itemTitle app-title--regular">
										100+
									</h2>
									<div className="Vision-itemSubtitle app-text--large">
										<p>National Clients</p>
									</div>
								</div>
								<div className="Vision-itemSkills"></div>
							</div>
						</div>

						<div className="Vision-item">
							<div className="Vision-itemInner">
								<div className="Vision-itemHead">
									<div className="Vision-itemSubtitle app-text--large">
										<p>International Clients</p>
									</div>
									<h2 data-label="make" className="Vision-itemTitle app-title--regular">
									10+
									</h2>
								</div>
								<div className="Vision-itemSkills"></div>
							</div>
						</div>

						<div className="Vision-item">
							<div className="Vision-itemInner">
								<div className="Vision-itemHead">
									<h2 data-label="Think" className="Vision-itemTitle app-title--regular">
										20+
									</h2>
									<div className="Vision-itemSubtitle app-text--large">
										<p>Partnered Consultants</p>
									</div>
								</div>
								<div className="Vision-itemSkills"></div>
							</div>
						</div>

						<div className="Vision-item">
							<div className="Vision-itemInner">
								<div className="Vision-itemHead">
									<div className="Vision-itemSubtitle app-text--large">
										<p>Acres Associated</p>
									</div>
									<h2 data-label="make" className="Vision-itemTitle app-title--regular">
										20000+
									</h2>
								</div>
								<div className="Vision-itemSkills"></div>
							</div>
						</div>

					</div>
					</div>
				{/* } */}

				{/* { window.innerWidth >= 1024 && */}
					<div className="ideasBehind-wrapper">

					<div className="ideasBehind-bgCross">
						<div className="BackgroundCross in-view">
							<div className="BackgroundCross-wrapper">
								<div className="BackgroundCross-inner" style={{"opacity": 0}}></div>
							</div>
						</div>
					</div>

					<Ideasbehindtextitem
						label="Branding"
						href="/work"
						color="#af37d9"
						skill=""
						slidemag="2vw"
					></Ideasbehindtextitem>
					<Ideasbehindtextitem
						label="Campaigns"
						href="/work"
						color="#de477e"
						skill=""
						slidemag="14vw"
					></Ideasbehindtextitem>
					<Ideasbehindtextitem
						label="Content Production"
						href="/work"
						color="#f2ad45"
						// skill="Bringing ideas to focus"
						skill=""
						slidemag="35vw"
					></Ideasbehindtextitem>
					<Ideasbehindtextitem
						label="Strategy"
						href="/work"
						color="#3ab8c9"
						// skill="Lorem Ipsum"
						skill=""
						slidemag="20vw"
					></Ideasbehindtextitem>
					<Ideasbehindtextitem
						label="Workshops"
						label_left={"Post Production"}
						label_right={"Post Production"}
						href="/work"
						color="#3b33b3"
						// skill="Lorem Ipsum"
						skill=""
						slidemag="0.7vw"
					></Ideasbehindtextitem>
					</div>
				{/* } */}

			</section>

			<section className="bottomSection">
				<div className="footerLearnMore">
					{/* <h4>WE ARE</h4> */}
					<h4>We are</h4>
					{/* <h1>ANOTHER IDEA</h1> */}
					<h1>Another Idea</h1>
					<p className="onlyDesk">
						We are India’s only advertising & advisory agency focusing solely on the real-estate sector.
						<br />
						We have a proven repertoire of insights & knowledge pertaining the industry & its markets.
						<br />
						We offer a complete spectrum of services that enable brands to interface with target audiences at multiple touch points.
					</p>

					<p className="onlyMob">
						We are India’s only advertising & advisory agency focusing solely on the real-estate sector.
						We have a proven repertoire of insights & knowledge pertaining the industry & its markets.
						We offer a complete spectrum of services that enable brands to interface with target audiences at multiple touch points.
					</p>
					<Appbutton href="/team" label="Learn More" />
				</div>
				<Trustedby sendSwiperInstance={props.sendSwiperInstance} />
			</section>

			<Footer />
		</div>
	);
}
