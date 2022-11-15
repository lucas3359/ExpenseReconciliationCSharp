type Category = {
    id?: number;
    name: string;
    parentId?: number;
    splitIncluded?: boolean;
    defaultSplit?: number;
};

export type CreateCategoryRequest = Omit<Category, 'id'>;

export default Category;
