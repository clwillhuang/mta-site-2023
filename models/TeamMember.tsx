import { StaticImageData } from "next/image"

export type Team = {
    name: string,
    members: Array<TeamMember>,
}

export type TeamMember = {
    name: string,
    title: string,
    image: StaticImageData | null,
}