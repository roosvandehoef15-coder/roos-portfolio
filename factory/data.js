// Value-flow data for the GSS digital twin.
// Schema: stakeholder -> enabler -> GSS process -> outcome (with value tags) -> beneficiaries.
// Sources: Tadé Whenu MSc thesis Fig 4.1 (stakeholder/value mapping)
//          + Afrikaanderwijk coop "Inkomsten en Uitgaven Afvalverwerking GSS" sheet (2024 numbers).

window.VALUE_TYPES = {
  social:       { label: "Social",       color: "#E5B82E" },
  ecological:   { label: "Ecological",   color: "#4A9A3F" },
  financial:    { label: "Financial",    color: "#4080C4" },
  cultural:     { label: "Cultural",     color: "#8B5CA6" },
  aesthetical:  { label: "Aesthetical",  color: "#C73E3A" }
};

window.GSS_PROCESS = ["Harvest", "Storage", "(Re)processing", "Distribution", "Access"];

window.STAKEHOLDER_GROUPS = [
  "Governmental bodies",
  "NGOs / Community",
  "Knowledge institutions",
  "Market",
  "Businesses",
  "Designers",
  "Residents"
];

// Re-usable beneficiary records. Same entity can be referenced by many outcomes.
const B = {
  community: { id: "community_members", group: "Residents", name: "Community members", detail: "Residents of the Afrikaanderwijk" },
  wijkkeuken: { id: "wijkkeuken", group: "NGOs / Community", name: "Buurtbuik", detail: "Community kitchen" },
  renes: { id: "renes", group: "Businesses", name: "Renes", detail: "Less handling, less work, less costs" },
  coop: { id: "afrik_coop", group: "NGOs / Community", name: "Afrikaanderwijk Coop", detail: "Coop revenue and continuity" },
  workers: { id: "gss_workers", group: "NGOs / Community", name: "12 GSS workers", detail: "Wages, pride, social inclusion" },
  muni: { id: "municipality", group: "Governmental bodies", name: "Municipality of Rotterdam", detail: "5 silos: waste, work, sust., finance, wijk" },
  vendors_b: { id: "market_vendors_b", group: "Market", name: "Market vendors", detail: "Free, close-by disposal" },
  universities: { id: "universities", group: "Knowledge institutions", name: "Universities (TU Delft, EUR)", detail: "Living lab, data access" },
  schools: { id: "schools", group: "Knowledge institutions", name: "Schools & colleges", detail: "Guided tours, education" },
  designpub: { id: "design_publics", group: "Knowledge institutions", name: "Design & Publics", detail: "Research site" },
  designers_b: { id: "designers_b", group: "Designers", name: "Local entrepreneurs", detail: "Workshop space, material" },
  architects: { id: "architects", group: "Designers", name: "Architects", detail: "Pride / portfolio" },
  others: { id: "other_initiatives", group: "NGOs / Community", name: "Other Rotterdam initiatives", detail: "Inspiration, replicable model" },
  visitors: { id: "visitors", group: "Residents", name: "Market visitors", detail: "Improved cleanliness, social encounters" }
};

