import Category from '../model/category';
import {Button} from 'primereact/button';

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
        <div className="p-buttonset">
          <Button className="p-button-sm" disabled>Edit</Button>
          <Button className="p-button-sm p-button-danger"
                  onClick={() => onDeleteClicked()}
            >Delete</Button>
        </div>  
      </td>
    </tr>
  );
}