import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

const Modal = ({
	children,
	title,
	onClose,
	description,
}: {
	onClose?: () => void;
	title: string;
	description?: string;
	children: React.ReactNode;
}) => {
	return (
		<Dialog open>
			<DialogOverlay />
			<DialogContent
				className="sm:max-w-[425px] rounded-x flex flex-col max-h-[95%] sm:max-h-max"
				showCloseButton={false}
			>
				<div>
					<DialogTitle className="mb-2">{title}</DialogTitle>
					{description ? (
						<DialogDescription className="text-sm text-muted-foreground">
							{description}
						</DialogDescription>
					) : null}
				</div>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};
export default Modal;
