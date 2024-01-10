// Components
import { Team } from "@/models/TeamMember";

// Media
import PB from "@/data/media/MTA Team Photos 2023/PB.jpg"
import DS from "@/data/media/MTA Team Photos 2023/DS.jpg"
import AM from "@/data/media/MTA Team Photos 2023/AM.jpg"
import AT from "@/data/media/MTA Team Photos 2023/AT.jpg"
import CL from "@/data/media/MTA Team Photos 2023/CL.jpg"
import CL2 from "@/data/media/MTA Team Photos 2023/CL2.jpg"
import KM from "@/data/media/MTA Team Photos 2023/KM.jpg"
import FM from "@/data/media/MTA Team Photos 2023/FM.jpg"
import IC from "@/data/media/MTA Team Photos 2023/IC.jpg"
import AA from "@/data/media/MTA Team Photos 2023/AA.jpg"
import KT from "@/data/media/MTA Team Photos 2023/KT.jpg"
import SD from "@/data/media/MTA Team Photos 2023/SD.jpg"
import TT from "@/data/media/MTA Team Photos 2023/TT.jpeg"
import NC from "@/data/media/MTA Team Photos 2023/NC.jpg"
import MV from "@/data/media/MTA Team Photos 2023/MV.jpeg"
import SG from "@/data/media/MTA Team Photos 2023/SG.jpeg"
import PK from "@/data/media/MTA Team Photos 2023/PK.jpg"
import WH from "@/data/media/MTA Team Photos 2023/WH.jpg"
import YK from "@/data/media/MTA Team Photos 2023/YK.jpg"
import AP from "@/data/media/MTA Team Photos 2023/AP.jpg"
import SL from "@/data/media/MTA Team Photos 2023/SL.jpg"
import MH from "@/data/media/MTA Team Photos 2023/MH.jpg"
import ST from "@/data/media/MTA Team Photos 2023/ST.jpg"
import TI from "@/data/media/MTA Team Photos 2023/TI.jpg"
import ZK from "@/data/media/MTA Team Photos 2023/ZK.jpg"

export const teamData: Array<Team> = [
    {
        name: 'Co-Presidents',
        members: [
            {
                name: 'Prit Balaji',
                title: 'Co-President',
                image: PB,
            },
            {
                name: 'Danish Siddiqui',
                title: 'Co-President',
                image: DS,
            },
        ]
    },
    {
        name: 'Marketing',
        members: [
            {
                name: 'Averly Moe',
                title: 'VP Marketing',
                image: AM,
            },
            {
                name: 'Ashni Theepan',
                title: 'Director of Marketing',
                image: AT,
            },
            {
                name: 'Chloe Lai',
                title: 'Director of Marketing',
                image: CL,
            },
            {
                name: 'Caleb Lee',
                title: 'Director of Marketing',
                image: CL2,
            },
            {
                name: 'Sophia Lee',
                title: 'Marketing Associate',
                image: SL,
            },
        ]
    },
    {
        name: 'Corporate Relations',
        members: [
            {
                name: 'Keevan Martanto',
                title: 'VP Corporate Relations',
                image: KM
            },
            {
                name: 'Fabiha Maliyat',
                title: 'Director of Corporate Relations',
                image: FM
            },
            {
                name: 'Ines Chan',
                title: 'Director of Business Development',
                image: IC
            },
            {
                name: 'Zara Khan',
                title: 'Corporate Relations Associate',
                image: ZK
            },
            {
                name: 'Thafhan Ibrahim',
                title: 'Corporate Relations Associate',
                image: TI
            },
        ]
    },
    {
        name: 'Operations',
        members: [
            {
                name: 'Amna Alvi',
                title: 'VP Operations',
                image: AA,
            },
            {
                name: 'Khushi Talati',
                title: 'VP Events',
                image: KT
            },
            {
                name: 'Sarbotam Dhaliwal',
                title: 'Director of Internal Affairs',
                image: SD,
            },
            {
                name: 'Theebana Thavarajah',
                title: 'Director of Operations',
                image: TT,
            },
            {
                name: 'Nicholas Cheung',
                title: 'Director of Operations',
                image: NC,
            },
            {
                name: 'Monica Vergara',
                title: 'Director of Operations',
                image: MV,
            },
            {
                name: 'Siya Grover',
                title: 'Director of Operations',
                image: SG,
            },
            {
                name: 'Prachi Kumar',
                title: 'Director of Operations',
                image: PK,
            },
            {
                name: 'Stephanie Tomaz',
                title: 'Operations Associate',
                image: ST
            },
        ]
    },
    {
        name: 'Technology',
        members: [
            {
                name: 'William Huang',
                title: 'Director of Web Development',
                image: WH
            },
            {
                name: 'Yuval Kamani',
                title: 'Director of Technology',
                image: YK
            },
            {
                name: 'Aarya Prakash',
                title: 'Director of Technology',
                image: AP
            },
            {
                name: 'Morris Ho',
                title: 'Technology Associate',
                image: MH
            },
        ]
    }
]