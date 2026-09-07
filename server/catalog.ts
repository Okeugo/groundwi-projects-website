/**
 * Groundwi Projects - Engineering Services & Project Catalog
 * Backend Data & Parametric Estimation Engine
 */

export interface EngineeringService {
  id: string;
  slug: string;
  title: string;
  category: 'Geophysics' | 'Geotechnical' | 'GIS & Geospatial' | 'Hydrogeology' | 'Environmental' | 'Marine';
  shortDescription: string;
  fullDescription: string;
  standards: string[];
  equipment: string[];
  deliverables: string[];
  typicalTurnaroundDays: number;
  investigationMode: 'geophysics' | 'geotechnical' | 'both';
}

export interface PortfolioProject {
  id: string;
  title: string;
  clientSector: string;
  location: string;
  coordinates: [number, number];
  acreage: number;
  investigationMode: 'geophysics' | 'geotechnical' | 'both';
  disciplines: string[];
  geologicalChallenge: string;
  solutionOutcome: string;
  completedYear: number;
}

export const ENGINEERING_SERVICES: EngineeringService[] = [
  {
    id: 'srv-01',
    slug: 'geophysical-subsurface-profiling',
    title: 'Geophysical Subsurface Profiling',
    category: 'Geophysics',
    shortDescription: 'Multi-electrode Electrical Resistivity Tomography (ERT), Ground Penetrating Radar (GPR), and Seismic Refraction/MASW.',
    fullDescription: 'High-density non-destructive subsurface mapping that identifies continuous bedrock topography, fault lines, shear zones, sinkhole cavities, and buried utilities before costly drilling begins.',
    standards: ['ASTM D6431', 'ASTM D6429', 'ASTM D5777', 'BS 5930 Section 2'],
    equipment: ['Iris Instruments Syscal Pro 72-channel ERT', 'Mala ProEx dual-frequency GPR', 'Geometrics Geode 24-channel Seismograph'],
    deliverables: ['2D/3D Electrical Resistivity Models', 'Seismic Vs30 Soil Stiffness Profiles', 'GPR Cavity & Utility Vector Maps', 'Interpreted Geo-structural Sections'],
    typicalTurnaroundDays: 5,
    investigationMode: 'geophysics'
  },
  {
    id: 'srv-02',
    slug: 'geotechnical-soil-rock-mechanics',
    title: 'Geotechnical Soil & Rock Mechanics',
    category: 'Geotechnical',
    shortDescription: 'Continuous rotary core drilling, piezocone penetration (CPTu), SPT sampling, and comprehensive laboratory testing.',
    fullDescription: 'Definitive direct ground sampling and in-situ strength characterization for deep foundation design, bearing capacity calculation, slope stability analysis, and liquefaction assessment.',
    standards: ['ASTM D1586 (SPT)', 'ASTM D5778 (CPTu)', 'ASTM D2113 (Core Drilling)', 'Eurocode 7 EN 1997-2'],
    equipment: ['Geoprobe 7822DT Rotary/Sonic Rig', 'Pagani TG63-150 Tracked CPTu Unit', 'HQ/NQ Diamond Wireline Core Barrels'],
    deliverables: ['AGS / gINT Borehole Logs', 'CPTu Tip Resistance (qc) & Pore Pressure (u2) Logs', 'Foundation Bearing Capacity Calculation Memo', 'Consolidation & Settlement Prognosis'],
    typicalTurnaroundDays: 10,
    investigationMode: 'geotechnical'
  },
  {
    id: 'srv-03',
    slug: 'gis-digital-twin-fusion',
    title: 'GIS & Subsurface Digital Twin',
    category: 'GIS & Geospatial',
    shortDescription: 'One Document spatial database synchronizing geophysical inversions, borehole logs, and structural CAD designs.',
    fullDescription: 'Enterprise spatial platform harmonizing disparate ground investigations into a single geodetic coordinate system. Enables structural designers to preview borehole logs directly against BIM foundation models.',
    standards: ['OGC GeoPackage Standard', 'ISO 19115 Geospatial Metadata', 'Autodesk Civil 3D LandXML Spec', 'Esri Geodatabase Spec'],
    equipment: ['Groundwi Cloud GIS Platform', 'ArcGIS Enterprise Subsurface 3D', 'Bentley Leapfrog Geo 3D Implicit Modeler'],
    deliverables: ['Cloud Web GIS Interactive Portal', '3D Geological Stratigraphy Voxel Mesh', 'Civil 3D Surface LandXML', 'Revit IFC Structural Foundation Overlays'],
    typicalTurnaroundDays: 3,
    investigationMode: 'both'
  },
  {
    id: 'srv-05',
    slug: 'marine-coastal-investigations',
    title: 'Marine & Nearshore Coastal Geotechnics',
    category: 'Marine',
    shortDescription: 'Sub-bottom profiling, side-scan sonar, multibeam bathymetry, and shallow water jack-up barge geotechnical boreholes.',
    fullDescription: 'Specialized nearshore investigation for port expansions, submarine cable landfalls, jetty foundations, and offshore renewable energy substations.',
    standards: ['IHO S-44 Hydrographic Survey Standards', 'DNVGL-ST-0145 Offshore Geotechnics', 'ASTM D6032'],
    equipment: ['Edgetech 3100 Chirp Sub-bottom Profiler', 'Reson SeaBat T50 Multibeam Sonar', 'Self-propelled 20m Modular Jack-up Platform'],
    deliverables: ['High-resolution Bathymetric Surface (0.1m grid)', 'Seafloor Morphology & Obstruction Chart', 'Sub-bottom Sediment Layer Thickness Profiles', 'Marine Borehole Logs & Core Photos'],
    typicalTurnaroundDays: 14,
    investigationMode: 'both'
  },
  {
    id: 'srv-06',
    slug: 'environmental-baseline-eia',
    title: 'Environmental Baseline & Soil Contamination',
    category: 'Environmental',
    shortDescription: 'Phase I/II ESA site assessments, soil vapor screening, groundwater contamination plumes, and ecological buffer integration.',
    fullDescription: 'Rigorous environmental due diligence identifying heavy metals, hydrocarbons, VOCs, and groundwater contamination before parcel purchase or earthwork commencement.',
    standards: ['ASTM E1527-21 (Phase I ESA)', 'ASTM E1903-19 (Phase II ESA)', 'EPA Compendium of Environmental Methods'],
    equipment: ['Photoionization Detectors (PID)', 'Low-flow peristaltic sampling pumps', 'Certified ISO 17025 Analytical Lab Network'],
    deliverables: ['Phase I Environmental Site Assessment Report', 'Chemical Contaminant Heatmap in Web GIS', 'Remediation Action Plan & Excavation Limits', 'Environmental Compliance Clearance'],
    typicalTurnaroundDays: 8,
    investigationMode: 'both'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-01',
    title: 'Cross-Basin Rail Corridor Alignment',
    clientSector: 'High-Speed Transport & Rail',
    location: 'Central Rift Valley & Mountain Pass',
    coordinates: [-0.3031, 36.0800],
    acreage: 240,
    investigationMode: 'both',
    disciplines: ['ERT Resistivity Profiling', 'Sonic Core Drilling', 'Seismic Refraction', 'Web GIS'],
    geologicalChallenge: 'Undetected volcanic fault zones and concealed lava tubes beneath superficial ash beds threatening rail embankment stability.',
    solutionOutcome: 'Discovered 4 major concealed cavities prior to bridge pier positioning, preventing catastrophic settlement and saving $4.2M in rework.',
    completedYear: 2025
  },
  {
    id: 'proj-02',
    title: 'Coastal Liquefaction & Port Expansion',
    clientSector: 'Maritime & Marine Infrastructure',
    location: 'Deepwater Container Terminal Basin',
    coordinates: [4.0435, 39.6682],
    acreage: 85,
    investigationMode: 'both',
    disciplines: ['Seismic CPTu Soundings', 'Multibeam Bathymetry', 'Sub-bottom Profiling', 'Triaxial Testing'],
    geologicalChallenge: 'Thick soft marine clays interbedded with loose saturated silt prone to seismic liquefaction under gantry crane loads.',
    solutionOutcome: 'Accurate CPTu pore pressure dissipation modeling reduced required ground improvement stone columns by 28% while verifying safety factors.',
    completedYear: 2024
  },
  {
    id: 'proj-03',
    title: '250MW Solar Photovoltaic & BESS Facility',
    clientSector: 'Renewable Clean Energy',
    location: 'Arid Sedimentary Plateau',
    coordinates: [1.7500, 37.8500],
    acreage: 420,
    investigationMode: 'both',
    disciplines: ['GPR Bedrock Mapping', 'Thermal Resistivity Testing', 'Plate Load Testing', 'Borehole Drilling'],
    geologicalChallenge: 'Shallow caliche hardpans causing premature refusal of driven tracker piles and variable soil thermal conductivity for high-voltage cables.',
    solutionOutcome: 'Continuous GPR mapping optimized pile embedment depths across 65,000 tracker posts, preventing 900+ equipment refusal incidents.',
    completedYear: 2025
  },
  {
    id: 'proj-04',
    title: 'Regional Logistics Hub & Warehousing Park',
    clientSector: 'Industrial & Commercial Real Estate',
    location: 'Former Alluvial Floodplain',
    coordinates: [-1.2921, 36.8219],
    acreage: 65,
    investigationMode: 'both',
    disciplines: ['Continuous ERT Lines', 'Piezocone CPTu', 'Digital Twin'],
    geologicalChallenge: 'High seasonal water table with differential settlement risk under 12-ton heavy forklift floor loading.',
    solutionOutcome: 'Integrated geophysical-geotechnical model delineated pre-load surcharge boundaries and positioned continuous dewatering perimeter wells.',
    completedYear: 2025
  }
];

