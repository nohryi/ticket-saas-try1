import { supabase } from "../config/supabase";

async function updateTicketImages() {
  try {
    // Update ice machine ticket
    const { error: error1 } = await supabase
      .from("tickets")
      .update({
        image_url:
          "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=800",
        image_name: "commercial-ice-machine.jpg",
        updated_at: new Date().toISOString(),
      })
      .eq("id", "7");

    if (error1) {
      console.error("Error updating ice machine ticket:", error1);
    } else {
      console.log("Successfully updated ice machine ticket image");
    }

    // Update patio heater ticket
    const { error: error2 } = await supabase
      .from("tickets")
      .update({
        image_url:
          "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800",
        image_name: "outdoor-patio-heater.jpg",
        updated_at: new Date().toISOString(),
      })
      .eq("id", "8");

    if (error2) {
      console.error("Error updating patio heater ticket:", error2);
    } else {
      console.log("Successfully updated patio heater ticket image");
    }
  } catch (error) {
    console.error("Error in script execution:", error);
  }
}

updateTicketImages();
