"use client"

import type React from "react"

import { Input } from "@/components/ui/input"

interface Ticket {
  id: string
  name: string
  ticketDate: string
  dateNotice: string
  incidentLocation: string
  details: string
  imageCapture: string
}

interface TicketFormProps {
  ticket: Ticket
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveTicket: () => void
}

export default function TicketForm({ ticket, onInputChange, onRemoveTicket }: TicketFormProps) {
  return (
    <div className="max-w-2xl mx-auto border border-gray-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#5DADE2] text-white text-center py-2 text-xl font-bold">TICKET</div>

      {/* Form Content */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={ticket.name}
              onChange={onInputChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="ticketDate" className="block mb-1 font-medium">
              Ticket Date
            </label>
            <Input
              id="ticketDate"
              name="ticketDate"
              value={ticket.ticketDate}
              onChange={onInputChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateNotice" className="block mb-1 font-medium">
            Date Notice
          </label>
          <Input
            id="dateNotice"
            name="dateNotice"
            value={ticket.dateNotice}
            onChange={onInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="incidentLocation" className="block mb-1 font-medium">
            Incident Location
          </label>
          <Input
            id="incidentLocation"
            name="incidentLocation"
            value={ticket.incidentLocation}
            onChange={onInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="details" className="block mb-1 font-medium">
            Details
          </label>
          <Input
            id="details"
            name="details"
            value={ticket.details}
            onChange={onInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="imageCapture" className="block mb-1 font-medium">
            Image Capture
          </label>
          <Input
            id="imageCapture"
            name="imageCapture"
            value={ticket.imageCapture}
            onChange={onInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        {/* Remove Ticket Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onRemoveTicket}
            className="bg-[#5D4037] hover:bg-[#4E342E] text-white font-bold py-2 px-4 rounded-full"
          >
            REMOVE TICKET
          </button>
        </div>
      </div>
    </div>
  )
}

