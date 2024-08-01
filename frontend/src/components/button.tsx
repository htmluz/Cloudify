interface ButtonProps {
		label: string;
		onClick: () => void;
		className?: string;
		disabled?: boolean;
	}

export function SpotifyButton({ label, onClick, className = '', disabled }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className="bg-[#1ed760] text-[#000000] font-bold ps-[32px] pe-[32px] py-[8px] rounded-full"
			disabled={disabled}
		>
					{label}
		</button>
	)
}

