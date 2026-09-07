import { ServiceOffering } from '../types';

export const SERVICES_DATA: ServiceOffering[] = [
  {
    id: 'geophysical-profiling',
    title: 'Geophysical Subsurface Profiling',
    shortTag: 'Geophysics',
    tagline: 'Non-invasive continuous subsurface imaging before breaking ground',
    description: 'Continuous, non-destructive imaging of subsurface strata, bedrock topology, void anomalies, and groundwater tables before heavy excavation begins. Bridges the blind gaps between discrete exploratory boreholes.',
    modes: ['desk-study', 'field-investigation', 'both'],
    keyCapabilities: [
      'Continuous 2D/3D Bedrock Horizon & Weathered Rock Mapping',
      'Subsurface Anomaly & Buried Void / Karst Cavity Detection',
      'Buried Utilities, Paleochannels, & Obstruction Delineation',
      'Soil Corrosivity, Resistivity Earthing, & Aquifer Depth Surveys'
    ],
    equipmentAndMethods: [
      'Multi-Electrode Electrical Resistivity Tomography (ERT - Terrameter / Syscal)',
      'Ground Penetrating Radar (GPR - 100MHz to 900MHz Dual Frequency)',
      'Multi-Channel Analysis of Surface Waves (MASW) for shear wave velocity (Vs30)',
      'Seismic Refraction & High-Resolution Frequency Domain EM (FDEM)'
    ],
    applicableStandards: [
      'ASTM D6431 (Direct Current Resistivity)',
      'ASTM D6429 (Selecting Surface Geophysical Methods)',
      'BS 5930 (Code of Practice for Ground Investigations)',
      'Eurocode 7 (EN 1997-2 Subsurface Characterization)'
    ],
    deliverables: [
      '2D/3D Electrical Resistivity Cross-Sections (Ohm-m inverted profiles)',
      'Depth-to-Bedrock Isopach & Contour Maps (GeoTIFF / CAD)',
      'Vs30 Seismic Profile & IBC/Eurocode Seismic Site Classification',
      'Subsurface Anomaly CAD Polygons ready for GIS/BIM integration'
    ],
    icon: 'Activity',
    riskMitigated: 'Prevents unexpected bedrock pinnacles, hidden sinkholes, or unmapped boulders that trigger pile refusal and multimillion-dollar rework delays.'
  },
  {
    id: 'geotechnical-soil-testing',
    title: 'Geotechnical Soil Testing',
    shortTag: 'Geotechnical',
    tagline: 'Defensible foundation parameters derived through in-situ & laboratory rigor',
    description: 'Comprehensive geotechnical characterization measuring soil bearing capacity, settlement rates, shear strength, and liquefaction potential through in-situ dynamic probing and certified lab mechanics.',
    modes: ['desk-study', 'field-investigation', 'both'],
    keyCapabilities: [
      'Standard Penetration Testing (SPT) with automatic trip hammer calibration',
      'Continuous Piezocone Penetration Testing (CPTu) with pore pressure dissipation',
      'Rotary & Sonic Core Drilling with continuous rock core recovery (RQD/TCR)',
      'Laboratory Soil Mechanics (Triaxial shear, Atterberg limits, consolidation)'
    ],
    equipmentAndMethods: [
      'Track-Mounted Pagani & Geomil CPTu Rigs (100kN - 200kN thrust)',
      'Rotary Core Drill Rigs (HQ / NQ wireline coring with split spoon samplers)',
      'Oedometer / Consolidation Chambers, Direct Shear & Triaxial (UU/CU/CD) frames',
      'Static Plate Load Testing (PLT) & Dynamic Cone Penetrometer (DCP)'
    ],
    applicableStandards: [
      'ASTM D1586 (Standard Penetration Test & Split-Barrel Sampling)',
      'ASTM D5778 (Electronic Friction Cone and Piezocone Penetration)',
      'BS 1377 (Methods of Test for Soils for Civil Engineering Purposes)',
      'Eurocode 7 / ISO 22476 Series (Geotechnical Investigation and Testing)'
    ],
    deliverables: [
      'Certified AGS / gINT Borehole Logs & CPTu Continuous Data Logs',
      'Allowable & Ultimate Bearing Capacity Calculations for Shallow & Deep Piles',
      'Settlement Profile Predictions (Elastic & Consolidation vs Load)',
      'Comprehensive Geotechnical Interpretative Report (GIR) with safety factors'
    ],
    icon: 'Layers',
    riskMitigated: 'Eliminates structural foundation failure, differential settlement, pile length miscalculations, and contractor claims for differing site conditions.'
  },
  {
    id: 'environmental-impact-assessment',
    title: 'Environmental Impact Assessment (EIA)',
    shortTag: 'Environmental',
    tagline: 'Statutory compliance baseline studies and ecological-hydrological protection',
    description: 'Rigorous baseline environmental documentation meeting national and municipal statutory authorities. Combines flora/fauna ecological surveys, hydrological modeling, and contaminant screening.',
    modes: ['desk-study', 'field-investigation', 'both'],
    keyCapabilities: [
      'Ecological Flora & Fauna Biodiversity Baseline Inventories',
      'Surface & Groundwater Hydrology, Catchment Infiltration & Water Quality Testing',
      'Phase I Environmental Site Assessment (ESA) & Phase II Contamination Screening',
      'Noise, Vibration, Dust, and Air Quality Ambient Baseline Monitoring'
    ],
    equipmentAndMethods: [
      'Multi-Parameter Water Quality Sondes (YSI ProDSS - pH, EC, DO, Turbidity)',
      'Low-flow groundwater sampling pumps with dedicated monitoring piezometers',
      'Type 1 Sound Level Meters (Class 1 compliant) & Continuous Particulate Counters',
      'Infrared Wildlife Camera Traps & GPS-tagged Botanical Line Intercept Transects'
    ],
    applicableStandards: [
      'EPA / NEPA Guidelines & International Finance Corporation (IFC) Performance Standard 6',
      'ASTM E1527-21 (Phase I Environmental Site Assessment Standard)',
      'ISO 14001 Environmental Management Documentation',
      'Local Statutory Environmental Protection Agency Guidelines'
    ],
    deliverables: [
      'Statutory EIA Baseline Report & Environmental Management Plan (EMP)',
      'Ecological Sensitivity Mapping with Protected Habitat Buffer Zones',
      'Groundwater Hydrogeological Conceptual Model (HCM)',
      'Phase I/II ESA Environmental Clearances for Bank Financing & Permitting'
    ],
    icon: 'ShieldCheck',
    riskMitigated: 'Prevents environmental regulatory shutdowns, public consultation injunctions, protected species habitat fines, and unexpected soil remediation liabilities.'
  },
  {
    id: 'geological-mapping',
    title: 'Geological Field Mapping',
    shortTag: 'Geology',
    tagline: 'Surface structural logging, rock unit classification, and slope stability',
    description: 'Specialized field mapping and structural/lithological assessments to evaluate surface geology, rock mass classification (RMR/Q-system), and fault discontinuity regimes governing slope and foundation integrity.',
    modes: ['desk-study', 'field-investigation', 'both'],
    keyCapabilities: [
      'Outcrop Structural Logging (Dip, dip-direction, strike, joint persistence & spacing)',
      'Lithological Classification & Stratigraphic Correlation across project extents',
      'Kinematic Slope Stability Assessment (Planar, wedge, and toppling failures)',
      'Fault Trace Identification & Active Tectonic Lineament Delineation'
    ],
    equipmentAndMethods: [
      'Freiberger & Brunton Geological Compasses & Digital Clino Clinometers',
      'Schmidt Rebound Hammers (L-type & N-type for in-situ rock hardness testing)',
      'High-Resolution Handheld XRF for Mineralogical Litho-Geochemistry',
      'Stereonet Dips Analysis Software (Rocscience Dips & Kinematic Plots)'
    ],
    applicableStandards: [
      'ISRM (International Society for Rock Mechanics) Suggested Methods',
      'Bieniawski Rock Mass Rating (RMR) & Barton Q-System Guidelines',
      'ASTM D5878 (Standard Guides for Using Rock-Mass Classification Systems)'
    ],
    deliverables: [
      '1:5,000 to 1:500 High-Precision Geological Field Map with structural symbols',
      'Stereographic Projection Kinematic Stereonets for Cut Slopes & Portals',
      'Rock Mass Characterization (GSI, RMR89, Q) for tunnel and bench design',
      'Geological Hazard Risk Register identifying fault gouges and slip zones'
    ],
    icon: 'Mountain',
    riskMitigated: 'Prevents catastrophic slope failures, rockfalls, unpredicted rock hardness tool wear, and tunnel crown collapse along unmapped geological fault planes.'
  },
  {
    id: 'topography-survey',
    title: 'Topography Survey & Elevation Mapping',
    shortTag: 'Topography',
    tagline: 'Millimeter-accurate elevation, contouring, and boundary terrain control',
    description: 'Precise ground surface elevation, contour modeling, and legal boundary layout using geodetic GNSS networks and UAV LiDAR, establishing an unshakeable spatial coordinate framework for the entire project lifecycle.',
    modes: ['desk-study', 'field-investigation', 'both'],
    keyCapabilities: [
      'High-Resolution Digital Elevation (DEM) & Digital Terrain Models (DTM)',
      'Sub-centimeter Topographic Contour Generation (0.25m to 1.0m intervals)',
      'Cut & Fill Earthwork Volume Volumetric Calculations & Grading Optimization',
      'Cadastral Boundary Confirmation & Geodetic Primary Control Network Staking'
    ],
    equipmentAndMethods: [
      'DJI Matrice 350 RTK with Zenmuse L2 LiDAR & High-Res Photogrammetry Sensor',
      'Trimble R12i GNSS Receivers with ProPoint & SurePoint Tilt Compensation',
      'Leica TS16 Robotic Total Stations (0.5" angular accuracy with laser EDM)',
      'Permanent Geodetic Concrete Benchmarks with dual-frequency static network ties'
    ],
    applicableStandards: [
      'RICS (Royal Institution of Chartered Surveyors) Specifications for Land Surveys',
      'USACE (U.S. Army Corps of Engineers) Engineering and Design Standards',
      'ISO 17123 Series for Field Procedures for Testing Geodetic Instruments'
    ],
    deliverables: [
      'Colorized 3D LiDAR Point Clouds (LAS/LAZ classified ground returns)',
      'Civil 3D Surface Models (TIN surface, contours, and 3D DWG/DXF files)',
      'High-Resolution Orthomosaic Imagery (sub-2cm/pixel GSD GeoTIFF)',
      'Certified Primary Survey Control Network Register with WGS84 & UTM coordinates'
    ],
    icon: 'Compass',
    riskMitigated: 'Eliminates grading elevation blunders, boundary encroachment disputes, drainage ponding, and multimillion-dollar earthwork volume discrepancies.'
  },
  {
    id: 'advanced-gis-mapping',
    title: 'Advanced GIS Mapping & Data Fusion',
    shortTag: 'Unified GIS',
    tagline: 'Multi-layer interactive digital models unifying all subsurface ground truths',
    description: 'The crowning centerpiece of Groundwi Projects\' integrated approach: multi-layer, interactive digital models and spatial data fusion, unifying cross-validated site data onto a single platform for seamless reporting and collaborative site analysis.',
    modes: ['desk-study', 'field-investigation', 'both'],
    keyCapabilities: [
      'Spatial Data Fusion linking geophysics, boreholes, biology, and topo in one space',
      'Cloud-Hosted Interactive Web GIS Dashboard for stakeholder collaboration',
      'Automated Cross-Validation: Flags discrepancies between borehole logs and ERT',
      'Seamless Export to Autodesk Civil 3D, Revit BIM, Bentley MicroStation, & Esri'
    ],
    equipmentAndMethods: [
      'Esri ArcGIS Pro & Enterprise Geodatabase Architecture',
      'Open-source QGIS / PostGIS Spatial Database Servers with OGC standards',
      'Custom 3D WebGL / Cesium / Three.js Subsurface Visualizers',
      'Python & GDAL Automated Spatial Data Harmonization Pipelines'
    ],
    applicableStandards: [
      'OGC (Open Geospatial Consortium) Standards (WMS, WFS, 3D Tiles)',
      'ISO 19115 (Geographic Information - Metadata)',
      'BIM ISO 19650 Compliance for Subsurface Data Integration'
    ],
    deliverables: [
      'Interactive Secure Web GIS Portal accessible on tablets, desktop, and mobile',
      'Unified 3D Subsurface Model combining geological strata, groundwater, & CPT logs',
      'Dynamic PDF & Spatial Web Reports with live attribute querying',
      'Exportable Geopackages, GeoJSONs, Shapefiles, and Civil 3D Subsurface LandXML'
    ],
    icon: 'Globe',
    riskMitigated: 'Stops the dangerous chaos of six disparate paper reports that contradict one another; provides executives and engineers with one indisputable source of ground truth.'
  }
];
