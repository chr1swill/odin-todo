export type IDType = string;

export enum Priority {
	NONE = 0,
	LOW,
	MEDUIM,
	HIGH,
}

export type TodoType = {
	id: IDType;
	title: string;
	note: string;
	list: string;
	complete: boolean;
	priority: Priority;
};

export type AllTodosType = { [key: IDType]: TodoType };

export type ListNameType = string;

export type ListType = IDType[];

export type AllListType = { [key: ListNameType]: ListType };
