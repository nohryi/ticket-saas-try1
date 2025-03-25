import express, { Request, Response, RequestHandler } from "express";
import { supabase } from "../config/supabase";

const router = express.Router();

interface Ticket {
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
}

interface UpdateImageRequest {
  image_url: string;
  image_name: string;
}

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Error fetching tickets" });
  }
});

// Get a single ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Error fetching ticket" });
  }
});

// Update ticket status
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["open", "completed"].includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  try {
    const { data, error } = await supabase
      .from("tickets")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }
    res.json(data);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Error updating ticket" });
  }
});

// Create new ticket
router.post("/", async (req, res) => {
  const {
    title,
    submitter_name,
    priority,
    location,
    description,
    image_name,
    image_url,
  } = req.body;

  try {
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          title,
          submitter_name,
          priority,
          location,
          description,
          image_name,
          image_url,
          status: "open",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Error creating ticket" });
  }
});

// Update ticket image URL
router.patch("/:id/image", async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, image_name } = req.body as UpdateImageRequest;

    const { data, error } = await supabase
      .from("tickets")
      .update({ image_url, image_name, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating ticket image:", error);
      res.status(500).json({ error: "Failed to update ticket image" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error in update ticket image route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
