export interface StatusChange {
  from: "open" | "completed";
  to: "open" | "completed";
  timestamp: string;
  reason?: string;
}

export interface Ticket {
  id: string;
  title: string;
  submitter_name: string;
  created_at: string;
  priority: string;
  location: string;
  description: string;
  image_name?: string;
  image_url?: string;
  status: string;
  updated_at: string;
  incident_time?: string;
}

export const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Walk-in Cooler Temperature Fluctuation",
    submitter_name: "Michael Chen",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    priority: "High",
    location: "Main Kitchen Walk-in Cooler",
    description: `During the morning prep shift (5:30 AM), I noticed significant temperature fluctuations in the walk-in cooler. The digital display showed temperatures ranging from 45°F to 38°F over a 2-hour period, well above our standard 34-36°F range. This is affecting our food storage and prep operations in several ways:

1. Produce Storage Issues:
- Leafy greens showing signs of wilting faster than usual
- Fresh herbs deteriorating more quickly
- Prepared garnishes not maintaining proper texture

2. Temperature Log Readings:
- 5:30 AM: 38°F
- 6:30 AM: 42°F
- 7:30 AM: 45°F
- 8:30 AM: 39°F

3. Equipment Observations:
- Compressor seems to be running constantly
- Unusual vibration from the cooling unit
- Frost buildup around the evaporator coils
- Door seal appears to have some wear on the bottom right corner

4. Immediate Actions Taken:
- Moved highly perishable items to the backup reach-in coolers
- Minimized door opening frequency
- Placed backup digital thermometer for secondary temperature monitoring
- Added extra sheet pans under prepared items to maintain temperature

This issue requires immediate attention as it affects food safety and quality. We have a full dinner service tonight and need reliable refrigeration for our prep work and service periods.`,
    image_name: "walk-in-temp-issue.jpg",
    image_url:
      "https://images.unsplash.com/photo-1527689638836-411945a2b57c?w=800",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "2",
    title: "Main Line Grill Ignition System Failure",
    submitter_name: "Sarah Johnson",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    priority: "High",
    location: "Main Kitchen Cooking Line",
    description: `Critical issue with the main line grill ignition system affecting dinner service operations. Detailed breakdown of the situation:

1. Initial Problem Detection:
- During pre-service testing at 3:45 PM
- Multiple failed attempts to light burners on the 6-burner section
- Manual lighting attempts unsuccessful
- No gas odor detected, suggesting possible gas flow issues

2. Impact on Kitchen Operations:
- Unable to use 70% of our main cooking surface
- Had to reorganize kitchen stations and workflow
- Currently relying on flat-top and salamander for some grill items
- Modified menu offerings may be necessary for dinner service

3. Troubleshooting Steps Attempted:
- Checked main gas line valve (fully open)
- Verified pilot light access points are clear
- Cleaned all visible ignition ports
- Tested emergency shut-off switch functionality
- Inspected gas line connections for any obvious issues
- Checked hood ventilation system operation

4. Current Workarounds in Place:
- Relocated primary protein cooking to secondary line
- Adjusted prep lists to accommodate limited cooking surface
- Modified station assignments for evening service
- Implemented temporary expo system for modified workflow

5. Recent Maintenance History:
- Last serviced: February 28th, 2024
- Recent repairs: None in past 3 months
- Regular cleaning performed nightly
- No previous issues with ignition system

This requires immediate attention as it severely impacts our ability to execute dinner service efficiently. We have a full reservation book for the weekend and cannot operate at full capacity without this equipment.

Additional Notes:
- Equipment Model: Viking VGR48-SS Professional Series
- Serial Number: VG2024-876543
- Installation Date: June 2022
- Warranty Status: Should still be under manufacturer warranty`,
    image_name: "grill-ignition-issue.jpg",
    image_url:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
  },
  {
    id: "3",
    title: "POS System Network Connectivity Issues",
    submitter_name: "Emma Wilson",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    priority: "High",
    location: "Front of House - All POS Terminals",
    description: `Experiencing intermittent network connectivity issues affecting all POS terminals during service periods. This is causing significant delays in order processing and payment handling.

Detailed System Behavior:
1. Connectivity Drops:
- Occurring every 15-20 minutes
- Lasting between 30 seconds to 2 minutes
- Affecting all 6 POS terminals simultaneously
- Kitchen display systems also losing connection

2. Specific Issues Observed:
- Credit card transactions timing out
- Orders not transmitting to kitchen
- Digital receipts not sending to customers
- Online ordering integration failing
- Table management system not syncing
- Loyalty program lookups failing

3. Impact on Service:
- Average order time increased by 4-5 minutes
- Payment processing delays of up to 3 minutes
- Kitchen backup due to delayed order transmission
- Customer complaints about wait times
- Manual ticket writing being used as backup

4. Troubleshooting Attempted:
- Rebooted all POS terminals
- Checked wireless signal strength (showing full bars)
- Verified router connections
- Tested hardwired backup connection
- Contacted ISP (no reported outages)
- Checked system logs for error messages

Network Configuration Details:
- Router Model: Cisco Meraki MX68
- Network Type: Dedicated Business Line
- ISP: Comcast Business
- Last Network Upgrade: January 2024
- Average Daily Transactions: 300+

Current Workarounds:
- Implemented manual ticket system as backup
- Using mobile hotspot for payment processing
- Maintaining paper copies of all orders
- Added runner position to facilitate kitchen communication

This issue is severely impacting our service efficiency and requires immediate resolution. We're heading into our weekend service period and cannot risk these disruptions during peak hours.`,
    image_name: "pos-system-issue.jpg",
    image_url:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
  },
  {
    id: "4",
    title: "Dishwasher Temperature and Pressure Problems",
    submitter_name: "David Kim",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
    priority: "Critical",
    location: "Back of House - Dish Pit",
    description: `Main dishwashing unit experiencing multiple issues affecting sanitation standards and service flow. Comprehensive breakdown of issues:

1. Temperature Issues:
- Final rinse temperature dropping below required 180°F
- Wash tank temperature inconsistent (ranging 145-160°F)
- Chemical sanitizer not dispensing properly
- Temperature gauge possibly malfunctioning

Temperature Log for Past 4 Hours:
9:00 AM - Wash: 152°F, Rinse: 172°F
10:00 AM - Wash: 148°F, Rinse: 165°F
11:00 AM - Wash: 145°F, Rinse: 162°F
12:00 PM - Wash: 147°F, Rinse: 168°F

2. Pressure Problems:
- Weak water pressure in spray arms
- Uneven cleaning performance
- Water leaking from bottom seal
- Inconsistent water level in wash tank

3. Operational Impact:
- Increased washing time per rack
- Some dishes requiring multiple wash cycles
- Higher water and chemical usage
- Backing up during peak service periods
- Staff having to hand-inspect all items
- Using triple-sink system as backup

4. Recent Maintenance History:
- Last service date: February 15, 2024
- Descaling performed: March 1, 2024
- Daily cleaning protocol followed
- No previous issues reported

5. Equipment Specifications:
- Model: Hobart AM15T
- Serial: HT2023-98765
- Installation Date: August 2023
- Daily Average Use: 16 hours
- Typical Load: 200-300 racks per day

6. Current Workarounds:
- Implemented pre-soak station
- Added inspection step post-wash
- Using backup sanitizing procedures
- Scheduled additional dish staff
- Modified prep schedule to manage flow

Health and Safety Concerns:
- Risk of inadequate sanitization
- Potential for health code violations
- Staff safety due to water temperature issues
- Chemical balance monitoring needed

This requires immediate attention as it affects our ability to maintain proper sanitation standards and efficient service flow. We have heavy reservations for the upcoming weekend and cannot risk any health code violations or service delays.`,
    image_name: "dishwasher-issue.jpg",
    image_url:
      "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
  },
  {
    id: "5",
    title: "Draft Beer System Cooling Malfunction",
    submitter_name: "Lisa Garcia",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 48 hours ago
    priority: "Medium",
    location: "Main Bar",
    description: `The draft beer cooling system is malfunctioning, affecting beer temperature and quality across all 12 tap lines. Detailed assessment:

1. Temperature Issues:
- Beer temperature ranging 45-50°F (should be 36-38°F)
- Glycol system not maintaining proper temperature
- Lines feeling warm to touch
- Excessive foaming on all pours

Temperature Readings (Past 12 Hours):
- 6:00 PM: 46°F
- 8:00 PM: 48°F
- 10:00 PM: 50°F
- 12:00 AM: 47°F
- 2:00 AM: 45°F
- 4:00 AM: 46°F

2. System Components Affected:
- Main glycol power pack
- Trunk line insulation
- Python line bundle
- Tower cooling fans
- Individual tap coolers

3. Impact on Service:
- Increased pour waste (approximately 15-20%)
- Customer complaints about beer temperature
- Slower pour times due to foaming
- Need to pre-chill glasses longer
- Limited draft beer menu offerings

4. Product Quality Issues:
- Excessive foaming in all lines
- Inconsistent carbonation levels
- Off-flavors developing in some beers
- Reduced shelf life of opened kegs

5. Financial Impact:
- Estimated 20% product loss
- Comped drinks due to quality
- Potential keg returns needed
- Lost sales from unavailable items

6. Current Workarounds:
- Pre-chilling glasses longer
- Adjusted CO2 pressure settings
- Slower pour technique
- Offering bottled alternatives
- Discounting affected products

7. System Information:
- Glycol Unit: Glycol Power Pack 3/4 HP
- Number of Lines: 12
- Line Length: Various (15-45 feet)
- Last Service: January 2024
- Regular Cleaning: Bi-weekly

8. Previous Maintenance:
- Line cleaning: March 1, 2024
- Pressure check: February 15, 2024
- Glycol levels checked: March 5, 2024
- No recent repairs or parts replaced

This issue needs attention before weekend service as it's affecting product quality and causing significant product waste. We have several local craft beers that are particularly sensitive to temperature fluctuations.`,
    image_name: "draft-system-issue.jpg",
    image_url:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 48 hours ago
  },
  {
    id: "6",
    title: "Hood Ventilation System Performance Issues",
    submitter_name: "James Williams",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 72 hours ago
    priority: "High",
    location: "Main Kitchen Line",
    description: `Kitchen exhaust hood system showing reduced performance affecting air quality and cooking operations. Comprehensive analysis:

1. Observed Issues:
- Reduced air flow across all cooking stations
- Visible smoke accumulation during peak cooking periods
- Grease particle buildup on surfaces
- Excessive heat retention in kitchen
- Staff reporting eye irritation and discomfort

2. System Performance Measurements:
Air Flow Readings (FPM - Feet Per Minute):
- Station 1 (Grill): 275 FPM (Should be 350+)
- Station 2 (Fryers): 250 FPM (Should be 350+)
- Station 3 (Sauté): 265 FPM (Should be 350+)
- Station 4 (Flat Top): 270 FPM (Should be 350+)

Temperature Readings:
- Cooking Line Ambient: 95°F (Usually 85°F)
- Kitchen General Area: 88°F (Usually 78°F)
- Above Grill: 110°F (Usually 95°F)

3. Impact on Operations:
- Reduced cooking efficiency
- Staff comfort and safety concerns
- Increased cleaning requirements
- Potential fire safety risks
- Air quality concerns
- Customer complaints about cooking odors in dining room

4. System Information:
Hood Specifications:
- Model: CaptiveAire ND-2
- Installation Date: June 2022
- Last Inspection: January 2024
- Filter Type: Baffle
- Fan Type: Variable Speed
- Coverage: 16 linear feet

5. Recent Maintenance History:
- Daily filter cleaning performed
- Monthly hood cleaning by staff
- Quarterly professional cleaning (Last: February 2024)
- Semi-annual inspection (Last: January 2024)
- Annual fire suppression check (Last: December 2023)

6. Troubleshooting Attempted:
- Cleaned all accessible filters
- Checked fan belt tension
- Verified make-up air operation
- Inspected ductwork access points
- Tested emergency shut-off
- Checked control panel operation

7. Current Workarounds:
- Adjusted cooking schedules
- Increased cleaning frequency
- Added portable fans
- Modified menu items requiring high-heat cooking
- Rotating staff more frequently
- Keeping doors open when possible

8. Safety Concerns:
- Fire risk due to grease accumulation
- Air quality affecting staff health
- Temperature stress on equipment
- Potential code violations
- Insurance compliance issues

This system requires immediate inspection and service as it poses both operational and safety risks. We need this resolved before our weekend service period to ensure proper kitchen operation and staff safety.

Additional Notes:
- Building HVAC system operating normally
- No recent modifications to kitchen layout
- No changes in cooking equipment or procedures
- Weather conditions normal for season
- Make-up air unit appears to be functioning properly`,
    image_name: "hood-ventilation-issue.jpg",
    image_url:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 72 hours ago
  },
  {
    id: "7",
    title: "Ice Machine Recurring Malfunction",
    submitter_name: "Robert Martinez",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 96 hours ago
    priority: "High",
    location: "Bar Service Area",
    description: `Ice machine malfunction has recurred after initial repair. Comprehensive issue history:

Initial Issue (March 8):
- Machine stopped producing ice
- Water flow appeared normal
- No error codes displayed
- Repair completed: Replaced faulty thermistor
- Tested functional for 24 hours
- Ticket completed on March 9

Recurrence (March 11):
- Same symptoms as original issue
- No ice production
- Water flowing but not freezing
- Still no error codes
- Previous repair appears ineffective
- Possibly deeper system issue

Current Impact:
- Purchasing bagged ice as temporary solution
- Increased costs ($100/day in ice purchases)
- Storage limitations for bagged ice
- Quality concerns with transported ice
- Bar service significantly impacted

Additional Observations:
- Unit makes normal startup sounds
- Water fill cycle operates
- No visible leaks
- Compressor appears to run
- No unusual noises
- Power supply stable

This ticket is being reopened due to failure of initial repair. Requires thorough diagnostic of entire cooling system.`,
    image_name: "ice-machine.jpg",
    image_url:
      "https://images.unsplash.com/photo-1567769541715-8c71fe49fd43?w=500",
    status: "open",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 96 hours ago
  },
  {
    id: "8",
    title: "Outdoor Patio Heater Malfunction",
    submitter_name: "Sarah Johnson",
    created_at: "2024-03-25T03:58:00Z",
    priority: "Low",
    location: "Outdoor Dining Area",
    description:
      "Three patio heaters in outdoor dining section not igniting properly. Affected Units: - Units 2, 3, and 5",
    image_name: "patio-heater.jpg",
    image_url:
      "https://images.unsplash.com/photo-1610690294069-825913d4c528?w=500",
    status: "completed",
    updated_at: "2024-03-25T04:30:00Z",
  },
];
