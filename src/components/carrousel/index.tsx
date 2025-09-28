import { Swiper, SwiperSlide } from 'swiper/react';
import camisa from '../../assets/camisa-meninos.png' 
import fotoMeninos from '../../assets/foto-meninos-da-caixa.png' 
import fotoMeninos2 from '../../assets/foto-meninos-da-caixa-2.png' 
import jogo from '../../assets/jogo.png' 

//Codigo para criar o Carrousel, e importações/
export function Carrousel(){
    return (
        <div >
          <Swiper
           spaceBetween={35}
           slidesPerView={1.20} 
           onSlideChange={() => console.log('slide change')}
           onSwiper={(swiper) => console.log(swiper)}
          >
           <SwiperSlide ><img src={camisa} alt="meninos com a camisa do time" className='w-full' /></SwiperSlide>
           <SwiperSlide><img src={fotoMeninos} alt="foto dos meninos do time com o treinador" className='w-full' /></SwiperSlide>
           <SwiperSlide><img src={fotoMeninos2} alt="foto dos meninos do time com o treinador" className='w-full' /></SwiperSlide>
           <SwiperSlide><img src={jogo} alt="foto de dois meninos jogando" className='w-full' /></SwiperSlide>
          </Swiper>
        </div>
    )
}