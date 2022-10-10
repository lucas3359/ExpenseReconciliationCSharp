type Category = {
    id: number;
    name: string;
    parentId?: number;
    splitIncluded?: boolean;
    defaultSplit?: number;
};

export default Category;