/**
 * Parametric Scope Estimation Engine
 * Calculates recommended investigation parameters based on Eurocode 7 / ASTM D420
 */
export function calculateParametricEstimate(params: {
  acreage: number;
  investigationMode: 'geophysics' | 'geotechnical' | 'both';
  targetDepthMeters?: number;
  terrainComplexity?: 'flat' | 'undulating' | 'mountainous' | 'coastal_swamp';
  expectedSoilType?: 'alluvial_clay' | 'weathered_granite' | 'karst_limestone' | 'fill';
}) {
  const acreage = Math.max(1, Number(params.acreage) || 10);
  const targetDepth = Math.max(5, Math.min(150, Number(params.targetDepthMeters) || 25));
  const mode = params.investigationMode || 'both';
  const terrain = params.terrainComplexity || 'undulating';

  // Terrain difficulty factor
  const terrainFactor = terrain === 'mountainous' ? 1.4 : terrain === 'coastal_swamp' ? 1.35 : terrain === 'undulating' ? 1.15 : 1.0;

  // Borehole calculation (Eurocode 7 / ASTM grid rule of thumb)
  let recommendedBoreholes = 0;
  if (mode === 'geotechnical' || mode === 'both') {
    if (acreage <= 2) {
      recommendedBoreholes = Math.max(3, Math.round(acreage * 2));
    } else if (acreage <= 10) {
      recommendedBoreholes = Math.round(3 + (acreage - 2) * 0.75);
    } else if (acreage <= 50) {
      recommendedBoreholes = Math.round(9 + (acreage - 10) * 0.35);
    } else {
      recommendedBoreholes = Math.round(23 + (acreage - 50) * 0.15);
    }
  }

  // Geophysical profile length calculation
  let recommendedErtProfilesKm = 0;
  let recommendedGprKm = 0;
  if (mode === 'geophysics' || mode === 'both') {
    // 2D ERT profile km based on acreage square root perimeter
    const approxSideKm = Math.sqrt(acreage * 4046.86) / 1000;
    recommendedErtProfilesKm = Number(Math.max(0.6, approxSideKm * 3.2).toFixed(2));
    recommendedGprKm = Number(Math.max(1.0, approxSideKm * 5.0).toFixed(2));
  }

  // In-situ tests calculation
  const sptTestsEstimated = recommendedBoreholes * Math.floor(targetDepth / 1.5);
  const cptuSoundings = mode === 'both' ? Math.max(2, Math.round(recommendedBoreholes * 0.6)) : (mode === 'geotechnical' ? recommendedBoreholes : 0);

  // Field duration in days
  const drillingDays = Math.ceil((recommendedBoreholes * targetDepth) / 18); // ~18m/day production rate
  const geophysicsDays = Math.ceil(recommendedErtProfilesKm / 0.8); // ~800m/day production rate
  const fieldDaysTotal = Math.max(3, Math.ceil(Math.max(drillingDays, geophysicsDays * 0.8) * terrainFactor));

  // Deliverables timeline
  const preliminaryMemoHours = 48;
  const labTestingDays = mode === 'geophysics' ? 0 : 7;
  const finalReportDays = fieldDaysTotal + labTestingDays + 5;

  // Recommended crew mobilization
  const crewMembers = mode === 'both' ? 6 : (mode === 'geotechnical' ? 4 : 3);
  const keyPersonnel = [
    'Lead Geotechnical Engineer (PE/CEng)',
    'Senior Exploration Geophysicist',
    'Licensed Drilling Supervisor',
    'GIS Database Specialist'
  ].slice(0, crewMembers);

  return {
    inputs: {
      acreage,
      targetDepthMeters: targetDepth,
      investigationMode: mode,
      terrainComplexity: terrain
    },
    recommendations: {
      boreholesCount: recommendedBoreholes,
      totalDrillingMeters: recommendedBoreholes * targetDepth,
      sptStandardPenetrationTests: sptTestsEstimated,
      cptuPiezoconeSoundings: cptuSoundings,
      ertResistivityProfileKm: recommendedErtProfilesKm,
      gprContinuousKm: recommendedGprKm,
      estimatedFieldDurationDays: fieldDaysTotal,
      crewSize: crewMembers,
      crewKeyPersonnel: keyPersonnel
    },
    deliverablesTimeline: {
      preliminaryDeskStudyMemo: `${preliminaryMemoHours} hours from mobilization`,
      interimStratigraphyDraft: `${fieldDaysTotal + 2} days`,
      finalUnifiedReportAndGisModel: `${finalReportDays} days`
    },
    complianceStandards: [
      'ASTM D420 / D1586 (Drilling & SPT)',
      'ASTM D6431 / D5777 (Geophysical Subsurface)',
      'Eurocode 7 EN 1997-2 Ground Investigation and Testing',
      'OGC Web GIS Spatial Delivery'
    ]
  };
}
