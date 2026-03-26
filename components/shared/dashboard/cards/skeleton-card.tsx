const SkeletonCard = () => {
	return (
		<div className="animate-pulse bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm">
			<div className=" h-5 rounded bg-muted w-2/5 ml-8"> </div>
			<div className="mt-6 h-5 rounded bg-muted w-1/5 ml-8"> </div>
			<div className="mt-6 h-5 rounded bg-muted w-4/8 ml-8"> </div>
			<div className="mt-3 h-5 rounded bg-muted w-3/8 ml-8"> </div>
		</div>
	);
};

export default SkeletonCard;
