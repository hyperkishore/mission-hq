"use client"

import { motion } from "framer-motion"
import { Inbox } from "lucide-react"
import { KpiBar } from "./kpi-bar"
import { FeedFilters } from "./feed-filters"
import { PostComposer } from "./post-composer"
import { FeedCard } from "./feed-card"
import { FeedSidebar } from "./feed-sidebar"
import { EmptyState } from "@/components/shared/empty-state"
import { useFeedStore } from "@/stores/feed-store"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export function UnifiedTimeline() {
  const { filter, filteredItems } = useFeedStore()
  const items = filteredItems()

  return (
    <div className="space-y-4">
      <KpiBar />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main Feed Column */}
        <div className="space-y-4 min-w-0">
          <FeedFilters />
          <PostComposer />

          {items.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No items found"
              description="Try a different filter to see more content"
            />
          ) : (
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {items.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <FeedCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right Sidebar */}
        <FeedSidebar />
      </div>
    </div>
  )
}
