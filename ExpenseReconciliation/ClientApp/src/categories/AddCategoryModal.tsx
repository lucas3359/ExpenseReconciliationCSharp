import {useCreateCategoryMutation, useGetAllCategoriesQuery} from '../api/categoryApi';
import {CreateCategoryRequest} from '../model/category';
import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputSwitch} from 'primereact/inputswitch';
import {Dropdown} from 'primereact/dropdown';

interface AddCategoryModalProps {
  isOpen: boolean;
  modalClosed: () => void;
}

export default function AddCategoryModal(
  props: AddCategoryModalProps
) {
  const initialCategoryState: CreateCategoryRequest = {
    name: "",
    parentId: undefined,
    splitIncluded: false,
    defaultSplit: -1,
  };
  
  const [category, setCategory] = useState<CreateCategoryRequest>(initialCategoryState);
  
  const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  
  const splitOptions = [
    { value: -1, label: 'None' },
    { value: 0, label: '0%' },
    { value: 0.3, label: '30%' },
    { value: 0.4, label: '40%' },
    { value: 0.5, label: '50%' },
    { value: 0.6, label: '60%' },
    { value: 0.7, label: '70%' },
    { value: 1, label: '100%' },
  ]
  
  const categoriesOptions = categoriesData?.filter((x) => !x.parentId)
    .map((category) => {
      return {
        value: category.id,
        label: category.name,
      }
    });
  
  const selectDefaultSplit = (value) => {
    const split = parseFloat(value);
    
    setCategory({
      ...category,
      defaultSplit: split,
    });
  }
  
  const saveForm = (event: any) => {
    event.preventDefault();
    
    const categoryPayload = {
      ...category,
      defaultSplit: category.defaultSplit === -1 ? undefined : category.defaultSplit,
    }
    
    createCategory(categoryPayload);
    setCategory(initialCategoryState);
    
    props.modalClosed();
  }
  
  const selectParent = (value: string) => {
    let parent: number | undefined = parseInt(value);
    
    if (!(categoriesData?.find((category) => category.id === parent))) {
      parent = undefined;
    }

    setCategory({
      ...category,
      parentId: parent,
    });
  }
  
  return (
    <>
      <Dialog visible={props.isOpen}
              onHide={() => props.modalClosed()}
              header="Add new category">
        <div className="formgrid grid p-fluid w-30rem">
          <div className="field col-12 mt-4">
            <span className="p-float-label">
              <InputText
                     className="input input-bordered rounded-box"
                     value={category.name}
                     onChange={(e) => setCategory({...category, name: e.target.value})}
              />
              <label className="">Category Name</label>
            </span>
          </div>

          <div className="field formgroup-inline col-12 mt-2">
            <span className="field-checkbox">
              <label>Included in Split?</label>
              <InputSwitch
                     checked={category.splitIncluded}
                     onChange={(e) => setCategory({...category, splitIncluded: e.value})}
              />
            </span>
          </div>

          <div className="field col-12 mt-4">
            <span className="p-float-label">
              <Dropdown 
                      options={splitOptions}
                      value={category.defaultSplit}
                      onChange={(e) => selectDefaultSplit(e.value)}
              >
              </Dropdown>
              <label className="label">Default Split</label>
            </span>
          </div>
          
          <div className="field col-12 mt-4">
            <span className="p-float-label">
              <Dropdown options={categoriesOptions}
                      value={category.parentId}
                      onChange={(e) => selectParent(e.value)}
              >
              </Dropdown>
              <label className="label">Parent Category</label>
            </span>
          </div>
          
          <div className="p-buttonset col-12">
            <Button className="p-button-danger" onClick={() => props.modalClosed()}>Cancel</Button>
            <Button className="p-button-success"
                    disabled={!category.name}
                    onClick={saveForm}>Save</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}