import { FAQItem } from '@/components/FAQAccordion';

export const ALL_FAQS: FAQItem[] = [
  // AC Jet Servicing
  {
    category: 'AC Servicing',
    q: 'How often should an AC be serviced in Ahmedabad?',
    a: 'Due to Ahmedabad’s high dust levels, summer temperatures exceeding 44°C, and winter pollution, we recommend deep hydro-jet servicing every 3 to 4 months. At minimum, a comprehensive service before the onset of summer (February/March) and a mid-monsoon coil check is essential to prevent compressor strain and high electricity bills.',
  },
  {
    category: 'AC Servicing',
    q: 'What is Power Jet / Hydro-Jet AC Cleaning and how is it different from normal cleaning?',
    a: 'Normal servicing only washes the front plastic mesh filters. Hydro-Jet cleaning uses a high-pressure motorized jet pump with an imported waterproof catchment jacket wrapped around the indoor unit. This flushes out hardened slime, fungus, pet dander, and deep dirt clogged inside the evaporator cooling fins, blower fan wheel, and condensate drain tray—restoring airflow by up to 35% without spilling a drop on your walls or furniture.',
  },
  {
    category: 'AC Servicing',
    q: 'Will high-pressure water damage the indoor AC cooling coils?',
    a: 'No. Our certified technicians calibrate the jet nozzle pressure specifically for aluminum and copper cooling fins (between 3 to 5 bar). We use precision angle sprays that straighten airflow paths rather than bending thin coil fins.',
  },
  {
    category: 'AC Servicing',
    q: 'Does AC servicing reduce electricity bills?',
    a: 'Yes, significantly. When the cooling coil and outdoor condenser are clogged with dirt, the compressor must run up to 40% longer to achieve your thermostat temperature, spiking power consumption. A clean unit cools rooms in half the time, typically cutting 15% to 25% off monthly AC energy consumption.',
  },

  // Installation & Piping
  {
    category: 'Installation & Fitting',
    q: 'What is included in your Split AC Installation service?',
    a: 'Our split AC installation includes: precision indoor backplate mounting with spirit-level calibration, core cutting through brick or concrete wall with protective sleeve, flared copper tubing connection, nitrogen vacuuming using a 2-stage pump, outdoor unit mounting on vibration-damped anti-rust brackets, electrical communication cable hookup, and airflow/temperature delta testing.',
  },
  {
    category: 'Installation & Fitting',
    q: 'Why is vacuum pump operation mandatory before opening inverter AC refrigerant valves?',
    a: 'Modern inverter air conditioners utilize high-pressure refrigerants like R32 and R410A with synthetic POE lubricant oils. Moisture or air remaining in the copper tubing reacts chemically to form acids that burn the compressor windings and cause premature PCB failure. We mandate deep vacuuming down to 500 microns on every installation to ensure optimal thermodynamic efficiency.',
  },
  {
    category: 'Installation & Fitting',
    q: 'At what stage of home construction should concealed AC piping be completed?',
    a: 'Concealed copper piping should be planned and installed during the masonry or brickwork phase, right before wall plastering and false ceiling execution. We route heavy-duty seamless copper tubes, class-O nitrile rubber insulation, communication wiring, and slope-calibrated PVC drain pipes inside chased wall grooves.',
  },
  {
    category: 'Installation & Fitting',
    q: 'How do you guarantee concealed copper pipes will never leak inside walls?',
    a: 'We subject every concealed copper loop to a 48-hour nitrogen pressure holding test at 350+ PSI. We seal and document the pressure gauge reading in front of the homeowner or site engineer before wall plastering begins.',
  },

  // AC Repairs & Cooling Issues
  {
    category: 'Repairs & Diagnostics',
    q: 'Why is my AC running but blowing warm or room-temperature air?',
    a: 'Warm airflow is usually caused by: (1) low refrigerant level due to a pinhole copper leak, (2) a faulty starting or running capacitor preventing the outdoor compressor from starting, (3) a tripped thermal overload protector due to extreme ambient heat, or (4) a blown inverter PCB circuit. Our technicians use digital multimeters and manifold gauges to pinpoint the exact component failure.',
  },
  {
    category: 'Repairs & Diagnostics',
    q: 'Why is water leaking from my indoor AC unit onto the floor?',
    a: 'Indoor water leakage occurs when the condensate drain pipe is choked with bacterial sludge or dust algae, the indoor unit has lost its slight drainage slope, or ice is forming on the evaporator coils due to low gas pressure and melting abruptly. Our technicians clear drain clogs with pressurized air/water and restore proper leveling.',
  },
  {
    category: 'Repairs & Diagnostics',
    q: 'What types of refrigerant gases do you refill and how do you test for leaks?',
    a: 'We stock virgin, certified R32, R410A, and R22 refrigerants. We never top-up gas blindly without finding the leak first. We pressurize the line with nitrogen, use electronic halogen detectors and liquid bubble solutions to weld or seal the micro-leak, vacuum the lines, and recharge exact weight of refrigerant as per OEM manufacturer specs using digital charging scales.',
  },
  {
    category: 'Repairs & Diagnostics',
    q: 'Can you repair Inverter AC PCB circuit boards?',
    a: 'Yes. Our specialized electronics team diagnoses outdoor and indoor inverter PCB faults, IPM IGBT module breakdowns, communication error codes (E1, E6, F3, etc.), and replaces damaged capacitors and relays rather than forcing costly complete board replacements.',
  },

  // Pricing & Guarantee
  {
    category: 'Pricing & Guarantee',
    q: 'What is your 30-Day Post-Service Guarantee?',
    a: 'Every repair and servicing job executed by Labh AC Services comes with our 30-day peace of mind guarantee. If the exact same issue re-occurs within 30 days of service, our technician will re-inspect and fix it with zero inspection or labor charges.',
  },
  {
    category: 'Pricing & Guarantee',
    q: 'Are your service charges fixed and transparent?',
    a: 'Yes. We follow a standardized rate card. The technician provides an upfront diagnostic estimate before beginning any repair work or replacing parts. You will never encounter hidden fees, and all invoices are logged digitally with WhatsApp receipts.',
  },
  {
    category: 'Pricing & Guarantee',
    q: 'Do you provide genuine OEM spare parts?',
    a: 'Yes. We exclusively supply 100% brand-compatible, genuine copper coils, heavy-duty starting capacitors, fan motors, PCB components, and remote controllers with vendor warranty.',
  },

  // Booking & Service Coverage
  {
    category: 'Booking & Areas',
    q: 'Which areas in Ahmedabad and Gandhinagar do you serve?',
    a: 'We cover all key residential and commercial hubs across Ahmedabad and Gandhinagar, including Bodakdev, Satellite, SG Highway, Prahlad Nagar, Vastrapur, Bopal, South Bopal, Thaltej, Navrangpura, Naranpura, Chandkheda, Gota, Motera, Shela, Science City Road, Paldi, Maninagar, and Gandhinagar Infocity / GIFT City.',
  },
  {
    category: 'Booking & Areas',
    q: 'How fast can a technician reach my doorstep in an emergency?',
    a: 'For urgent cooling breakdown requests, our mobile technician units reach within 60 to 90 minutes across Western and Central Ahmedabad. You can track your booking status online or call our priority hotline directly.',
  },
  {
    category: 'Booking & Areas',
    q: 'Can I book service online and get updates on WhatsApp?',
    a: 'Yes! Our booking system sends instant WhatsApp confirmation receipts with booking reference numbers, technician dispatch notices, arrival alerts, and invoice summaries directly to your phone.',
  },
];

export const HOMEPAGE_TOP_FAQS: FAQItem[] = ALL_FAQS.slice(0, 6);
