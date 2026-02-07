"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Mail } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { people } from "@/data/mock-data"

const statusColors = {
  active: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  offline: "bg-gray-400",
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPeople = useMemo(() => {
    if (!searchQuery) return people

    const query = searchQuery.toLowerCase()
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.role.toLowerCase().includes(query) ||
        person.department.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Team"
        description="Meet your colleagues"
      />

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, role, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* People Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredPeople.map((person) => (
          <motion.div key={person.id} variants={item}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Avatar with Status */}
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                      statusColors[person.status]
                    }`}
                  />
                </div>

                {/* Name and Role */}
                <div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>

                {/* Department Badge */}
                <Badge variant="secondary">{person.department}</Badge>

                {/* Location */}
                <p className="text-xs text-muted-foreground">
                  {person.location}
                  <br />
                  {person.timezone}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {person.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Email */}
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Mail className="h-3 w-3" />
                  {person.email}
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredPeople.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No team members found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </motion.div>
  )
}
