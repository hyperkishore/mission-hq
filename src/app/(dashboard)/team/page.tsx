"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, Mail } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { people } from "@/data/mock-data"

const statusColors = {
  active: "bg-primary",
  away: "bg-muted-foreground",
  busy: "bg-destructive",
  offline: "bg-border",
}

const departments = ["All", ...Array.from(new Set(people.map((p) => p.department)))]

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [deptFilter, setDeptFilter] = useState("All")

  const filteredPeople = useMemo(() => {
    let result = people

    if (deptFilter !== "All") {
      result = result.filter((p) => p.department === deptFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          person.role.toLowerCase().includes(query) ||
          person.department.toLowerCase().includes(query)
      )
    }

    return result
  }, [searchQuery, deptFilter])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
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
      <PageHeader title="Team" description="Meet your colleagues" />

      {/* Search + Department Filters */}
      <div className="space-y-3">
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
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={deptFilter === dept ? "default" : "ghost"}
              size="sm"
              onClick={() => setDeptFilter(dept)}
              className="shrink-0 text-xs h-8"
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      {/* People Grid */}
      <motion.div
        key={deptFilter}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredPeople.map((person) => (
          <motion.div key={person.id} variants={item}>
            <Link href={`/team/${person.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>
                        {person.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${statusColors[person.status]}`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>

                  <Badge variant="secondary">{person.department}</Badge>

                  <p className="text-xs text-muted-foreground">
                    {person.location}<br />{person.timezone}
                  </p>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {person.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Mail className="h-3 w-3" />
                    {person.email}
                  </span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredPeople.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No team members found matching your filters
          </p>
        </div>
      )}
    </motion.div>
  )
}
