import Layout from '@/components/Layout/Layout';
import styles from './Team.module.css'
import { teamData } from '@/data/team';
import TeamMember from '@/components/TeamMember/TeamMember';
import CustomHead from '@/components/Head/Head';
import PaddedLayout from '@/components/PaddedLayout/PaddedLayout';

export default async function Team() {
    return(
        <Layout>
			<CustomHead title='Team' description='Meet the executive team.'/>
			<PaddedLayout addNavbarPadding>
            <div id='team' className={styles.teamList} >
				<h2>Executive Team 2023-2024</h2>
				{
					teamData.map((team, index) => {
						return (
							<div key={`${team.name}_${index}`}>
								<h3 className={styles.teamTitle}>{team.name}</h3>
								<div className={styles.teamGrid}>
									{
										team.members.map((member, index) => <TeamMember key={`${member.title}_${index}`} {...member}/>)
									}
								</div>
							</div>
						)
					})
				}
			</div>
			</PaddedLayout>
        </Layout>
    )
}