window.FLOW_DATA = {
  stakeholders: [

    // ============================================================
    // MARKET VENDORS — the main enabler-providers of waste streams
    // ============================================================
    {
      id: "market_vendors", name: "Market vendors", group: "Market",
      enablers: [
        {
          id: "veggies",
          name: "Leftover produce",
          short: "Fruit & vegetables left at the market",
          outcomes: [
            {
              id: "cheap_food", title: "Free food",
              description: "Free produce that residents can come and take home from the GSS",
              value_types: ["financial", "social"],
              beneficiaries: [B.community],
              evidence: {
                numbers: [], photos: [],
                stories: ["\"De markt voelt aan als een familie.\""]
              }
            },
            {
              id: "wijkkeuken_food", title: "Food for Buurtbuik",
              description: "Surplus produce → cooked meals via Buurtbuik, the neighbourhood kitchen",
              value_types: ["social", "cultural"],
              beneficiaries: [B.wijkkeuken, B.community],
              evidence: { numbers: [], photos: [], stories: [] }
            },
            {
              id: "veggies_to_renes", title: "Clean organic waste",
              description: "Sorted organic stream picked up by Renes",
              value_types: ["ecological", "financial"],
              beneficiaries: [B.renes],
              evidence: { numbers: [], photos: [], stories: [] }
            },
            {
              id: "veggies_products", title: "Juices & products from waste",
              description: "Surplus produce becomes juices, jams and snacks via Buurtbuik partnerships and resale",
              value_types: ["financial", "social", "cultural"],
              beneficiaries: [B.wijkkeuken, B.community],
              evidence: { numbers: [], photos: [], stories: [] }
            }
          ]
        },
        {
          id: "karton",
          name: "Karton",
          short: "Cardboard, 300.280 kg in 2024",
          outcomes: [
            {
              id: "karton_income", title: "Income from karton",
              description: "Pressed cardboard sold to Renes",
              value_types: ["financial"],
              beneficiaries: [B.coop, B.workers],
              evidence: {
                numbers: ["€14.680 in 2024", "300.280 kg processed"],
                photos: [], stories: []
              }
            },
            {
              id: "karton_recycled", title: "Recycled cardboard",
              description: "Clean cardboard stream → recycling chain",
              value_types: ["ecological"],
              beneficiaries: [B.renes, B.muni],
              evidence: {
                numbers: ["300.280 kg diverted from restafval"],
                photos: [], stories: []
              }
            },
            {
              id: "karton_disposal", title: "Free cardboard disposal",
              description: "Vendors no longer haul cardboard themselves",
              value_types: ["financial", "social"],
              beneficiaries: [B.vendors_b],
              evidence: { numbers: ["Disposal in close proximity"], photos: [], stories: [] }
            }
          ]
        },
        {
          id: "plastic",
          name: "Plastic (PP)",
          short: "Plastic, 86.320 kg in 2024",
          outcomes: [
            {
              id: "plastic_income", title: "Income from plastic",
              description: "Pressed plastic sold to Renes",
              value_types: ["financial"],
              beneficiaries: [B.coop, B.workers],
              evidence: { numbers: ["€4.126 in 2024", "86.320 kg"], photos: [], stories: [] }
            },
            {
              id: "plastic_recyclate", title: "Recyclate (79%)",
              description: "Plastic stream becomes new recyclate",
              value_types: ["ecological"],
              beneficiaries: [B.renes, B.muni],
              evidence: { numbers: ["79% recyclaat per kilo plastic"], photos: [], stories: [] }
            }
          ]
        },
        {
          id: "hout",
          name: "Pallets (hout)",
          short: "Wooden pallets from market stalls",
          outcomes: [
            {
              id: "hout_reused", title: "Reused pallets",
              description: "Intact pallets go back into circulation as whole pallets, sold or reused",
              value_types: ["financial", "ecological"],
              beneficiaries: [B.coop, B.workers],
              evidence: {
                numbers: ["€5.926 income in 2024", "5.586 GWN + 85 EUR pallets"],
                photos: [], stories: []
              }
            },
            {
              id: "hout_recycled", title: "MDF from crushed pallets",
              description: "Broken pallets are crushed by Renes into MDF (medium-density fibreboard) and sold",
              value_types: ["ecological", "financial"],
              beneficiaries: [B.renes, B.muni],
              evidence: {
                numbers: ["72.240 kg processed in 2024", "90% recyclable per kilo"],
                photos: [], stories: []
              }
            },
            {
              id: "hout_material", title: "Material for makers",
              description: "Some wood becomes raw material for local entrepreneurs, architects and workshops",
              value_types: ["aesthetical", "cultural", "ecological"],
              beneficiaries: [B.designers_b, B.architects],
              evidence: { numbers: [], photos: [], stories: ["\"Waste is the new gold.\""] }
            }
          ]
        },
        {
          id: "agf",
          name: "AGF (organic)",
          short: "Fruit/veg/meat waste, 126.900 kg in 2024",
          outcomes: [
            {
              id: "agf_compost", title: "Compost & feed",
              description: "Organic stream → composting, biogas, animal feed",
              value_types: ["ecological"],
              beneficiaries: [B.renes, B.muni],
              evidence: { numbers: ["126.900 kg in 2024"], photos: [], stories: [] }
            }
          ]
        }
      ]
    },

    // ============================================================
    // RENES — collection partner that also brings infrastructure
    // ============================================================
    {
      id: "renes", name: "Renes", group: "Businesses",
      enablers: [
        {
          id: "renes_service",
          name: "Collection & containers",
          short: "Trucks, container rental, press huur",
          outcomes: [
            {
              id: "renes_bundled_pickup", title: "Bundled pickup at one location",
              description: "One pickup site instead of many small ones — fewer truck routes",
              value_types: ["ecological", "financial"],
              beneficiaries: [B.renes, B.muni, B.community],
              evidence: { numbers: ["6.120 → 323 vrachtwagenritten per jaar", "5.900 kuub CO2 bespaard"], photos: [], stories: [] }
            },
            {
              id: "renes_market_value", title: "Market value from waste streams",
              description: "Sorted streams have higher resale value than mixed waste",
              value_types: ["financial", "ecological"],
              beneficiaries: [B.renes, B.coop],
              evidence: { numbers: [], photos: [], stories: [] }
            }
          ]
        }
      ]
    },

    // ============================================================
    // MUNICIPALITY — subsidy + space + (not yet) data
    // ============================================================
    {
      id: "municipality_in", name: "Municipality of Rotterdam", group: "Governmental bodies",
      enablers: [
        {
          id: "subsidy",
          name: "Subsidy",
          short: "Annual operational funding",
          outcomes: [
            {
              id: "subsidy_wages", title: "Wages for 12 workers",
              description: "Subsidy covers part of staff cost; gap closing via 2025 profit",
              value_types: ["financial", "social"],
              beneficiaries: [B.workers, B.coop],
              evidence: {
                numbers: ["2024: −€13.834 loss", "2025: +€5.996 first profit"],
                photos: [], stories: []
              }
            },
            {
              id: "subsidy_continuity", title: "GSS keeps operating",
              description: "Funding keeps the station running year to year",
              value_types: ["social", "financial"],
              beneficiaries: [B.community, B.vendors_b, B.coop],
              evidence: { numbers: ["Max €55.000/yr before re-classified as charity"], photos: [], stories: [] }
            }
          ]
        },
        {
          id: "permits",
          name: "Space & permits",
          short: "Physical site of GSS on the markt",
          outcomes: [
            {
              id: "permits_physical_site", title: "GSS exists physically on the markt",
              description: "Location makes pickup, sorting, social presence possible",
              value_types: ["social", "aesthetical"],
              beneficiaries: [B.community, B.vendors_b, B.visitors],
              evidence: { numbers: [], photos: [], stories: [] }
            }
          ]
        }
      ]
    },

    // ============================================================
    // AFRIKAANDERWIJK COOP — provides labour, structure, mission
    // ============================================================
    {
      id: "afrik_coop_in", name: "Afrikaanderwijk Coop", group: "NGOs / Community",
      enablers: [
        {
          id: "coop_labour",
          name: "12 GSS workers",
          short: "Daily operations & expertise",
          outcomes: [
            {
              id: "coop_employment", title: "Stable employment",
              description: "Jobs for people with distance to the labour market",
              value_types: ["social", "financial"],
              beneficiaries: [B.workers, B.community],
              evidence: {
                numbers: ["12 GSS workers", "80 coop members earn from the cooperative"],
                photos: [],
                stories: ["\"Het is een berg afval, maar ook een berg werk, een berg grondstoffen.\""]
              }
            },
            {
              id: "coop_pride", title: "Pride & social inclusion",
              description: "Identity and dignity through circular work",
              value_types: ["social", "cultural"],
              beneficiaries: [B.workers, B.community],
              evidence: { numbers: [], photos: [], stories: ["\"Waste is the new gold.\""] }
            },
            {
              id: "coop_cleanliness", title: "Improved cleanliness on the markt",
              description: "Daily sorting and pickup keeps the marktplein clean",
              value_types: ["aesthetical", "ecological", "social"],
              beneficiaries: [B.visitors, B.muni, B.vendors_b],
              evidence: { numbers: ["Decreased illegal dumpings"], photos: [], stories: [] }
            }
          ]
        },
        {
          id: "coop_mission",
          name: "Cooperative structure & mission",
          short: "Right to Cooperate, lokaal inbesteden",
          outcomes: [
            {
              id: "coop_local_economy", title: "Stronger local economy",
              description: "Lokaal inbesteden keeps money circulating in the wijk",
              value_types: ["financial", "social"],
              beneficiaries: [B.community, B.designers_b, B.coop],
              evidence: { numbers: [], photos: [], stories: [] }
            },
            {
              id: "coop_model", title: "Exemplary model for other initiatives",
              description: "Right to Challenge → Right to Cooperate; replicable elsewhere",
              value_types: ["cultural", "social"],
              beneficiaries: [B.others, B.muni],
              evidence: { numbers: [], photos: [], stories: [] }
            },
            {
              id: "coop_savings", title: "Public savings for municipality",
              description: "Municipal costs avoided across 5 silos",
              value_types: ["financial"],
              beneficiaries: [B.muni],
              evidence: { numbers: ["€126.000–€183.000 estimated savings per year"], photos: [], stories: [] }
            }
          ]
        }
      ]
    },

    // ============================================================
    // KNOWLEDGE INSTITUTIONS — research and student labour
    // ============================================================
    {
      id: "knowledge", name: "Knowledge institutions", group: "Knowledge institutions",
      enablers: [
        {
          id: "research",
          name: "Research & frameworks",
          short: "Theses, Ostrom, CVF, BOLD Cities",
          outcomes: [
            {
              id: "research_strategy", title: "Strategic frameworks",
              description: "Theory feeds the coop's narrative and the design brief",
              value_types: ["cultural", "social"],
              beneficiaries: [B.coop, B.designpub],
              evidence: { numbers: [], photos: [], stories: [] }
            },
            {
              id: "research_visibility_ce", title: "Visibility of CE",
              description: "GSS becomes a referenced case in academic circular-economy work",
              value_types: ["cultural", "social"],
              beneficiaries: [B.universities, B.muni],
              evidence: { numbers: [], photos: [], stories: [] }
            }
          ]
        },
        {
          id: "students",
          name: "Student labour",
          short: "Theses, internships (Whenu, Roos)",
          outcomes: [
            {
              id: "students_living_lab", title: "GSS as living lab",
              description: "Real-world data access for student research",
              value_types: ["cultural", "social"],
              beneficiaries: [B.universities, B.schools],
              evidence: { numbers: ["Guided tours, data access"], photos: [], stories: [] }
            }
          ]
        }
      ]
    },

    // ============================================================
    // DESIGNERS & ARCHITECTS — design input
    // ============================================================
    {
      id: "designers_in", name: "Architects & local entrepreneurs", group: "Designers",
      enablers: [
        {
          id: "design",
          name: "Architectural design",
          short: "Building design that won the 2024 architectuurprijs",
          outcomes: [
            {
              id: "design_award", title: "Architectuurprijs 2024",
              description: "Visible, prize-winning design lifts identity of the wijk",
              value_types: ["aesthetical", "cultural"],
              beneficiaries: [B.community, B.coop, B.architects],
              evidence: { numbers: ["2024 architectuurprijs"], photos: [], stories: [] }
            },
            {
              id: "design_inspiration", title: "Becoming a cooperative consultancy",
              description: "GSS's goal is to become a paid consultancy on circular economy, sharing its model with other neighbourhoods and initiatives",
              value_types: ["aesthetical", "cultural"],
              beneficiaries: [B.others, B.designers_b],
              evidence: { numbers: [], photos: [], stories: [] }
            }
          ]
        }
      ]
    },

    // ============================================================
    // CITIZENS — voluntary engagement, lived knowledge
    // ============================================================
    {
      id: "citizens_in", name: "Citizens of Afrikaanderwijk", group: "Residents",
      enablers: [
        {
          id: "engagement",
          name: "Voluntary engagement",
          short: "Workshops, civic participation",
          outcomes: [
            {
              id: "engagement_community", title: "Sense of community",
              description: "Shared work and shared space create community ties",
              value_types: ["social", "cultural"],
              beneficiaries: [B.community, B.workers, B.visitors],
              evidence: { numbers: [], photos: [], stories: ["\"De markt voelt aan als een familie.\""] }
            },
            {
              id: "engagement_democratic", title: "Democratic empowerment",
              description: "Residents shape what happens in their own neighbourhood",
              value_types: ["cultural", "social"],
              beneficiaries: [B.community, B.coop],
              evidence: { numbers: [], photos: [], stories: [] }
            }
          ]
        }
      ]
    }

  ]
};
