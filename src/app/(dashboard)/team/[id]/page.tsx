import { people } from "@/data/mock-data"
import { PersonProfile } from "./person-profile"

export function generateStaticParams() {
  return people.map((person) => ({ id: person.id }))
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PersonProfile id={id} />
}
