//MUI IMPORTS
import * as React from 'react';
import { Tabs, Tab, AppBar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserT } from '../../../../types/userTypes';
import { ProjectT } from '../../../../types/projectTypes';
type Props = {
	user: UserT;
	projects: ProjectT[];
	setProjects: React.Dispatch<React.SetStateAction<ProjectT[]>>;
};
function ProjectsList(props: Props) {
	const { user, projects } = props;
	let projectsList: ProjectT[] = [];
	let biddingProjects: ProjectT[] = [];
	let awardedProjects: ProjectT[] = [];

	if (props.user.userType == 'contractor') {
		projects.forEach((pr) => {
			pr.bids.forEach((bid) => {
				if (bid.creatorId === props.user._id && bid.awarded === false)
					biddingProjects.push(pr);
				return;
			});
		});

		props.projects.forEach((pr) => {
			pr.bids.forEach((bid) => {
				if (bid.creatorId === props.user._id && bid.awarded === true)
					awardedProjects.push(pr);
				return;
			});
		});
	} else if (user.userType === 'client') {
		projectsList = props.projects.filter((pr) => pr.userId == props.user._id);
	} else {
		projectsList = [];
	}

	//HANDLING TABS
	const [value, setValue] = React.useState(0);

	const handleTabs = (e: any, val: number) => {
		console.log(val);
		setValue(val);
	};
	return (
		<>
			<AppBar position="static" style={{ padding: '8px 0 0 0' }}>
				<Tabs
					value={value}
					onChange={handleTabs}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
				>
					<Tab
						label={props.user.userType === 'client' ? 'Open' : 'Bidding'}
					></Tab>
					<Tab
						label={props.user.userType === 'client' ? 'In Progress' : 'Awarded'}
					></Tab>
				</Tabs>
			</AppBar>

			<TabPanel value={value} index={0} projectsList={projectsList}>
				{
					<>
						<ImageList
							sx={{
								width: '100vw',
								// margin: "auto",
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								padding: '2vw 0 1vw 0',
								gap: '5vh',
							}}
							cols={1}
						>
							<ImageListItem key="Subheader" cols={1}></ImageListItem>
							{/* IF YOU ARE A CLIENT THE FIRST TAB WILL HAVE YOUR OPEN PROJECTS */}
							{props.user.userType == 'client'
								? projectsList
										.filter((pr) => pr.lifeCycle === 'open')
										.map((pr) => (
											<Card
												sx={{
													display: 'flex',
													height: '18vh',
													width: '98vw',
													textDecoration: 'none',

													// alignItems: "center",
												}}
												variant="elevation"
												elevation={3}
												component={Link}
												to={`${pr._id}`}
											>
												<CardMedia
													component="img"
													sx={{ width: '35vw' }}
													image={`http://localhost:3000/${pr.projectImage}`}
													alt="Project Pic"
												/>
												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													<CardContent sx={{ flex: '1 0 auto' }}>
														<Typography component="div" variant="h5">
															{pr.name}
														</Typography>
														<Typography
															variant="subtitle1"
															color="text.secondary"
															component="div"
														>
															Bids: {pr.bids.length}
														</Typography>
													</CardContent>
												</Box>
											</Card>
										))
								: biddingProjects.map((pr) => (
										//IF YOU ARE A CONTRACTOR THE FIRST TAB WILL DISPLAY THE OPEN PROJECTS THAT YOU HAVE BIDS ON
										<>
											<Card
												sx={{
													display: 'flex',
													height: '18vh',
													width: '98vw',
													textDecoration: 'none',
												}}
												variant="elevation"
												elevation={3}
												component={Link}
												to={`${pr._id}`}
											>
												<CardMedia
													component="img"
													sx={{ width: '35vw' }}
													image={`http://localhost:3000/${pr.projectImage}`}
													alt="Project Pic"
												/>
												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													<CardContent sx={{ flex: '1 0 auto' }}>
														<Typography component="div" variant="h5">
															{pr.name}
														</Typography>
														<Typography
															variant="subtitle1"
															color="text.secondary"
															component="div"
														>
															Your Bid: $
															{
																pr.bids.filter(
																	(bid) => bid.creatorId == props.user._id
																)[0].bidPrice
															}
														</Typography>
													</CardContent>
												</Box>
											</Card>
										</>
								  ))}
						</ImageList>
					</>
				}
			</TabPanel>
			<TabPanel value={value} index={1} projectsList={projectsList}>
				{
					<>
						<ImageList
							sx={{
								width: '100vw',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								padding: '2vw 0 1vw 0',
								gap: '5vh',
							}}
							cols={1}
						>
							<ImageListItem key="Subheader" cols={1}></ImageListItem>
							{props.user.userType == 'client'
								? projectsList
										.filter((pr) => pr.lifeCycle === 'awarded')
										.map((pr) => (
											//IF YOU ARE A CLIENT THE SECOND TAB WILL DISPLAY ALL OF THE PROJECTS IN THE "AWARDED" LIFECYCLE CATEGORY (PROJECT IS IN PROGRESS)
											<Card
												sx={{
													display: 'flex',
													height: '18vh',
													width: '98vw',
													textDecoration: 'none',

													// alignItems: "center",
												}}
												variant="elevation"
												elevation={3}
												component={Link}
												to={`${pr._id}`}
											>
												<CardMedia
													component="img"
													sx={{ width: '35vw' }}
													image={`http://localhost:3000/${pr.projectImage}`}
													alt="Project Pic"
												/>
												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													<CardContent sx={{ flex: '1 0 auto' }}>
														<Typography component="div" variant="h5">
															{pr.name}
														</Typography>
														<Typography
															variant="subtitle1"
															color="text.secondary"
															component="div"
														>
															Bids: {pr.bids.length}
														</Typography>
													</CardContent>
												</Box>
											</Card>
										))
								: awardedProjects.map((pr) => (
										//IF YOU ARE A CONTRACTOR THE SECOND TAB WILL DISPLAY THE PROJECTS THAT YOU, SPECIFICALLY, HAVE BEEN AWARDED
										<>
											<Card
												sx={{
													display: 'flex',
													height: '18vh',
													width: '98vw',
													textDecoration: 'none',

													// alignItems: "center",
												}}
												variant="elevation"
												elevation={3}
												component={Link}
												to={`${pr._id}`}
											>
												<CardMedia
													component="img"
													sx={{ width: '35vw' }}
													image={`http://localhost:3000/${pr.projectImage}`}
													alt="Project Pic"
												/>
												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													<CardContent sx={{ flex: '1 0 auto' }}>
														<Typography component="div" variant="h5">
															{pr.name}
														</Typography>
														<Typography
															variant="subtitle1"
															color="text.secondary"
															component="div"
														>
															Your Bid: $
															{
																pr.bids.filter(
																	(bid) => bid.creatorId == props.user._id
																)[0].bidPrice
															}
														</Typography>
													</CardContent>
												</Box>
											</Card>
										</>
								  ))}
						</ImageList>
					</>
				}
			</TabPanel>
		</>
	);
}
//IMPORTANT FOR TABS TO WORK
//The "children" prop of this function is passed down as "the thing between the TabPanel component"
//Whatever is inside the tabpanels will not render without this
// type TabPanelProps={
// 	value: number,
// 	index: number,
// 	children: React.ReactNode
// }
// function TabPanel(props:TabPanelProps) {
// 	// const { children, value, index } = props;
// 	console.log(props);
// 	return <>{props.value === props.index && <>{props.children}</>}</>;
// }
function TabPanel(props: any) {
	const { children, value, index } = props;
	console.log(props);
	return <>{value === index && <>{children}</>}</>;
}
export default ProjectsList;
