export interface Partner {
  id: string;
  name: string;
  category: 'geophysics' | 'geotech' | 'water' | 'software' | 'laboratories';
  categoryLabel: string;
  tier: string;
  location: string;
  description: string;
  deployedAssets: string[];
  standards: string[];
  integrationType: string;
  featured?: boolean;
}

export const PARTNER_CATEGORIES = [
  { id: 'all', label: 'All Partners' },
  { id: 'geophysics', label: 'Geophysical & Survey Instrumentation' },
  { id: 'geotech', label: 'Geotechnical & Drilling Rigs' },
  { id: 'water', label: 'Water & Solar Pumping OEMs' },
  { id: 'software', label: 'GIS & Modeling Software' },
  { id: 'laboratories', label: 'Accredited Lab Alliances' }
] as const;

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'iris-instruments',
    name: 'IRIS Instruments',
    category: 'geophysics',
    categoryLabel: 'Geophysical Instrumentation',
    tier: 'Tier 1 OEM Hardware Partner',
    location: 'Orléans, France',
    description: 'World benchmark manufacturer of electrical resistivity tomography (ERT), induced polarization, and electromagnetic geophysical exploration instrumentation.',
    deployedAssets: [
      'Syscal Pro 72-Electrode High-Resolution Resistivity Meter',
      'FullWaver Distributed Wireless Inversion Nodes',
      'V-FullWaver 3D Resistivity Inversion Systems'
    ],
    standards: ['ASTM D6431', 'ASTM D6429', 'Eurocode 7'],
    integrationType: 'OEM Factory Calibration & Direct Inversion Sync',
    featured: true
  },
  {
    id: 'pagani-geotechnical',
    name: 'Pagani Geotechnical Equipment',
    category: 'geotech',
    categoryLabel: 'In-Situ Geotechnical Rigs',
    tier: 'Certified Drilling & Penetration Partner',
    location: 'Piacenza, Italy',
    description: 'Precision Italian manufacturers of continuous static-dynamic cone penetration testing (CPT / CPTu) crawler rigs and soil sampling solutions.',
    deployedAssets: [
      'TG63-150 Self-Propelled Hydraulic Tracked CPTu Rigs',
      'Electronic Piezocone (CPTu) Pore Pressure Probes',
      'Continuous Undisturbed Piston Core Soil Samplers'
    ],
    standards: ['ASTM D5778', 'ISO 22476-1', 'BS 1377-9'],
    integrationType: 'Direct Digital Field Logger Integration',
    featured: true
  },
  {
    id: 'grundfos',
    name: 'Grundfos Water Systems',
    category: 'water',
    categoryLabel: 'Submersible Pumping Solutions',
    tier: 'Authorized Groundwater Solutions Partner',
    location: 'Bjerringbro, Denmark',
    description: 'Global pioneer in high-efficiency stainless-steel submersible pumps, solar groundwater extraction, and automated telemetry pump controls.',
    deployedAssets: [
      'SP Series 4-inch & 6-inch Heavy Stainless Submersible Pumps',
      'SQFlex Solar MPPT Submersible Pumping Packages',
      'CU301 Constant Pressure & Intelligent Dry-Run Regulators'
    ],
    standards: ['ISO 9906 Grade 1', 'BS 6316', 'WHO Potability'],
    integrationType: 'Direct Engineering Supply & OEM Warranty',
    featured: true
  },
  {
    id: 'lorentz',
    name: 'Lorentz Solar Water Pumps',
    category: 'water',
    categoryLabel: 'Off-Grid Solar Hydrogeology',
    tier: 'Solar MPPT Integration Specialist',
    location: 'Henstedt-Ulzburg, Germany',
    description: 'Pioneering German engineering firm specialized in brushless DC solar-powered submersible pumps for deep borehole abstraction and irrigation.',
    deployedAssets: [
      'PS2 Centrifugal & Helical Rotor Submersible Systems',
      'SunSensor Photovoltaic Yield Tracking Controllers',
      'Lorentz PumpScanner Remote Telemetry Units'
    ],
    standards: ['IEC 61215', 'ISO 9001', 'ASTM Water Standards'],
    integrationType: 'Turnkey Commercial & Municipal Deployment',
    featured: false
  },
  {
    id: 'leica-geosystems',
    name: 'Leica Geosystems',
    category: 'geophysics',
    categoryLabel: 'Spatial Positioning & Topography',
    tier: 'Precision Geomatics Partner',
    location: 'Heerbrugg, Switzerland',
    description: 'Industry standard for sub-centimeter RTK GNSS field receivers, high-speed robotic total stations, and LiDAR scanning for terrain modeling.',
    deployedAssets: [
      'GS18 T Tilt-Compensating GNSS Smart Antennas',
      'TS16 Robotic Total Stations with Automagic Target Aiming',
      'BLK2GO Handheld Mobile 3D LiDAR Imaging Scanners'
    ],
    standards: ['ISO 17123', 'RTCM 3.2', 'RICS Survey Standards'],
    integrationType: 'Direct Cloud Coordinate & BIM Integration',
    featured: true
  },
  {
    id: 'mala-gssi',
    name: 'Guideline Geo (MALÅ) & GSSI',
    category: 'geophysics',
    categoryLabel: 'Ground Penetrating Radar',
    tier: 'Subsurface Utility & GPR Alliance',
    location: 'Umeå, Sweden / Nashua, USA',
    description: 'Specialized deep and high-frequency GPR systems for non-invasive utility identification, void detection, and stratigraphy mapping.',
    deployedAssets: [
      'MALÅ GroundExplorer (GX) Multi-Frequency Array',
      'GSSI StructureScan Mini XT High-Resolution Radar',
      'Borehole Radar Transceivers for Fractured Rock Imaging'
    ],
    standards: ['ASTM D6432', 'ASCE 38-02 Level A Utility Quality'],
    integrationType: 'Continuous GPR Profiling & Subsurface Fusion',
    featured: false
  },
  {
    id: 'esri-arcgis',
    name: 'Esri ArcGIS Platform',
    category: 'software',
    categoryLabel: 'Spatial Digital Twins & GIS',
    tier: 'Enterprise Spatial Solutions Partner',
    location: 'Redlands, California, USA',
    description: 'Global market leader in GIS software, spatial data infrastructure, 3D underground geodatabases, and field inspection automation.',
    deployedAssets: [
      'ArcGIS Pro Subsurface 3D Voxel Layer Engine',
      'ArcGIS Field Maps Real-Time Sync & Telemetry',
      'ArcGIS Online Web Scene Services for Client Portals'
    ],
    standards: ['OGC Standards', 'ISO 19115 Metadata', 'GeoTIFF'],
    integrationType: 'Enterprise Cloud Digital Twin Architecture',
    featured: true
  },
  {
    id: 'seequent-leapfrog',
    name: 'Seequent (Bentley Systems)',
    category: 'software',
    categoryLabel: '3D Geological Implicit Modeling',
    tier: 'Subsurface 3D Modeling Partner',
    location: 'Christchurch, New Zealand',
    description: 'Developer of Leapfrog Geo, the industry gold standard for rapid implicit 3D geological modeling, lithology domaining, and stratigraphic interpolation.',
    deployedAssets: [
      'Leapfrog Geo 3D Structural Modeling Suite',
      'Central Subsurface Version Control & Audit Trail',
      'Leapfrog View Collaborative Web-Based 3D Visualizer'
    ],
    standards: ['JORC / NI 43-101 Compliant', 'Eurocode 7'],
    integrationType: 'Automated Borehole & ERT Mesh Generation',
    featured: false
  },
  {
    id: 'iso-geotech-labs',
    name: 'Alliance of ISO/IEC 17025 Geotechnical Labs',
    category: 'laboratories',
    categoryLabel: 'Accredited Soil & Rock Mechanics',
    tier: 'Certified Testing Laboratory Network',
    location: 'UKAS / SANAS / COFRAC Accredited Facilities',
    description: 'Network of independently accredited civil engineering laboratories providing verified triaxial compression, direct shear, consolidation, and Atterberg limits.',
    deployedAssets: [
      'GDS Automated Stress-Path Triaxial Cells',
      'Oedometer Consolidation Test Rigs with Piezometer Readings',
      'Rock Point-Load & Unconfined Compressive Strength (UCS) Presses'
    ],
    standards: ['ISO/IEC 17025', 'ASTM D2850', 'BS 1377 Part 1-9'],
    integrationType: 'Verified Chain of Custody & Digitized Lab Reports',
    featured: true
  },
  {
    id: 'hydrochemical-lab',
    name: 'GeoChem Water Potability & Environmental Labs',
    category: 'laboratories',
    categoryLabel: 'Hydrochemistry & Environmental Testing',
    tier: 'Accredited Environmental Testing Facility',
    location: 'Regional Testing Hubs',
    description: 'Specialized chemical and microbiological water laboratories certified for heavy metals, trace anions, hydrocarbons, coliform counts, and WHO potability metrics.',
    deployedAssets: [
      'Inductively Coupled Plasma Mass Spectrometry (ICP-MS)',
      'Ion Chromatography & Spectrophotometry Suites',
      'Microbiological Membrane Filtration & Incubation Units'
    ],
    standards: ['ISO/IEC 17025', 'WHO Guidelines for Drinking-Water Quality', 'EPA 200.8'],
    integrationType: 'Rapid 48h Certified Potability Certificates',
    featured: false
  }
];
