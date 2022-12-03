import Category from '../model/category';

export interface CategoryTree {
  root: CategoryTreeItem[],
}

export interface CategoryTreeItem {
  key: string | number,
  data: Category,
  children?: CategoryTreeItem[],
}
