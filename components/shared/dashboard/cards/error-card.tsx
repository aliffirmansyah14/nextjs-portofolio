import { Card, CardAction, CardHeader } from "@/components/ui/card";
import RefreshButton from "../refresh-button";

const ErrorCard = ({ message = "Something Error" }: { message?: string }) => {
	return (
		<Card>
			<CardHeader>
				<div className="text-2xl ">{message} </div>
				<CardAction>
					<RefreshButton />
				</CardAction>
			</CardHeader>
		</Card>
	);
};

export default ErrorCard;
