export default interface Task {
	id: string;
	title: string;
	description: string;
	persons: string[];
	status: string;
	ends_at: Date;
	created_at: Date;
}
