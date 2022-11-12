import {useCreateCategoryMutation, useGetAllCategoriesQuery} from '../api/categoryApi';
import {CreateCategoryRequest} from '../model/category';
import React, {useState} from 'react';

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
  
  const getCategoriesOptions = () => {
    if (categoriesLoading) return <option disabled>Loading...</option>;
    if (!categoriesData || categoriesError) return <option disabled>Failed to load</option>;

    return categoriesData.map((category) => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option>
      )
    });
  }
  
  const selectDefaultSplit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const split = parseFloat(event.target.value);
    
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
  
  const selectParent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let parent: number | undefined = parseInt(event.target.value);
    
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
      <div className={`modal ${props.isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new category</h3>
          <div className="py-4">
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text font-semibold">Category Name</span>
              </label>
              <input type="text"
                     className="input input-bordered rounded-box"
                     value={category.name}
                     onChange={(e) => setCategory({...category, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 w-full max-w-md">
              <div className="form-control">
                <label className="label mb-1">
                  <span className="label-text font-semibold">Included in Split?</span>
                </label>
                <input type="checkbox"
                       className={`toggle toggle-accent toggle-lg`}
                       checked={category.splitIncluded}
                       onChange={(e) => setCategory({...category, splitIncluded: e.target.checked})}
                />
              </div>
  
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text font-semibold">Default Split</span>
                </label>
                <select className="select select-bordered rounded-box"
                        value={category.defaultSplit}
                        onChange={selectDefaultSplit}
                >
                  <option value={-1} key={-1}>None</option>
                  <option value={0} key={0}>0%</option>
                  <option value={0.3} key={0.3}>30%</option>
                  <option value={0.4} key={0.4}>40%</option>
                  <option value={0.5} key={0.5}>50%</option>
                  <option value={0.6} key={0.6}>60%</option>
                  <option value={0.7} key={0.7}>70%</option>
                  <option value={1} key={1}>100%</option>
                </select>
              </div>
            </div>
            
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text font-semibold">Parent Category</span>
              </label>
              <select className="select select-bordered rounded-box"
                      value={category.parentId}
                      onChange={selectParent}
              >
                <option key={undefined}>None</option>
                {getCategoriesOptions()}
              </select>
            </div>
            
            <div className="modal-action">
              <button className="btn btn-error" onClick={() => props.modalClosed()}>Cancel</button>
              <button className="btn btn-accent"
                      disabled={!category.name}
                      onClick={saveForm}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}