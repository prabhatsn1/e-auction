"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AuctionUpdatePage: React.FC = () => {
  const router = useRouter();
  const id = typeof window !== "undefined" ? window.location.pathname.split("/")[2] : "";
  const [auction, setAuction] = useState({
    title: "",
    description: "",
    startingPrice: 0,
    reservePrice: 0,
    startTime: "",
    endTime: "",
    status: "DRAFT",
    category: [],
    images: [],
  });

  useEffect(() => {
    if (id) {
      const fetchAuction = async () => {
        try {
          const response = await fetch(`/api/auctions/${id}`);
          const data = await response.json();
          setAuction(data);
        } catch (error) {
          console.error("Failed to fetch auction", error);
        }
      };
      fetchAuction();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auctions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auction),
      });

      if (response.ok) {
        router.push(`/auctions/${id}`);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold">Update Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <Input name="title" value={auction.title} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Description</label>
          <Textarea
            name="description"
            value={auction.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label>Starting Price</label>
            <Input
              type="number"
              name="startingPrice"
              value={auction.startingPrice}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Reserve Price</label>
            <Input
              type="number"
              name="reservePrice"
              value={auction.reservePrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label>Start Time</label>
            <Input
              type="datetime-local"
              name="startTime"
              value={auction.startTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>End Time</label>
            <Input
              type="datetime-local"
              name="endTime"
              value={auction.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <label>Status</label>
          <Select
            value={auction.status}
            onValueChange={(value) => setAuction((prev) => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="ENDED">Ended</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Update Auction
        </Button>
      </form>
    </div>
  );
};

export default AuctionUpdatePage;
