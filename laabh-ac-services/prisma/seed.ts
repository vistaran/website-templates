import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Business Settings
  const defaultVendorPhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    '918758866744';

  const existingSettings = await prisma.businessSettings.findFirst();
  if (!existingSettings) {
    await prisma.businessSettings.create({
      data: {
        businessName: 'Labh Air Conditioning Services',
        vendorPhone: defaultVendorPhone,
        vendorEmail: 'contact@laabhservices.com',
        address: 'Shop No. 12, Commercial Complex, Bodakdev, SG Highway, Ahmedabad, Gujarat 380054',
        whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || process.env.FACEBOOK_WHATSAPP_PHONE_ID || '',
        whatsappBusinessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
        whatsappCloudApiToken: process.env.WHATSAPP_API_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN || '',
        mockModeEnabled: process.env.WHATSAPP_MOCK_MODE === 'false' ? false : true,
      },
    });
    console.log('✅ Business Settings created');
  } else {
    await prisma.businessSettings.update({
      where: { id: existingSettings.id },
      data: {
        vendorPhone: defaultVendorPhone,
      },
    });
    console.log('✅ Business Settings updated with dynamic vendorPhone');
  }

  // 2. Seed Default Admin User
  const adminEmail = 'admin@laabhservices.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Labh Admin',
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin user seeded (${adminEmail} / admin123)`);
  }

  // 3. Seed Technicians
  const techniciansData = [
    {
      name: 'Ramesh Patel',
      phone: '+91 98250 12345',
      email: 'ramesh.technician@laabhservices.com',
      skills: 'Split AC, Window AC, Piping Specialist',
      status: 'ACTIVE',
    },
    {
      name: 'Vikram Sharma',
      phone: '+91 98251 67890',
      email: 'vikram.technician@laabhservices.com',
      skills: 'Multi-brand Repair, Gas Refill, Electrical Troubleshooting',
      status: 'ACTIVE',
    },
    {
      name: 'Amit Verma',
      phone: '+91 98252 24680',
      email: 'amit.technician@laabhservices.com',
      skills: 'Concealed Copper Piping, Central HVAC, Maintenance',
      status: 'ACTIVE',
    },
  ];

  for (const tech of techniciansData) {
    const existing = await prisma.technician.findFirst({
      where: { phone: tech.phone },
    });
    if (!existing) {
      await prisma.technician.create({ data: tech });
    }
  }
  console.log('✅ Technicians seeded');

  // 4. Seed The 8 Official Services
  const officialServices = [
    {
      slug: 'ac-installation',
      name: 'AC Installation',
      shortDescription:
        'Professional installation of all brands and models of residential and commercial air conditioners.',
      fullDescription:
        'Our certified technicians provide complete end-to-end installation for all types and tonnages of air conditioning units. We ensure vibration-free wall mounting, airtight vacuuming, leak checks, precise copper line flaring, and electrical safety testing for maximum cooling efficiency and low energy consumption.',
      features: JSON.stringify([
        'Complete mounting of indoor and outdoor units with heavy-duty brackets',
        'Copper pipe connection with nitrogen pressure testing and vacuuming',
        'Core cutting and neat drain pipe layout without wall damage',
        'Post-installation cooling test, airflow calibration and amperage check',
      ]),
      faqs: JSON.stringify([
        {
          q: 'How long does a standard AC installation take?',
          a: 'Typically, a standard installation takes 90 to 120 minutes depending on wall thickness and piping distance.',
        },
        {
          q: 'Do you provide mounting brackets and hardware?',
          a: 'Yes, heavy-duty powder-coated outdoor brackets and fasteners are provided upon request or as configured by our technician.',
        },
      ]),
      startingPrice: null, // Admin configurable per requirement
      estimatedDuration: '90 - 120 mins',
      imageUrl: '/images/services/installation_in.jpg',
      icon: 'Wrench',
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: 'ac-fitting',
      name: 'AC Fitting',
      shortDescription:
        'Precision fitting and secure mounting services for indoor and outdoor air conditioner units.',
      fullDescription:
        'Need to remount, align, or secure your existing AC unit? Our fitting service guarantees structural stability, proper angle drainage to prevent indoor water dripping, acoustic vibration dampening, and reinforced outdoor stand anchor bolts.',
      features: JSON.stringify([
        'Structural alignment and spirit-level balance verification',
        'Vibration dampener pads installation to eliminate outdoor unit noise',
        'Drain pipe gradient calibration to prevent backflow and water dripping',
        'Outdoor unit safety bolting and bracket reinforcement',
      ]),
      faqs: JSON.stringify([
        {
          q: 'Can you refit an existing AC to a new room or wall position?',
          a: 'Yes, we handle complete refitting, re-aligning, and bracket anchoring for both indoor and outdoor units.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: '60 - 90 mins',
      imageUrl: '/images/services/fitting_in.jpg',
      icon: 'Tool',
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: 'ac-service',
      name: 'AC Service',
      shortDescription:
        'Deep jet-pump wet wash, cooling coil sanitization, filter cleaning, and complete performance tuning.',
      fullDescription:
        'Experience arctic-level airflow with our signature power-jet AC service. We use waterproof service jackets and high-pressure washers to flush out embedded allergens, dirt, mildew, and dust from the cooling evaporator coil, blower fan wheel, condenser fins, and drain tray.',
      features: JSON.stringify([
        'High-pressure jet pump wash with waterproof protection jacket',
        'Anti-bacterial coil sanitization and deodorizer treatment',
        'Blower wheel deep cleaning and drain line blockage clearance',
        'Air grill, dust filter, and condenser fins hydro-cleaning',
        'Cooling temperature and power consumption check',
      ]),
      faqs: JSON.stringify([
        {
          q: 'How frequently should an AC be serviced?',
          a: 'We recommend comprehensive jet servicing once every 3 to 4 months, especially before the peak summer season.',
        },
        {
          q: 'Will water spill on walls or furniture during servicing?',
          a: 'No. Our technicians use specialized waterproof catchment jackets and floor covers to prevent any spills.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: '45 - 60 mins',
      imageUrl: '/images/services/service_in.jpg',
      icon: 'Sparkles',
      isActive: true,
      sortOrder: 3,
    },
    {
      slug: 'ac-maintenance',
      name: 'AC Maintenance',
      shortDescription:
        'Comprehensive multi-point preventative maintenance, lubrication, refrigerant check, and health audit.',
      fullDescription:
        'Proactive preventative maintenance prevents expensive compressor breakdowns and extends the lifespan of your cooling system. Our comprehensive inspection covers refrigerant operating pressures, capacitor microfarad ratings, compressor thermal overload, fan motor bearings, and electrical terminals.',
      features: JSON.stringify([
        'Multi-point electrical inspection including contactors and capacitors',
        'Refrigerant pressure level measurement (Suction & Discharge psi)',
        'Fan motor bearing inspection and lubrication',
        'Thermostat calibration and PCB diagnostic scan',
        'Preventative health report with actionable recommendations',
      ]),
      faqs: JSON.stringify([
        {
          q: 'What is the difference between AC Service and AC Maintenance?',
          a: 'Service focuses primarily on deep cleaning the filters and cooling coils, while maintenance is a comprehensive technical diagnostic of electrical and mechanical components.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: '60 mins',
      imageUrl: '/images/services/maintenance_in.jpg',
      icon: 'ShieldCheck',
      isActive: true,
      sortOrder: 4,
    },
    {
      slug: 'ac-repair',
      name: 'AC Repair',
      shortDescription:
        'Fast and reliable troubleshooting for cooling loss, strange noises, PCB faults, gas leaks, and tripping.',
      fullDescription:
        'When your AC stops cooling or makes unusual sounds, our certified repair specialists diagnose the root cause with digital manifold gauges, multimeters, and leak detectors. We fix compressor tripping, capacitor failures, fan motor breakdowns, sensor faults, PCB relay errors, and copper pipe pinhole leaks.',
      features: JSON.stringify([
        'Rapid diagnostic inspection by veteran cooling technicians',
        'Refrigerant leak detection with electronic sensors and bubble test',
        'Compressor starting capacitor, PCB board, and fan motor repair',
        'Sensor replacement, wiring harness repair, and terminal re-crimping',
        'Warranty-backed repair solutions',
      ]),
      faqs: JSON.stringify([
        {
          q: 'Do you use genuine spare parts?',
          a: 'Yes, we use 100% brand-compatible, genuine OEM spare parts with technician warranty.',
        },
        {
          q: 'What if the AC stops cooling again after repair?',
          a: 'We provide post-repair service assurance to ensure your peace of mind.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: '60 - 120 mins',
      imageUrl: '/images/services/repair_in.jpg',
      icon: 'AlertCircle',
      isActive: true,
      sortOrder: 5,
    },
    {
      slug: 'concealed-ac-piping',
      name: 'Concealed AC Piping',
      shortDescription:
        'Seamless concealed copper piping, drainage layout, and pre-wiring for modern homes and commercial sites.',
      fullDescription:
        'Designed specifically for architectural aesthetics, renovations, and new construction projects. We install heavy-gauge 100% virgin copper pipes, closed-cell nitrile insulation tubing, power communication wiring, and PVC gravity drains hidden inside walls or false ceilings prior to plastering.',
      features: JSON.stringify([
        'Heavy-gauge seamless copper tubing (IS compliant) with brazing joints',
        'Class-O nitrile rubber thermal insulation to prevent condensation',
        'Wall chasing, masonry channel cutting, and durable pipe anchoring',
        'Nitrogen pressure hold test at 300+ PSI for 48 hours to certify zero leaks',
        'Concealed PVC condensate drainage with calculated slope',
      ]),
      faqs: JSON.stringify([
        {
          q: 'At what stage of home construction should concealed piping be done?',
          a: 'Concealed piping is ideally completed during brick masonry or plastering before final wall painting and false ceiling work.',
        },
        {
          q: 'How do you ensure the concealed pipes will never leak inside walls?',
          a: 'We pressurize every line with nitrogen at 300+ PSI and monitor the pressure gauge over 48 hours before plastering.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: 'Half / Full Day',
      imageUrl: '/images/services/piping.jpg',
      icon: 'Layers',
      isActive: true,
      sortOrder: 6,
    },
    {
      slug: 'split-ac-installation',
      name: 'Split AC Installation',
      shortDescription:
        'Dedicated installation for high-efficiency inverter and non-inverter split air conditioning systems.',
      fullDescription:
        'Split air conditioning requires exact vacuum levels and flared connections to prevent gas loss. Our specialists mount indoor backplates securely, bore neat core holes, route copper tubes and electrical cables through protective sleeves, securely anchor the condenser outdoors, and perform deep vacuuming prior to opening refrigerant valves.',
      features: JSON.stringify([
        'Precision mounting of indoor backplate with level check',
        'Outdoor unit placement on anti-rust stands or balcony bases',
        'High-grade copper flare connection and flare nut torque verification',
        'Deep two-stage vacuum pump operation to eliminate air and moisture',
        'Inverter PCB communication test and performance check',
      ]),
      faqs: JSON.stringify([
        {
          q: 'Why is vacuuming necessary for inverter split AC installation?',
          a: 'Vacuuming removes air and moisture from copper lines. Without it, R32/R410A refrigerants break down, resulting in high compressor pressure and reduced cooling.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: '90 - 120 mins',
      imageUrl: '/images/services/split_in.jpg',
      icon: 'Cpu',
      isActive: true,
      sortOrder: 7,
    },
    {
      slug: 'window-ac-installation',
      name: 'Window AC Installation',
      shortDescription:
        'Secure window frame fitting, wooden/metal frame sealing, and vibration-proof window AC setup.',
      fullDescription:
        'Window air conditioners require sturdy structural support and airtight perimeter weatherproofing to keep cool air in and street noise and rainwater out. We provide heavy-duty frame reinforcement, acoustic insulation, slight back-tilt angle calibration for condensation runoff, and dedicated power terminal connection.',
      features: JSON.stringify([
        'Sturdy wooden or iron frame mounting and leveling',
        'Slight rear tilt adjustment (1/4 inch) for smooth condensate runoff',
        'Perimeter insulation foam weatherstripping to stop outside heat & noise',
        'Security locking brackets to prevent exterior shifting or tampering',
        'Airflow test and high-amperage electrical plug inspection',
      ]),
      faqs: JSON.stringify([
        {
          q: 'Does the window AC require an iron bracket outside?',
          a: 'Yes, for walls without deep sills, an external iron bracket provides essential structural support for the heavy outdoor condenser section.',
        },
      ]),
      startingPrice: null,
      estimatedDuration: '60 - 90 mins',
      imageUrl: '/images/services/window_in.jpg',
      icon: 'Sliders',
      isActive: true,
      sortOrder: 8,
    },
  ];

  for (const s of officialServices) {
    const existing = await prisma.service.findUnique({
      where: { slug: s.slug },
    });
    if (!existing) {
      await prisma.service.create({
        data: s,
      });
      console.log(`✅ Seeded service: ${s.name}`);
    } else {
      await prisma.service.update({
        where: { slug: s.slug },
        data: {
          name: s.name,
          shortDescription: s.shortDescription,
          fullDescription: s.fullDescription,
          features: s.features,
          faqs: s.faqs,
          icon: s.icon,
          sortOrder: s.sortOrder,
          isActive: true,
        },
      });
      console.log(`🔄 Updated service: ${s.name}`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
