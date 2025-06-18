export default function MdxLayout({ children }: { children: React.ReactNode }) {
	// Create any shared layout or styles here
	return (
		<div className="max-w-screen-md self-center w-full">
			<div>{children}</div>
		</div>
	);
}
