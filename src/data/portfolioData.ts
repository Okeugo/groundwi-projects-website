import { PortfolioProject } from '../types';

export const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: 'meridian-wind-farm',
    title: 'Meridian 320MW Wind Energy Facility: Karst Void Risk Mitigation',
    clientSector: 'Energy & Renewables',
    location: 'Highland Limestone Plateau, TX',
    dateCompleted: 'October 2025',
    scopeMode: 'both',
    servicesApplied: ['Geophysical Subsurface Profiling', 'Geotechnical Soil Testing', 'Advanced GIS Mapping', 'Topography Survey'],
    challenge: 'Prior discrete exploratory boreholes by an initial contractor missed extensive dissolved limestone karst voids. If turbine foundations were cast over hidden subterranean cavities, differential settlement would trigger catastrophic structural collapse.',
    integratedSolution: 'Groundwi Projects executed 14 line-km of continuous Electrical Resistivity Tomography (ERT) combined with Micro-Gravity surveying across 48 turbine pad footprints. Anomalies flagged in ERT were immediately cross-validated using targeted CPTu soundings and rotary coring, all integrated into a live Web GIS map.',
    defensibleOutcomes: [
      'Identified 7 critical subterranean dissolution voids directly beneath proposed turbine centers #14, #22, and #39',
      'Micro-sited turbine pad locations by 18 to 35 meters onto intact limestone pinnacles without altering grid interconnections',
      'Unified GIS digital twin delivered to civil EPC contractor with 3D bedrock models, saving an estimated $4.2M in potential remedial foundation underpinning',
      'Zero ground surprises during foundation pad excavation and pile drilling operations'
    ],
    roiMetric: '$4.2M Foundation Risk Averted',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    layersUsed: ['LiDAR Topo Contours', 'ERT Bedrock Inversion', 'CPT Piezocone Logs', 'Karst Anomaly Heatmap'],
    technicalData: {
      boreholesOrSoundings: 56,
      profileLineKm: 14.2,
      depthInvestigated: '38 meters below ground level',
      areaCovered: '1,450 hectares'
    }
  },
  {
    id: 'corridor-high-speed-rail',
    title: 'Metropolitan High-Speed Rail Corridor: Subsurface Lithology & EIA Baseline',
    clientSector: 'Infrastructure',
    location: 'Interstate Valley Rail Link',
    dateCompleted: 'June 2025',
    scopeMode: 'field-investigation',
    servicesApplied: ['Geological Mapping', 'Environmental Impact Assessment (EIA)', 'Geotechnical Soil Testing', 'Advanced GIS Mapping'],
    challenge: 'A 42km passenger rail corridor crossed complex shear fault zones, soft compressible alluvial clays, and three environmentally sensitive wetland sanctuaries requiring strict EPA regulatory compliance documentation.',
    integratedSolution: 'Deployed structural geological mapping combined with continuous CPT soundings to delineate soft clay boundaries. Simultaneously conducted seasonal EIA flora/fauna ecological transects and hydrological baseline monitoring, compiling all constraints into an interactive GIS alignment optimizer.',
    defensibleOutcomes: [
      'Mapped previously unrecorded strike-slip fault branches, enabling track designers to introduce engineered seismic expansion joints',
      'Identified soft peat pockets prone to long-term creep settlement, prescribing targeted lime-cement column stabilization',
      'Achieved 100% statutory environmental clearance with zero statutory objections from federal and municipal authorities',
      'Automated export of ground model into BIM Civil 3D format for consortium engineering partners'
    ],
    roiMetric: '100% First-Pass Environmental Approval',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    layersUsed: ['Geological Fault Formations', 'Ecological Wetland Buffers', 'Soft Soil CPT Profiles', 'Hydrogeological Piezometers'],
    technicalData: {
      boreholesOrSoundings: 112,
      profileLineKm: 42.0,
      depthInvestigated: '25 meters',
      areaCovered: '42 km linear corridor'
    }
  },
  {
    id: 'port-terminal-expansion',
    title: 'Deepwater Container Terminal & Heavy Duty Stacking Yard',
    clientSector: 'Commercial & Industrial',
    location: 'Coastal Deepwater Estuary',
    dateCompleted: 'January 2026',
    scopeMode: 'both',
    servicesApplied: ['Geotechnical Soil Testing', 'Geophysical Subsurface Profiling', 'Topography Survey', 'Advanced GIS Mapping'],
    challenge: 'Reclaimed coastal land subjected to extreme 100-ton container crane loads suffered from irregular dredge fill layers and liquefaction hazards under potential seismic shaking.',
    integratedSolution: 'Mobilized track-mounted CPTu piezocone rigs to measure continuous cyclic pore pressure generation, paired with MASW (surface wave seismic) to calculate shear wave velocity profiles (Vs30). Integrated with UAV LiDAR to verify post-settlement reclamation grades.',
    defensibleOutcomes: [
      'Characterized liquefaction-susceptible loose silty sand lenses between 4m and 9m depth',
      'Engineered a dynamic vibro-replacement stone column compaction specification tailored to specific GIS sub-zones',
      'Enabled heavy container stack cranes to operate at maximum tier height without differential rail settlement',
      'Cross-validated pre- and post-compaction CPT soundings demonstrating a 320% increase in soil bearing capacity'
    ],
    roiMetric: '320% Bearing Capacity Gain Verified',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    layersUsed: ['Bathymetric / Topo DTM', 'Vs30 Shear Wave Heatmap', 'CPTu Liquefaction Index', 'Ground Improvement GIS Zones'],
    technicalData: {
      boreholesOrSoundings: 84,
      profileLineKm: 6.8,
      depthInvestigated: '32 meters',
      areaCovered: '65 hectares'
    }
  },
  {
    id: 'solarpark-desert-basin',
    title: 'Helios 500MW Photovoltaic Solar Park: Topography & Corrosivity Profiling',
    clientSector: 'Energy & Renewables',
    location: 'Arid Basin & Range Desert',
    dateCompleted: 'August 2025',
    scopeMode: 'both',
    servicesApplied: ['Topography Survey', 'Geophysical Subsurface Profiling', 'Geotechnical Soil Testing', 'Advanced GIS Mapping'],
    challenge: 'Severe terrain washouts and highly aggressive sulfate-saline soils risked premature steel foundation pile corrosion, while micro-undulations exceeded tracker slope tolerances.',
    integratedSolution: 'Executed aerial RTK drone LiDAR across 1,800 hectares producing sub-decimeter contour maps. Conducted continuous electrical resistivity surveys to map soil corrosivity horizons and pulled static pile load tests to calibrate driven pile depths.',
    defensibleOutcomes: [
      'Optimized earthwork grading cuts by 38%, preserving natural desert drainage channels and preventing flash flood washout',
      'Mapped high-resistivity caliche hardpans versus low-resistivity saline zones, allowing targeted sacrificial galvanization and custom pile lengths',
      'Reduced total steel pile procurement costs by $1.85M while guaranteeing 35-year structural design life',
      'Delivered GIS tracker slope suitability models directly to tracker manufacturers for automated torque-tube layout'
    ],
    roiMetric: '$1.85M Pile Material Savings',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    layersUsed: ['LiDAR Micro-Slope Contours', 'Soil Resistivity Corrosivity Map', 'Driven Pile Refusal Depth Model', 'Hydrology Washout Vectors'],
    technicalData: {
      boreholesOrSoundings: 42,
      profileLineKm: 28.5,
      depthInvestigated: '12 meters',
      areaCovered: '1,800 hectares'
    }
  },
  {
    id: 'copper-open-pit-expansion',
    title: 'Andean Copper Mine Pit Slope Stability & Hydro-Structural Model',
    clientSector: 'Mining & Resources',
    location: 'High Altitude Cordillera',
    dateCompleted: 'November 2025',
    scopeMode: 'field-investigation',
    servicesApplied: ['Geological Mapping', 'Geophysical Subsurface Profiling', 'Topography Survey', 'Advanced GIS Mapping'],
    challenge: 'Steepening open-pit bench walls by 4 degrees would unlock $80M in accessible ore, but unmapped joint water pressures and kinematic wedge failures risked devastating wall collapse.',
    integratedSolution: 'Geological field teams logged over 3,200 structural rock discontinuities using digital clinometers and drone photogrammetric 3D point cloud discontinuity extraction. Deep seismic refraction mapped the stress-relief relaxed rock zone behind the pit crest.',
    defensibleOutcomes: [
      'Delineated major bench-scale kinematic failure wedges on northwest face and verified dry rock mass conditions',
      'Successfully justified safe pit wall steepening from 44° to 48.5° on two geotechnical domains',
      'Eliminated 1.2 million cubic meters of unnecessary waste rock pre-stripping',
      'Installed continuous real-time GIS piezometric and radar displacement alert thresholds'
    ],
    roiMetric: '1.2M m³ Waste Stripping Eliminated',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    layersUsed: ['Stereonet Kinematic Domains', 'Deep Seismic Refraction Horizons', 'High-Res UAV Rock Face Mesh', 'Groundwater Piezometer Grid'],
    technicalData: {
      boreholesOrSoundings: 24,
      profileLineKm: 9.4,
      depthInvestigated: '120 meters',
      areaCovered: '320 hectares'
    }
  },
  {
    id: 'urban-brownfield-redevelopment',
    title: 'Historic Industrial Waterfront: Phase II EIA & Subsurface Clearance',
    clientSector: 'Environmental & Water',
    location: 'Metropolitan River Basin',
    dateCompleted: 'December 2025',
    scopeMode: 'both',
    servicesApplied: ['Environmental Impact Assessment (EIA)', 'Geophysical Subsurface Profiling', 'Geotechnical Soil Testing', 'Advanced GIS Mapping'],
    challenge: 'A former chemical refinery and rail terminus site intended for a $300M mixed-use civic development had undocumented underground storage tanks (USTs), heavy metal plumes, and buried masonry rubble.',
    integratedSolution: 'Employed Dual-Frequency GPR and Magnetometry to scan 100% of the site footprint for metallic tanks and buried foundations. Conducted discrete low-flow monitoring well installations and soil vapor surveys, unified into a 3D contaminant plume model.',
    defensibleOutcomes: [
      'Pinpointed 11 buried historical fuel storage tanks with zero accidental punctures or environmental breaches',
      'Mapped exact spatial bounds of a chlorinated solvent plume, restricting expensive thermal desorption remediation to only 14% of the site',
      'Secured full state Environmental Protection Agency remediation closure and clean brownfield redevelopment certificate',
      'Clearance provided 3 weeks ahead of scheduled property closing date'
    ],
    roiMetric: '65% Remediation Budget Saved',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    layersUsed: ['GPR Subsurface Anomaly Polygons', '3D Contaminant Plume Isosurfaces', 'Groundwater Gradient Contours', 'Historical Cadastral Overlays'],
    technicalData: {
      boreholesOrSoundings: 68,
      profileLineKm: 18.0,
      depthInvestigated: '15 meters',
      areaCovered: '22 hectares'
    }
  }
];
