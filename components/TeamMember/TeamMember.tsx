import { TeamMember } from "@/models/TeamMember";
import styles from './TeamMember.module.css'
import Image from 'next/image'

const TeamMember = ({ title, name }: TeamMember) => {
	return (
		<div className={styles.memberItem}>
			<div className={styles.imgContainer}>
				<Image src={'/bridge-workshop.jpg'}
					objectFit='cover'
					layout='fill'
					alt={`Event image for ${title}`} />
			</div>
			<h4>{name}</h4>
			<p>{title}</p>
		</div>
	)
}

export default TeamMember;