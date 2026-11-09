"use client";
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
function SelectTopic() {
  return (
    <div>
        <h2 className="font-bold text-2xl text-purple-700">Content</h2>
        <p id="topic-help" className="text-gray-600">What is the topic of your video?</p>
        <Select>
            <SelectTrigger className="w-[180px]" aria-label="Video topic" aria-describedby="topic-help">
                <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="motivational">Motivational</SelectItem>
                <SelectItem value="fun-facts">Fun facts</SelectItem>
                <SelectItem value="storytelling">Storytelling</SelectItem>
            </SelectContent>
            </Select>
    </div>
  )
}

export default SelectTopic