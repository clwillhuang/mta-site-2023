import Layout from '@/components/Layout';
import styles from './Team.module.css'
import { teamData } from '@/data/team';


export default async function Team() {
    return(
        <Layout>
            <div id='team' className={styles.teamList} >
				<h2>Executive Team 2023-2024</h2>
				{
					teamData.map((team, index) => {
						return (
							<div key={`${team.name}_${index}`}>
								<h3>{team.name}</h3>
								<div className={styles.teamGrid}>
									{
										team.members.map((member, index) => {
											return (<div className={styles.memberItem} key={`${member.title}_${index}`}>
												<h4>{member.name}</h4>
												<p>{member.title}</p>
											</div>)
										})
									}
								</div>
							</div>
						)
					})
				}
			</div>
        </Layout>
    )
}