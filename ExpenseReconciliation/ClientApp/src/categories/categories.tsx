import {selectLoggedIn} from '../auth/authSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import React, {useState} from 'react';
import {useDeleteCategoryMutation, useGetAllCategoriesQuery} from '../api/categoryApi';
import CategoryRow from './CategoryRow';
import AddCategoryModal from './AddCategoryModal';
import {errorToast} from '../toast/toastSlice';
import {Button} from 'primereact/button';
import {TreeTable} from 'primereact/treetable';
import {Column} from 'primereact/column';
import TreeNode from 'primereact/treenode';
import Category from '../model/category';

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
  
  const actionButtons = (node, column) => {
    return (
      <div>
        <Button icon="pi pi-pencil" disabled className="p-button-rounded p-button-text p-button-warning" />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" onClick={() => deleteClicked(node.data.id)} />
      </div>
    )
  }
  
  const mapCategoryToTreeNode = (category: Category, parentKey?: number | string): TreeNode => {
    const key = parentKey ? `${parentKey}-${category.id}` : `${category.id}`
    
    return {
      key,
      data: {
        ...category,
        splitIncluded: category.splitIncluded ? 'Yes' : 'No',
        defaultSplit: (category.defaultSplit !== null && category.defaultSplit !== undefined)
          ? `${category.defaultSplit * 100}%` : '-',
      },
      children: categoriesData.filter((x) => x.parentId === category.id)
                              .map((x) => mapCategoryToTreeNode(x, key)),
    }
  }
  
  const createCategoryTree = categoriesData
       .filter((category) => !category.parentId && category.id)
       .map((category) => mapCategoryToTreeNode(category));
  
  return (
    <>
      <div className="grid">
        <h1 className="text-4xl text-gray-700 col-10">Categories</h1>
        <Button className="col-2 p-button-primary p-button-sm"
                icon="pi pi-plus"
                iconPos="right"
                label="Add Category"
                onClick={() => setModalOpen(!modalOpen)}>
        </Button>
      </div>
      <br />
      <TreeTable value={createCategoryTree}>
        <Column field="name" header="Name" expander />
        <Column field="splitIncluded" header="Included in totals?" />
        <Column field="defaultSplit" header="Default Split" />
        <Column body={actionButtons} style={{ textAlign: 'center', width: '10rem' }} />
      </TreeTable>
      <AddCategoryModal isOpen={modalOpen} modalClosed={() => setModalOpen(false)} />
    </>
  );
}