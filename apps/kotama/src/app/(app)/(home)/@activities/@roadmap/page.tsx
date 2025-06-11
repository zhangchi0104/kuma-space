/** @format */
import data from "./data.json";
import ConstructionProgress from "./_internals/construction-progress";
import ConstructionTasks from "./_internals/constrution-tasks";
export default function ProgressPage() {
	const { currentFocus, ...todos } = data;
	const segments: Record<string, { done: number; total: number }> = {};
	for (const [key, value] of Object.entries(todos)) {
		segments[key] = value.reduce(
			(acc, curr) => ({
				done: acc.done + (curr.checked ? 1 : 0),
				total: acc.total + 1,
			}),
			{ done: 0, total: 0 },
		);
	}

	return (
		<>
			<p className="text-md font-medium flex flex-row justify-between">
				<span className="mr-2">📌 Current Stage</span>
				<span className="text-muted-foreground">{data.currentFocus}</span>
			</p>
			<ConstructionProgress segments={segments} />
			<ConstructionTasks className="mt-6 h-full flex-1" data={todos} />
		</>
	);
}
