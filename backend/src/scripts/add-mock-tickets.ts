import { supabase } from "../config/supabase";

const mockTickets = [
  {
    title: "Ventilation Hood Malfunction - Smoke Build-up",
    submitter_name: "Alex Rivera",
    priority: "High",
    location: "Main Kitchen Line",
    description: `Ventilation hood over main cooking line showing reduced suction power and allowing smoke to build up in kitchen area.

Key Issues:
- Visible smoke accumulation during peak cooking times
- Grease particles settling on nearby surfaces
- Temperature increase in kitchen area
- Staff reporting eye irritation and breathing discomfort

Immediate Impact:
- Reduced visibility in kitchen
- Potential health and safety concern
- Affecting food quality due to smoke
- Risk of fire safety compliance issues

Attempted Solutions:
- Cleaned visible grease filters
- Checked fan belt tension
- Verified power supply to hood system
- Reduced simultaneous use of high-heat cooking equipment

Need immediate inspection and repair to maintain kitchen operations and safety standards.`,
    image_url:
      "https://images.unsplash.com/photo-1452457750107-cd084dce177d?w=800",
    image_name: "hood-smoke-issue.jpg",
    status: "open",
  },
  {
    title: "Bar Ice Machine Not Producing Ice",
    submitter_name: "Lisa Martinez",
    priority: "Medium",
    location: "Main Bar",
    description: `Bar ice machine has stopped producing ice, critically affecting bar service capacity.

System Status:
- Power is on but no ice production
- Water supply appears normal
- No unusual sounds
- No visible leaks
- Temperature reading normal

Current Workaround:
- Using ice from main kitchen ice machine
- Implemented ice conservation measures
- Pre-chilling glassware when possible

This is significantly impacting drink service speed and quality. Need resolution before weekend service.`,
    image_url:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
    image_name: "ice-machine-issue.jpg",
    status: "completed",
  },
  {
    title: "Dining Room AC Unit Noise Disturbance",
    submitter_name: "James Wilson",
    priority: "Medium",
    location: "Main Dining Room - North Section",
    description: `AC unit above table 15 making loud rattling noise during operation.

Noise Characteristics:
- Intermittent rattling/vibrating sound
- Occurs every 15-20 minutes when compressor cycles
- Noise level disrupting guest conversations
- Vibration visible in nearby light fixtures

Guest Impact:
- Multiple complaints from nearby tables
- Having to reseat guests
- Affecting ambient dining experience
- Section efficiency reduced due to limited seating options

Need inspection to identify source of vibration and resolve before weekend dinner service.`,
    image_url:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
    image_name: "ac-noise-issue.jpg",
    status: "open",
  },
  {
    title: "Coffee Machine Pressure Fluctuation",
    submitter_name: "Maria Garcia",
    priority: "High",
    location: "Service Bar",
    description: `Main espresso machine showing inconsistent pressure readings affecting coffee quality.

Symptoms:
- Pressure gauge fluctuating between 7-11 bars
- Inconsistent extraction times
- Variable coffee flow rate
- Steam wand pressure inconsistent
- Unusual noise during operation

Quality Impact:
- Inconsistent espresso shots
- Varying crema quality
- Temperature inconsistency
- Customer complaints about taste variation

Machine Details:
- Model: La Marzocco GB5
- Last Service: 2 months ago
- Daily Output: ~200 drinks
- Age: 3 years

Need technical service to calibrate pressure and check system integrity.`,
    image_url:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    image_name: "coffee-machine-issue.jpg",
    status: "open",
  },
  {
    title: "Outdoor Patio Heater Malfunction",
    submitter_name: "Robert Chen",
    priority: "Low",
    location: "Outdoor Dining Area",
    description: `Three patio heaters in outdoor dining section not igniting properly.

Affected Units:
- Units 2, 4, and 6 not maintaining flame
- Gas flow appears normal
- Ignition clicking but no flame
- No gas odor detected

Impact on Service:
- Reduced outdoor seating capacity
- Guest comfort affected in evening service
- Having to reseat guests during temperature drops
- Potential revenue loss from unused tables

Weather forecast shows dropping temperatures this week, need repair to maintain outdoor dining capacity.`,
    image_url:
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800",
    image_name: "patio-heater-issue.jpg",
    status: "completed",
  },
];

async function addMockTickets() {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .insert(mockTickets)
      .select();

    if (error) {
      console.error("Error adding mock tickets:", error);
      return;
    }

    console.log("Successfully added mock tickets:", data);
  } catch (error) {
    console.error("Error in script execution:", error);
  }
}

// Run the function
addMockTickets();
