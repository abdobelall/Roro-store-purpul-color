import React from 'react'
import Product from './Product'
import './slideProduct.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Autoplay , Navigation } from 'swiper/modules';


function SlideProduct({data , title}) {

  
  return (
    <div className='slide_products slide'>
        <div className="container">
            <div className="top_slide">
                <h2>{title}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
            </div>


            <Swiper loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
             slidesPerView={5}
              navigation={true}
               modules={[Navigation , Autoplay]} 
               className="mySwiper">
                

                {data.map((item) => {
                  return(
                    <SwiperSlide > <Product item={item} /> </SwiperSlide>
                  )
                })}

    

            </Swiper>



            
        </div>
        
    </div>
  )
}

export default SlideProduct