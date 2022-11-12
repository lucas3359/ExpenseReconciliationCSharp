import {selectLoggedIn} from '../auth/authSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import React, {useState} from 'react';
import {useDeleteCategoryMutation, useGetAllCategoriesQuery} from '../api/categoryApi';
import CategoryRow from './CategoryRow';
import AddCategoryModal from './AddCategoryModal';
import {errorToast} from '../toast/toastSlice';

export default function Categories() {
  const loggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  
  const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();  
  
  if (!loggedIn) return <div>Unauthenticated</div>;
  
  if (categoriesLoading) return <div>loading...</div>;
  if (!categoriesData || categoriesError) return <div>Failed to load</div>;
  
  const getParentName = (parentId: number | undefined): string | undefined => {
    if (!parentId) return undefined;
    
    return categoriesData.find((category) => category.id === parentId)?.name;
  }
  
  const checkIfParent = (id: number): boolean => {
    return categoriesData.some((category) => category.parentId === id);
  }
  
  const deleteClicked = (categoryId: number | undefined) => {
    if (categoryId === undefined) return;
    
    if (checkIfParent(categoryId)) {
      dispatch(errorToast('Cannot delete a category that has subcategories'));
      return;
    }
    
    deleteCategory(categoryId);
  }
  
  const categoryRows = categoriesData.map((category) => {
    return (
      <CategoryRow
        key={category.id}
        category={category}
        deleteClicked={() => deleteClicked(category.id)}
        parentName={getParentName(category.parentId)}
      />
    )
  });
  
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols:3 px-5 md:gap-3 gap-y-7">
        <h1 className="text-4xl text-gray-700">Categories</h1>
        <button className="btn btn-accent btn-md"
          onClick={() => setModalOpen(!modalOpen)}>
          Add Category
        </button>
      </div>
      <br />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Parent</th>
              <th>Included<br/>in split?</th>
              <th>Default<br/>split</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoryRows}
          </tbody>
        </table>
      </div>
      {<AddCategoryModal isOpen={modalOpen} modalClosed={() => setModalOpen(false)} />}
    </div>
  );
}