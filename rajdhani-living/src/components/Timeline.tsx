import React from 'react';

export default function Timeline() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-12">
        {/* Left Column - Scrollable Content */}
        <div className="lg:pr-8">
          {/* Hero Section Header */}
          <div className="pt-8 mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight" style={{color: 'inherit', lineHeight: '1.1'}}>
              Rajdhani Group:<br />
              A Legacy of<br />
              Excellence<br />
              and Innovation
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{color: 'inherit', opacity: 0.85}}>
              Founded in 1991, Gandhinagar, Gujarat, Rajdhani Group has grown into a diversified conglomerate based in Gandhinagar, Gujarat. What started as a humble timber business has evolved over the decades into a multi-faceted organization with strong footholds in various industries, including plywood, hardware, kitchens, and aluminum products. Rajdhani Group's journey is a testament to their commitment to quality, innovation, and customer satisfaction.
            </p>
          </div>

          {/* Video: visible on all devices */}
          <div className="lg:hidden mt-8 mb-16">
            <video
              className="w-full h-auto rounded-2xl"
              style={{ aspectRatio: '9/16' }}
              controls
              preload="auto"
              playsInline
              autoPlay
              muted
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0.1;
              }}
            >
              <source src="/video/RajdhaniVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Timeline Section */}
          <div className="space-y-8">
            {/* 1st item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>The Early Years</h3>
              <p className="text-sm text-primary font-semibold mb-2">1991</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Rajdhani Timber</h4>
              <p style={{color: 'inherit'}}>
                The Rajdhani Group's story began in 1991 with the establishment of Rajdhani Timber. At a time when the construction and real estate industries were gaining momentum in Gujarat, there was a growing demand for high-quality timber. Recognizing this opportunity, the founders of Rajdhani Timber set out to provide superior wood products to meet the needs of builders, contractors, and furniture manufacturers. Through a combination of excellent product quality and personalized customer service, Rajdhani Timber quickly gained a reputation as a trusted supplier in the region.
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>Expansion into Plywood</h3>
              <p className="text-sm text-primary font-semibold mb-2">1995</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Rajdhani Plywood</h4>
              <p style={{color: 'inherit'}}>
                In 1995, Rajdhani Group expanded into the plywood business with the launch of Rajdhani Plywood. This move was strategic, as plywood had become a preferred material for construction and interior design due to its durability, versatility, and affordability. Rajdhani Plywood aimed to deliver top-notch plywood solutions, catering to both residential and commercial sectors. By sourcing the finest raw materials and employing advanced manufacturing techniques, the company was able to offer a wide range of plywood products, which became widely recognized for their quality and reliability.
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>Meeting the Growing Demand</h3>
              <p className="text-sm text-primary font-semibold mb-2">2002</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Rajdhani Hardware</h4>
              <p style={{color: 'inherit'}}>
                As the group's success in the timber and plywood industries continued to grow, Rajdhani Group further diversified by entering the hardware sector in 2002 with the establishment of Rajdhani Hardware. The construction and interior design industries were undergoing rapid expansion, and the need for reliable hardware products—such as locks, hinges, and fittings—was on the rise
              </p>
            </div>

            {/* 4th item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>Revolutionizing Kitchen Spaces</h3>
              <p className="text-sm text-primary font-semibold mb-2">2018</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>RKitchen</h4>
              <p style={{color: 'inherit'}}>
                In 2018, Rajdhani Group ventured into the kitchen solutions space with the introduction of Rkitchen, a brand dedicated to creating modern, functional, and aesthetically pleasing kitchens. The idea behind Rkitchen was to provide customers with complete kitchen solutions, from cabinets to accessories, that combine both style and functionality. With a focus on innovation, Rkitchen introduced modular kitchen designs that are customizable to meet the unique preferences and requirements of each client. The brand quickly gained popularity, positioning Rajdhani Group as a trendsetter in the interior design industry.
              </p>
            </div>

            {/* 5th item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>A Leap into the Aluminum Industry</h3>
              <p className="text-sm text-primary font-semibold mb-2">2019</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Avirat Metal</h4>
              <p style={{color: 'inherit'}}>
                In addition to its successes in timber, plywood, hardware, and kitchens, Rajdhani Group expanded its horizons by entering the aluminum industry. Avirat Metal, an aluminum extrusion plant, was established to meet the rising demand for high-quality aluminum products used in various sectors, including construction, automotive, and industrial manufacturing. Avirat Metal employs cutting-edge extrusion technology to manufacture aluminum products that meet international standards of quality and precision.
              </p>
            </div>

            {/* 6th item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>Further Diversification</h3>
              <p className="text-sm text-primary font-semibold mb-2">2020</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Avirat Crucible</h4>
              <p style={{color: 'inherit'}}>
                Rajdhani Group's vision for growth and diversification continued with the establishment of Avirat Crucible and Avimet Alucoat. Avirat Crucible focuses on producing high-performance crucibles used in metal casting processes, serving industries such as foundries, automotive, and aerospace. These crucibles are designed to withstand extreme temperatures and provide exceptional thermal efficiency, making them indispensable in high-temperature industrial applications.
              </p>
            </div>

            {/* 7th item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>Expanding to Aluminium Products</h3>
              <p className="text-sm text-primary font-semibold mb-2">2020</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Avimet Alucoat</h4>
              <p style={{color: 'inherit'}}>
                Avimet ALUCOAT on the other hand, specializes in providing high-quality coated aluminum products. Coated aluminum is widely used in industries such as construction, transportation, and electronics due to its durability, lightweight nature, and resistance to corrosion. Avimet Alucoat ensures that its products meet stringent quality standards, offering customized solutions to clients across various sectors.
              </p>
            </div>

            {/* 8th item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-1" style={{color: 'inherit'}}>Expanding into the Architecture and Interior Industry</h3>
              <p className="text-sm text-primary font-semibold mb-2">2021</p>
              <h4 className="text-lg font-semibold mb-2" style={{color: 'inherit'}}>Sthapatya Architect</h4>
              <p style={{color: 'inherit'}}>
                As part of its continued growth and diversification, Rajdhani Group is entering the architecture and interior design industry with the launch of Sthapatya Architect. This new venture reflects the group's commitment to offering end-to-end solutions in construction, design, and interior spaces, further expanding its presence in the building and design sectors. Sthapatya Architect aims to provide innovative architectural designs that blend functionality, sustainability, and aesthetics. With a focus on both residential and commercial projects, the firm will offer a wide range of services, from architectural planning to interior design, catering to the evolving needs of modern clients. By leveraging the experience and expertise Rajdhani Group has accumulated in related industries like construction materials, plywood, and kitchen solutions, Sthapatya Architect will be well-positioned to deliver comprehensive and customized design solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Fixed Video (Desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 mt-14">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                animation: 'slideInFromRight 1s ease-out',
                backgroundColor: 'transparent'
              }}
            >
              <video
                className="xl:max-w-xs lg:max-w-[150px] md:max-w-[120px] w-full h-auto rounded-2xl"
                style={{ aspectRatio: '9/16' }}
                controls
                preload="auto"
                playsInline
                autoPlay
                muted
                onLoadedMetadata={(e) => {
                  e.currentTarget.currentTime = 0.1;
                }}
              >
                <source src="/video/RajdhaniVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <style jsx>{`
              @keyframes slideInFromRight {
                0% {
                  transform: translateX(100%);
                  opacity: 0;
                }
                100% {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}