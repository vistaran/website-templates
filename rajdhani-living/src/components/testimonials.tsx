'use client'
import Testimonial from './testimonial'

export default function Testimonials() {

  const testimonials01 = [
    {
      image: '/images/testimonial-01.jpg',
      name: 'Priya Sharma',
      user: '@priya87',
      link: '#0',
      content: 'Fast, reliable, and hassle-free shipping! Definitely my go-to choice for all my shipping needs.',
    },
    {
      image: '/images/testimonial-02.jpg',
      name: 'Neha Verma',
      user: '@nehav',
      link: '#0',
      content: 'Impressed by the efficiency of this shipping company. Packages always arrive on time, intact, and with a smile!',
    },
    {
      image: '/images/testimonial-03.jpg',
      name: 'Anjali Gupta',
      user: '@anjugupta',
      link: '#0',
      content: 'Top-notch service! From booking to delivery, everything was smooth sailing. Highly recommend!',
    },
    {
      image: '/images/testimonial-04.jpg',
      name: 'Kavita Singh',
      user: '@kevitas',
      link: '#0',
      content: 'Great communication throughout the shipping process. They keep you informed every step of the way!',
    },
  ]

  const testimonials02 = [
    {
      image: '/images/testimonial-05.jpg',
      name: 'Ritu Mishra',
      user: '@ritumish',
      link: '#0',
      content: 'Superb attention to detail. They handle fragile items with care, ensuring they reach their destination without any damage.',
    },
    {
      image: '/images/testimonial-06.jpg',
      name: 'Vikram Singh',
      user: '@vksingh',
      link: '#0',
      content: 'A lifesaver for last-minute deliveries. Quick response time and prompt delivery, even for urgent shipments.',
    },
    {
      image: '/images/testimonial-07.jpg',
      name: 'Meena Joshi',
      user: '@mjoshi',
      link: '#0',
      content: 'Reliable shipping partner for my business. Consistent service and competitive pricing make them stand out.',
    },
    {
      image: '/images/testimonial-08.jpg',
      name: 'Pooja Kapoor',
      user: '@pjkapoor',
      link: '#0',
      content: 'Efficient and professional service. They make shipping stress-free and convenient.',
    },
  ]

  return (
    <section className="bg-zinc-800">
      <div className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="font-kumbh text-3xl md:text-4xl text-zinc-200">Loved by hundreds of Customers around the world</h2>
          </div>
        </div>
        <div className="max-w-[94rem] mx-auto space-y-6">
          {/* Row #1 */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
            <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]">
              {/* Items */}
              {testimonials01.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial}>
                  {testimonial.content}
                </Testimonial>
              ))}
            </div>
            {/* Duplicated element for infinite scroll */}
            <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
              {/* Items */}
              {testimonials01.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial}>
                  {testimonial.content}
                </Testimonial>
              ))}
            </div>
          </div>
          {/* Row #2 */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
            <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll-inverse group-hover:[animation-play-state:paused] [animation-delay:-7.5s]">
              {/* Items */}
              {testimonials02.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial}>
                  {testimonial.content}
                </Testimonial>
              ))}
            </div>
            {/* Duplicated element for infinite scroll */}
            <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll-inverse group-hover:[animation-play-state:paused] [animation-delay:-7.5s]" aria-hidden="true">
              {/* Items */}
              {testimonials02.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial}>
                  {testimonial.content}
                </Testimonial>
              ))}
            </div>
          </div >
        </div >
      </div >
    </section >
  )
}