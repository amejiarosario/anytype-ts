export enum ImageSize { Large, Small, Thumb };

export interface Avatar {
	image?: Image;
};

export interface Image {
	hash: string;
	sizes: ImageSize[];
};

export interface Account {
	id: string;
	name: string;
	color?: string;
	avatar?: Avatar;
};

export enum DragItem {
	Block = 'block',
	Menu = 'menu',
};

export enum CoverType {
	Image	 = 0,
	Color	 = 1,
	Gradient = 2,
};