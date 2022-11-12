import Category from '../model/category';

export interface CategoryRowProps {
  category: Category;
  parentName?: string;
  deleteClicked: () => void;
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
  
  const onDeleteClicked = () => {
    props.deleteClicked();
  }
  
  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{props.parentName}</td>
      <td>{renderSplitIncluded(category.splitIncluded)}</td>
      <td>{category.defaultSplit}</td>
      <td>
        <div className="btn-group">
          <button className="btn btn-primary btn-sm" disabled>Edit</button>
          <button className="btn btn-error btn-sm"
                  onClick={() => onDeleteClicked()}
            >Delete</button>
        </div>  
      </td>
    </tr>
  );
}