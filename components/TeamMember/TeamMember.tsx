import { TeamMember } from "@/models/TeamMember";
import styles from './TeamMember.module.css'
import Image from 'next/image'
import BlurPlaceholder from "../BlurPlaceholder/BlurPlaceholder";

const TeamMember = ({ title, name, image }: TeamMember) => {
	const imageSrc = image ?? '/images/bridge-workshop.jpg';

	return (
		<div className={styles.memberItem}>
			<div className={styles.imgContainer}>
				<Image 
				src={imageSrc} 
				fill 
				alt={`Event image for ${title}`}
				placeholder='blur'
				blurDataURL={BlurPlaceholder(500, 500)}
				/>
			</div>
			<h4>{name}</h4>
			<p>{title}</p>
		</div>
	)
}

export default TeamMember;