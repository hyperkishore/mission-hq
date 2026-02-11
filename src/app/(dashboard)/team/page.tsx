"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Mail, MapPin, Clock, Star } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { people, shoutouts } from "@/data/mock-data"
import type { Person } from "@/types"

const statusColors = {
  active: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  offline: "bg-gray-400",
}

const departments = ["All", ...Array.from(new Set(people.map((p) => p.department)))]

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [deptFilter, setDeptFilter] = useState("All")
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

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

  const personShoutouts = useMemo(() => {
    if (!selectedPerson) return []
    return shoutouts.filter(
      (s) => s.to.name === selectedPerson.name || s.from.name === selectedPerson.name
    )
  }, [selectedPerson])

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
            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50"
              onClick={() => setSelectedPerson(person)}
            >
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

                <a
                  href={`mailto:${person.email}`}
                  onClick={(e) => e.stopPropagation()}
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

      {filteredPeople.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No team members found matching your filters
          </p>
        </div>
      )}

      {/* Profile Modal */}
      <Dialog open={!!selectedPerson} onOpenChange={(open) => !open && setSelectedPerson(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedPerson && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedPerson.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedPerson.avatar} alt={selectedPerson.name} />
                    <AvatarFallback className="text-xl">
                      {selectedPerson.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-background ${statusColors[selectedPerson.status]}`}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold">{selectedPerson.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedPerson.role}</p>
                  <Badge variant="secondary" className="mt-1">{selectedPerson.department}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{selectedPerson.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{selectedPerson.timezone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">
                  {selectedPerson.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {personShoutouts.length > 0 && (
                  <div className="w-full space-y-2 pt-2 border-t">
                    <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 justify-center">
                      <Star className="h-3 w-3" /> Recent Shoutouts
                    </p>
                    {personShoutouts.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2 text-left">
                        &ldquo;{s.message}&rdquo;
                        <span className="block mt-1 font-medium text-foreground/70">
                          {s.from.name} &rarr; {s.to.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={`mailto:${selectedPerson.email}`}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {selectedPerson.email}
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
