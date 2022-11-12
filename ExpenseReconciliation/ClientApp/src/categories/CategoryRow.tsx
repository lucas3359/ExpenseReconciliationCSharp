import Category from '../model/category';

export interface CategoryRowProps {
  category: Category;
}

export default function CategoryRow(
  props: CategoryRowProps
) {
  const category = props.category;
  
  const renderSplitIncluded = (splitIncluded?: boolean): string => {
    if (splitIncluded === true) return "Yes";
    if (splitIncluded === false) return "No";
    return "";
  }
  
  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.parentId}</td>
      <td>{renderSplitIncluded(category.splitIncluded)}</td>
      <td>{category.defaultSplit}</td>
    </tr>
  );
}