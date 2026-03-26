const ProjectsSkeleton = () => {
	return (
		<div className="space-y-4 mt-7">
			<div className="flex items-center gap-x-2 flex-nowrap">
				{[...Array(4).keys()].map(i => (
					<div
						key={i}
						className="w-10 h-4 rounded-2xl animate-pulse bg-accent"
					></div>
				))}
			</div>
			<div className="mt-8 grid-cols grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{[...Array(6).keys()].map(i => (
					<div
						key={i}
						className="h-[200px] rounded-2xl bg-accent-foreground animate-pulse"
					></div>
				))}
			</div>
		</div>
	);
};

export default ProjectsSkeleton;
